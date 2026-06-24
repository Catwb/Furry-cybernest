import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { setNodeData, attrVal, hasAttr } from "./helpers";

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function toHtml(tag: string, props: Record<string, any>, children = ""): string {
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => v === true ? k : ` ${k}="${escapeAttr(String(v))}"`)
    .join("");
  return `<${tag}${attrs}>${children}</${tag}>`;
}

function voidHtml(tag: string, props: Record<string, any>): string {
  const attrs = Object.entries(props)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => v === true ? k : ` ${k}="${escapeAttr(String(v))}"`)
    .join("");
  return `<${tag}${attrs}>`;
}

export const remarkStellarLeaf: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "leafDirective", (node: any) => {
      const attrs = node.attributes || {};
      const text = node.children?.map((c: any) => c.value).join("") || "";

      switch (node.name) {
        case "button": {
          const color = attrVal(attrs, "color", "default");
          const icon = attrVal(attrs, "icon", "");
          const size = attrVal(attrs, "size", "");
          const url = attrVal(attrs, "url", "#");
          const btnText = text || attrVal(attrs, "text", "button");
          setNodeData(node, "a", {
            class: `tag-plugin colorful button${size ? ` ${size}` : ""}`,
            href: url,
            "data-color": color,
            title: btnText,
          });
          node.children = [{ type: "text", value: btnText }];
          break;
        }

        case "link": {
          const url = attrVal(attrs, "url", "#");
          const icon = attrVal(attrs, "icon", "");
          const desc = attrVal(attrs, "desc", "");
          const linkText = text || attrVal(attrs, "title", url);
          const isRich = desc === "true";
          const hostname = url.replace(/^https?:\/\//, "").split("/")[0];
          const iconHtml = icon ? toHtml("div", { class: "lazy img", "data-bg": icon }) : "";
          const topHtml = toHtml("div", { class: "top" },
            iconHtml + toHtml("span", { class: "cap link footnote" }, hostname)
          );
          const bottomHtml = toHtml("div", { class: "bottom" },
            toHtml("span", { class: "title" }, linkText) +
            toHtml("span", { class: "cap desc footnote" }, "")
          );
          const leftHtml = toHtml("div", { class: "left" },
            toHtml("span", { class: "title" }, linkText) +
            toHtml("span", { class: "cap link footnote" }, hostname)
          );
          const rightHtml = icon ? toHtml("div", { class: "right" }, iconHtml) : "";
          const cardHtml = isRich
            ? toHtml("a", { class: "link-card rich", href: url, target: "_blank", rel: "noopener noreferrer" },
                topHtml + bottomHtml)
            : toHtml("a", { class: "link-card plain", href: url, target: "_blank", rel: "noopener noreferrer" },
                leftHtml + rightHtml);
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin link dis-select" }, cardHtml);
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "image": {
          const src = attrVal(attrs, "src", text);
          const alt = attrVal(attrs, "alt", "");
          const width = attrVal(attrs, "width", "");
          const height = attrVal(attrs, "height", "");
          const bg = attrVal(attrs, "bg", "");
          const ratio = attrVal(attrs, "ratio", "");
          const fancybox = attrVal(attrs, "fancybox", "");
          const imgStyle = [width ? `width:${width}` : "", height ? `height:${height}` : ""].filter(Boolean).join(";");
          const bgStyle = [bg ? `background:${bg}` : "", ratio ? `aspect-ratio:${ratio}` : ""].filter(Boolean).join(";");
          const imgProps: any = { class: "lazy", src, ...(alt ? { alt } : {}), ...(imgStyle ? { style: imgStyle } : {}), ...(fancybox ? { "data-fancybox": fancybox } : {}) };
          const imgHtml = voidHtml("img", imgProps);
          const bgHtml = toHtml("div", { class: "image-bg", ...(bgStyle ? { style: bgStyle } : {}) }, imgHtml);
          const metaHtml = alt ? toHtml("div", { class: "image-meta" }, toHtml("span", { class: "image-caption center" }, alt)) : "";
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin image" }, bgHtml + metaHtml);
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "video": {
          const src = attrVal(attrs, "src", text);
          const bilibili = attrVal(attrs, "bilibili", "");
          const youtube = attrVal(attrs, "youtube", "");
          const ratio = attrVal(attrs, "ratio", "16/9");
          const width = attrVal(attrs, "width", "100%");
          const autoplay = attrVal(attrs, "autoplay", "false");
          let inner = "";
          if (bilibili) {
            inner = voidHtml("iframe", { src: `https://player.bilibili.com/player.html?bvid=${bilibili}&autoplay=${autoplay}`, frameborder: "0", allowfullscreen: "true", style: "width:100%;height:100%;" });
          } else if (youtube) {
            inner = voidHtml("iframe", { src: `https://www.youtube.com/embed/${youtube}?rel=0&autoplay=${autoplay}`, frameborder: "0", allowfullscreen: "true", style: "width:100%;height:100%;" });
          } else {
            inner = toHtml("video", { controls: true, preload: "metadata", playsinline: true },
              voidHtml("source", { src, type: attrVal(attrs, "type", "video/mp4") }));
          }
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin video-player", style: `aspect-ratio:${ratio};max-width:${width};` }, inner);
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "audio": {
          const src = attrVal(attrs, "src", text);
          const netease = attrVal(attrs, "netease", "");
          const autoplay = attrVal(attrs, "autoplay", "false");
          let inner = "";
          if (netease) {
            inner = voidHtml("iframe", { src: `//music.163.com/outchain/player?type=${attrVal(attrs, "type", "2")}&id=${netease}&auto=${autoplay}&height=32`, width: "288", height: "52", frameborder: "0" });
          } else {
            inner = toHtml("audio", { controls: true, preload: "metadata" },
              voidHtml("source", { src, type: attrVal(attrs, "type", "audio/mp3") }));
          }
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin audio" }, inner);
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "copy": {
          const copyText = text || attrVal(attrs, "text", "");
          const prefix = attrVal(attrs, "prefix", "");
          const id = `copy_${Math.random().toString(36).slice(2, 8)}`;
          const inputHtml = voidHtml("input", { class: "copy-area", id, value: copyText, readonly: true });
          const btnHtml = toHtml("button", { class: "copy-btn", onclick: `navigator.clipboard.writeText(document.getElementById('${id}').value)` }, "复制");
          const prefixHtml = prefix ? toHtml("span", {}, prefix) : "";
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin copy" }, prefixHtml + inputHtml + btnHtml);
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "checkbox":
        case "radio": {
          const checked = hasAttr(attrs, "checked");
          const symbol = attrVal(attrs, "symbol", "");
          const color = attrVal(attrs, "color", "default");
          const labelText = text || attrVal(attrs, "text", "");
          node.type = "html";
          node.value = toHtml("div", { class: `tag-plugin colorful checkbox${symbol ? ` ${symbol}` : ""}`, "data-color": color },
            voidHtml("input", { type: node.name, ...(checked ? { checked: true } : {}) }) +
            toHtml("span", {}, labelText));
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "emoji": {
          const source = attrVal(attrs, "src", text);
          const height = attrVal(attrs, "height", "1.75em");
          setNodeData(node, "span", { class: "tag-plugin emoji" });
          node.children = [{
            type: "text",
            value: `[${source}]`,
          }];
          break;
        }

        case "icon": {
          const key = attrVal(attrs, "key", text);
          const color = attrVal(attrs, "color", "default");
          setNodeData(node, "span", { class: "tag-plugin icon colorful", "data-color": color });
          node.children = [{ type: "text", value: key }];
          break;
        }

        case "ghcard": {
          const repo = attrVal(attrs, "repo", text);
          const theme = attrVal(attrs, "theme", "default");
          const showOwner = attrVal(attrs, "show_owner", "false");
          const params = new URLSearchParams();
          if (theme) params.set("theme", theme);
          if (showOwner === "true") params.set("show_owner", "true");
          const qs = params.toString();
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin ghcard" },
            toHtml("a", { class: "ghcard", href: `https://github.com/${repo}`, target: "_blank", rel: "noopener noreferrer" },
              voidHtml("img", { src: `https://github-readme-stats.vercel.app/api/pin/?repo=${repo}${qs ? `&${qs}` : ""}` })));
          node.children = undefined;
          node.data = undefined;
          break;
        }

        case "navbar": {
          const links = text || attrVal(attrs, "links", "");
          const active = attrVal(attrs, "active", "");
          const items = links.split(" ").filter(Boolean).map((linkStr: string) => {
            const m = linkStr.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (m) return toHtml("a", { class: `link${m[2] === active ? " active" : ""}`, href: m[2] }, m[1]);
            return linkStr;
          }).join("");
          node.type = "html";
          node.value = toHtml("div", { class: "tag-plugin navbar" }, items);
          node.children = undefined;
          node.data = undefined;
          break;
        }
      }
    });
  };
};
