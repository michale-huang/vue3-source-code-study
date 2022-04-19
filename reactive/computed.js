import { effect } from "./effect.js"
export default getter => {
    let result = ref()
    effect(() => result.value = getter())
    return result
}
