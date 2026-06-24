import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import type { Parent } from "unist";
import { setNodeData, attrVal } from "./helpers";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function boldFirstChild(node: Node) {
  const children = (node as Parent).children;
  if (!children?.length) return;
  const first = children[0] as any;
  if (first.type !== "paragraph" || !first.children?.length) return;
  if (first.children.length === 1 && first.children[0].type === "strong") return;
  first.children = [{ type: "strong", children: first.children }];
}

function addNoteTitle(node: any, text: string) {
  if (!node.children) node.children = [];
  node.children.unshift({
    type: "paragraph",
    children: [{ type: "text", value: text }],
  });
  boldFirstChild(node);
}

function renderMdast(nodes: any[]): string {
  return nodes.map(renderNode).join("");
}

function renderNode(node: any): string {
  const props = (attrs: Record<string, string>) =>
    Object.entries(attrs)
      .filter(([, v]) => v)
      .map(([k, v]) => ` ${k}="${escapeHtml(String(v))}"`)
      .join("");

  switch (node.type) {
    case "paragraph":
      return `<p>${renderMdast(node.children || [])}</p>`;
    case "text":
      return escapeHtml(node.value);
    case "strong":
      return `<strong>${renderMdast(node.children || [])}</strong>`;
    case "emphasis":
      return `<em>${renderMdast(node.children || [])}</em>`;
    case "inlineCode":
      return `<code>${escapeHtml(node.value)}</code>`;
    case "code":
      return `<pre><code${node.lang ? props({ class: `language-${node.lang}` }) : ""}>${escapeHtml(node.value)}</code></pre>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}"${node.title ? ` title="${escapeHtml(node.title)}"` : ""}>${renderMdast(node.children || [])}</a>`;
    case "image":
      return `<img src="${escapeHtml(node.url)}" alt="${escapeHtml(node.alt || "")}"${node.title ? ` title="${escapeHtml(node.title)}"` : ""}>`;
    case "list":
      const tag = node.ordered ? "ol" : "ul";
      return `<${tag}>${renderMdast(node.children || [])}</${tag}>`;
    case "listItem":
      return `<li>${renderMdast(node.children || [])}</li>`;
    case "heading":
      return `<h${node.depth}>${renderMdast(node.children || [])}</h${node.depth}>`;
    case "blockquote":
      return `<blockquote>${renderMdast(node.children || [])}</blockquote>`;
    case "thematicBreak":
      return "<hr>";
    case "break":
      return "<br>";
    case "html":
      return node.value || "";
    default:
      if (node.children) return renderMdast(node.children);
      return node.value || "";
  }
}

export const remarkStellarContainers: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "containerDirective", (node: any) => {
      const attrs = node.attributes || {};
      const color = attrVal(attrs, "color", "default");

      switch (node.name) {
        case "note":
        case "box": {
          const title = attrVal(attrs, "title", "");
          if (title) addNoteTitle(node, title);
          else boldFirstChild(node);
          setNodeData(node, "div", {
            class: "tag-plugin colorful note",
            "data-color": color,
          });
          break;
        }

        case "folding": {
          const title = attrVal(attrs, "title", "");
          let summaryHtml = "";
          let body: any[] = node.children || [];
          if (title) {
            summaryHtml = escapeHtml(title);
          } else if (body.length > 0 && body[0].type === "paragraph") {
            summaryHtml = renderMdast(body[0].children || []);
            body = body.slice(1);
          }
          const detailsHtml = `<details class="tag-plugin colorful folding" data-color="${escapeHtml(color)}"><summary>${summaryHtml}</summary>${renderMdast(body)}</details>`;
          node.type = "html";
          node.value = detailsHtml;
          node.children = undefined;
          node.data = undefined;

          break;
        }

        case "quot":
          setNodeData(node, "div", { class: "tag-plugin quot" });
          break;

        case "poetry":
          setNodeData(node, "div", { class: "tag-plugin poetry" });
          break;

        case "timeline":
          setNodeData(node, "div", { class: "tag-plugin timeline" });
          break;

        case "blockquote": {
          const indent = attrVal(attrs, "indent", "true");
          setNodeData(node, "div", { class: "tag-plugin blockquote", indent });
          break;
        }

        case "grid": {
          const w = attrVal(attrs, "w", "240px");
          const c = attrVal(attrs, "c", "");
          const gap = attrVal(attrs, "gap", "16px");
          const br = attrVal(attrs, "br", "12px");
          const bg = attrVal(attrs, "bg", "");
          const cols = c
            ? `repeat(${c}, 1fr)`
            : `repeat(auto-fill, minmax(${w}, 1fr))`;
          setNodeData(node, "div", {
            class: `tag-plugin grid${bg ? ` ${bg}` : ""}`,
            style: `grid-template-columns:${cols};grid-gap:${gap};`,
          });
          break;
        }
      }
    });
  };
};
