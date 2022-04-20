import createElement from "./createElement.js"
import updateChildren from "./updateChildren.js"

function patchVnode(oldVNode, newVNode) {
    let oldCh = oldVNode.children
    let newCh = newVNode.children
    // newCh是text
    if (typeof newCh === 'string') {
        if (newCh !== oldCh) {
            oldVNode.elm.innerText = newCh
        }
    } else if (Array.isArray(oldCh) && Array.isArray(newCh)) { // newCh和oldCh都是array
        updateChildren(oldVNode.elm, oldCh, newCh)
    } else { // newCh是array, oldCh是string
        oldVNode.elm.innerText = ''
        newCh.forEach(vNode => {
            oldVNode.elm.appendChild(createElement(vNode))
        })
    }
}

export default patchVnode
