import { remarkStellarInline } from "./inline";
import { remarkStellarContainers } from "./containers";
import { remarkStellarLeaf } from "./leaf";

export { remarkStellarInline } from "./inline";
export { remarkStellarContainers } from "./containers";
export { remarkStellarLeaf } from "./leaf";

export function remarkStellarAll() {
  return (tree: any, file: any) => {
    remarkStellarInline()(tree, file);
    remarkStellarContainers()(tree, file);
    remarkStellarLeaf()(tree, file);
  };
}
