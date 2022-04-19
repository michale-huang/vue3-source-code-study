import { track, trigger } from "./effect.js"
// export default raw => {
//     return reactive({ value: raw })
// }
export default raw => {
    const r = {
        // 对象访问器

        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            if (raw !== newVal) {
                raw = newVal
                trigger(r, 'value')
            }
        }
    }
    return r
}
