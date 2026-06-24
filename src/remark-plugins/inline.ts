import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Node } from "unist";
import { setNodeData, attrVal } from "./helpers";

export const remarkStellarInline: Plugin = () => {
  return (tree: Node) => {
    visit(tree, "textDirective", (node: any) => {
      const attrs = node.attributes || {};

      switch (node.name) {
        case "u":
          setNodeData(node, "u");
          break;
        case "emp":
          setNodeData(node, "emp");
          break;
        case "wavy":
          setNodeData(node, "wavy");
          break;
        case "del":
          setNodeData(node, "del");
          break;
        case "kbd":
          setNodeData(node, "kbd");
          break;
        case "psw":
          setNodeData(node, "psw");
          break;
        case "blur":
          setNodeData(node, "blur");
          break;
        case "sup":
          setNodeData(node, "sup", {
            class: "tag-plugin colorful sup",
            "data-color": attrVal(attrs, "color"),
          });
          break;
        case "sub":
          setNodeData(node, "sub", {
            class: "tag-plugin colorful sub",
            "data-color": attrVal(attrs, "color"),
          });
          break;
        case "mark":
          setNodeData(node, "mark", {
            class: "tag-plugin colorful mark",
            "data-color": attrVal(attrs, "color", "default"),
          });
          break;
        case "hashtag":
          setNodeData(node, "a", {
            class: "tag-plugin colorful hashtag",
            href: attrVal(attrs, "href", "#"),
            "data-color": attrVal(attrs, "color"),
          });
          break;
      }
    });
  };
};
