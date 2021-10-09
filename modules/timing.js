const crypto = require("crypto")
let timers = {}

function interval(func, delay, name) {
    let timerName = name || crypto.randomUUID()
    let timer = setInterval(func, delay)
    timers[timerName] = timer
    return timerName
}

function stopInterval(timer) {
    try {
        clearInterval(timers[timer])
        timers[timer] = null
    }
    catch (e) {}
}

function timeout(func, delay, name) {
    let timerName = name || crypto.randomUUID()
    let timer = setTimeout(func, delay)
    timers[timerName] = timer
    return timerName
}

function stopTimeout(timer) {
    try {
        clearTimeout(timers[timer])
        timers[timer] = null
    }
    catch (e) {}
}

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
    })
}

module.exports = {
    interval,
    stopInterval,
    timeout,
    stopTimeout,
    sleep,
}