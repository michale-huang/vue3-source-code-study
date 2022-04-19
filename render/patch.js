import createElement from "./createElement.js"
import vNode from "./vNode.js"
import patchVnode from "./patchVnode.js"

function patch(oldVNode, newVNode) {
    // oldVNode不是虚拟dom
    if (!oldVNode.sel) {
        oldVNode = vNode(oldVNode.tagName.toLowerCase(), {}, [], oldVNode)
    }
    // oldVnode和newVnode是同一个虚拟节点
    if (oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel) {
        patchVnode(oldVNode, newVNode)
    } else {
        // oldVnode和newVnode不是同一个虚拟节点
        // 删除旧节点，添加新节点
        const newTrueDomTree = createElement(newVNode)
        if (oldVNode.elm.parentNode) {
            // 添加新节点
            oldVNode.elm.parentNode.appendChild(newTrueDomTree)
            // 删除旧节点
            oldVNode.elm.parentNode.removeChild(oldVNode.elm)
        }
    }
}

export default patch
