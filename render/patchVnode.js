import createElement from "./createElement.js"
import updateChildren from "./updateChildren.js"

function patchVnode(oldVNode, newVNode) {
    let oldCh = oldVNode.children
    let newCh = newVNode.children
    // newCh是text
    if (typeof newCh === 'string') {
        console.log(newCh, oldCh)
        if (newCh !== oldCh) {
            oldVNode.elm.innerText = newCh
        }
    } else if (Array.isArray(oldCh) && Array.isArray(newCh)) {
        patchVnode(oldCh, newCh)
        // newCh是children
        if (typeof oldCh === 'string') {
            let oldPNode = oldVNode.elm.parentNode
            oldVNode.elm.innerText = ''
            newCh.forEach(vNode => {
                oldPNode.appendChild(createElement(vNode))
            })
        } else {
            updateChildren(oldVNode.elm, oldCh, newCh)
        }
    }
}

export default patchVnode
