let targetMap = new WeakMap()
export const track = (target, key) => {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)

}

export const trigger = (target, key) => {
    const depsMap = targetMap.get(target)
    if (!depsMap) {
        return
    }
    const dep = depsMap.get(key)
    dep.forEach(effect => {
        effect.run()
    })
}

let activeEffect = null
export const effect = fn => {
    // activeEffect = fn
    // activeEffect()
    const effect = new ReactiveEffect(fn)
    effect.run()
}

class ReactiveEffect {
    constructor(fn) {
        this._fn = fn
    }
    run() {
        activeEffect = this
        this._fn()
    }
}
