function createElement(vNode) {
    const trueDomTree = document.createElement(vNode.sel)
    // 添加属性
    for (const key in vNode.data) {
        trueDomTree.setAttribute(key, vNode.data[key])
    }
    // 有子节点
    if (Array.isArray(vNode.children) && vNode.children.length > 0) {
        vNode.children.forEach(node => {
            trueDomTree.appendChild(createElement(node))
        })
    } else {
        // 子节点是字符串
        trueDomTree.innerText = vNode.children
    }
    vNode.elm = trueDomTree
    return trueDomTree
}

export default createElement
