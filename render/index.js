import h from "./h.js"
import patch from "./patch.js"

const container = document.querySelector('#container')

// const vNode1 = h('section', { class: 'red', 'data-age': 10 }, 'hh')

// patch(container, vNode1)

// const vNode2 = h('section', { class: 'green' }, [
//     h('div', { class: 'big' }, [
//         h('span', {}, '第三层')
//     ]),
//     h('div', {}, '第二层-2'),
//     h('div', { class: 'green' }, '第二层-1')
// ])


const vNode1 = h('section', { class: 'red' }, [
    h('div', { key: 'A' }, 'A'),
    h('div', { key: 'B' }, 'B'),
    h('div', { key: 'C' }, 'C')
])

patch(container, vNode1)

const vNode2 = h('section', { class: 'green' }, [
    h('div', { key: 'C' }, 'C1'),
    h('div', { key: 'A' }, 'A'),
    h('div', { key: 'E' }, 'E'),
    h('div', { key: 'D' }, 'D')
])


document.querySelector('#btn').onclick = () => {
    patch(vNode1, vNode2)
}
