import reactive from "./reactive.js"
import ref from "./ref.js"
import computed from "./computed.js"
import { effect } from "./effect.js"


let obj = reactive({ firstName: '河', lastName: '黄' })
let fullName = null
effect(() => {
    fullName = `${obj.lastName}${obj.firstName}`
})

obj.firstName = '一一'

console.log(fullName)

let num = ref(10)
let salePrice = 0
effect(() => salePrice = num.value * 0.9)
console.log(salePrice)
num.value = 20
console.log(salePrice)


let product = reactive({ price: 5, quantity: 2 })
let total = 0
effect(() => total = product.price * product.quantity)
console.log(total)
product.quantity = 10
console.log(total)
