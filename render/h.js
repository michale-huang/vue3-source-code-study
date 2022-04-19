import vNode from "./vNode.js"

const h = (sel, data, children, elm) => {
    return vNode(sel, data, children, elm)
}

export default h
