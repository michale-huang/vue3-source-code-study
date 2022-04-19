import createElement from "./createElement.js"
import patchVnode from "./patchVnode.js"

function isSameNode(oldVNode, newVnode) {
    return oldVNode.data.key === newVnode.data.key
}

function updateChildren(parentElm, oldCh, newCh) {
    console.log(oldCh, newCh)
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let newEndIdx = newCh.length - 1
    let oldStartVNode = oldCh[0]
    let oldEndVNode = oldCh[oldEndIdx]
    let newStartVNode = newCh[0]
    let newEndVNode = newCh[oldEndIdx]
    let keyMap = null

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        console.log('☆')
        // 新前 与 旧前
        if (isSameNode(newStartVNode, oldStartVNode)) {
            patchVnode(oldStartVNode, newStartVNode)
            newStartVNode = newCh[++newStartIdx]
            oldStartVNode = oldCh[++oldStartIdx]
        }
        // 新后 与 旧后
        else if (isSameNode(newEndVNode, oldEndVNode)) {
            patchVnode(oldEndVNode, newEndVNode)
            newEndVNode = newCh[--newEndIdx]
            oldEndVNode = oldCh[--oldEndIdx]
        }
        // 新后 与 旧前
        else if (isSameNode(newEndVNode, oldStartVNode)) {
            patchVnode(oldStartVNode, newEndVNode)
            parentElm.insertBefore(oldStartVNode.elm, oldEndVNode.elm.siblings)
            newEndVNode = newCh[--newEndIdx]
            oldStartVNode = oldCh[++oldStartIdx]
        }
        // 新前 与 旧后
        else if (isSameNode(newStartVNode, oldEndVNode)) {
            patchVnode(oldEndVNode, newStartVNode)
            parentElm.insertBefore(oldEndVNode.elm, oldStartVNode.elm)
            newStartVNode = newCh[++newStartIdx]
            oldEndVNode = oldCh[--oldEndIdx]
        } else {
            // 不满足以上4种情况
            if (!keyMap) {
                keyMap = new Map()
                for (let i = oldStartIdx; i <= oldEndIdx; i++) {
                    keyMap.set(oldCh[i].data.key, i)
                }
            }
            if (newStartVNode) {
                let idxInOld = keyMap.get(newStartVNode.data.key)
                // oldCh里存在
                if (idxInOld) {
                    parentElm.insertBefore(oldCh[idxInOld].elm, oldEndVNode.elm)
                } else {
                    // oldCh里不存在，说明是新增
                    parentElm.insertBefore(createElement(newCh[newStartIdx]), oldEndVNode.elm)
                }
                ++newStartIdx
            }
        }

    }

    // 新节点还有剩余
    if (newStartIdx <= newEndIdx) {
        for (let i = newStartIdx; i <= newEndIdx; i++) {
            // parentElm.insertBefore(createElement(newCh[i]), oldEndVNode.elm)
            parentElm.insertBefore(createElement(newCh[i]), null)
        }
    }

    // 老节点还有还有剩余
    if (oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
            parentElm.removeChild(oldCh[i].elm)
        }
    }
}

export default updateChildren
