import { track, trigger } from "./effect.js"
export default raw => {
    return new Proxy(raw, {
        get(target, key, receiver) {
            let result = Reflect.get(target, key, receiver)
            // 收集依赖
            track(target, key)
            return result
        },
        set(target, key, value, receiver) {
            let oldValue = target[key]
            let result = Reflect.set(target, key, value, receiver)
            // 触发依赖
            if (oldValue !== result) {
                trigger(target, key)
            }
            return result
        }
    })
}
