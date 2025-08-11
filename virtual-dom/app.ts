type VNode =
  | {
      type: string;
      props: Record<string, string>;
      children: VNode[];
    }
  | string;

const $root = document.getElementById("root");

let value = 0;

const vnode = v("div", { class: "container" }, [
  v("div", {}, [v("span", { class: "text" }, [`${value}`])]),
]);

function v(type: string, props: Record<string, string>, children: VNode[]) {
  return {
    type: type,
    props: props,
    children: children,
  };
}

// create dom element from virtual node
function createElement(node: VNode) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const { type, props, children } = node;

  const element = document.createElement(type);

  Object.keys(props).forEach((k: string) => {
    if (props[k]) {
      element.setAttribute(k, props[k]);
    }
  });

  children.forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}

// render virtual node on root dom node
function render(node: VNode) {
  if (!$root) {
    throw new Error("no root found");
  }

  $root.replaceChildren();
  $root.appendChild(createElement(node));
}

function hasDifference(n1: VNode, n2: VNode): boolean {
  // one becomes text or becomes element
  if (typeof n1 !== typeof n2) {
    return true;
  }

  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1 !== n2;
  }

  // has different attributes
  let n1Props = Object.keys(n1.props);
  let n2Props = Object.keys(n2.props);
  if (n1Props.length !== n2Props.length) {
    return true;
  }
  for (let i = 0; i < n1Props.length; i++) {
    let k1 = n1Props[i];
    let k2 = n2Props[i];

    if (k1 !== k2 || n1.props[k1] !== n2.props[k2]) {
      return true;
    }
  }

  return false;
}

// we have two nodes, node1 and node2, we want to diff them
// and see if there is a differece, when there is no difference dont do anything
// when there is a difference, run createElement and replace at that level in the dom
function updateElement(parent, node1, node2, index = 0) {
  if (node1 && !node2) {
    parent.removeChild(parent.childNodes[index]);
    return;
  } else if (!node1 && node2) {
    parent.appendChild(createElement(node2));
    return;
  } else if (hasDifference(node1, node2)) {
    let oldElement = parent.childNodes[index];
    const newElement = createElement(node2);
    parent.replaceChild(newElement, oldElement);
    return;
  }

  if (typeof node1 !== "string" && typeof node2 !== "string") {
    for (let i = 0; i < node1.children.length; i++) {
      updateElement(
        parent.children[i],
        node1.children[i],
        node2.children[i],
        i
      );
    }
  }
}

render(vnode);

const buttonPlus = document.getElementById("button-plus");
const buttonMinus = document.getElementById("button-minus");

let prev = null
let vnode2 = vnode

buttonPlus?.addEventListener("click", () => {
  prev = vnode2
  value++;
  vnode2 = v("div", { class: "container" }, [
    v("div", {}, [v("span", { class: "text" }, [`${value}`])]),
  ]);
  updateElement($root, prev, vnode2);
});

buttonMinus?.addEventListener("click", () => {
  prev = vnode2;
  value--;
  vnode2 = v("div", { class: "container" }, [
    v("div", {}, [v("span", { class: "text" }, [`${value}`])]),
  ]);
  updateElement($root, prev, vnode2);
});
