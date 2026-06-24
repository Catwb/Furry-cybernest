import type { Node } from "unist";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";

export interface DirectiveNode extends Parent {
  type: "textDirective" | "leafDirective" | "containerDirective";
  name: string;
  attributes?: Record<string, string>;
  children: Node[];
}

export function isDirective(node: Node): node is DirectiveNode {
  return (
    node.type === "textDirective" ||
    node.type === "leafDirective" ||
    node.type === "containerDirective"
  );
}

export function setNodeData(
  node: Node,
  tagName: string,
  properties?: Record<string, string | boolean | undefined>,
) {
  const data = node.data || (node.data = {});
  data.hName = tagName;
  if (properties) {
    data.hProperties = { ...(data.hProperties || {}), ...properties };
  }
}

export function hasAttr(attrs: Record<string, string> | undefined, key: string): boolean {
  return attrs?.[key] !== undefined && attrs?.[key] !== "false" && attrs?.[key] !== "";
}

export function attrVal(
  attrs: Record<string, string> | undefined,
  key: string,
  fallback = "",
): string {
  return attrs?.[key] || fallback;
}

export function toBool(val: string | undefined): boolean {
  return val === "true" || val === "";
}
