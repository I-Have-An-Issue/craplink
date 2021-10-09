const colors = require("./colors")

exports.info = (...arguments) => {
    let time = new Date()
    process.stdout.write(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${colors.FgCyan}${arguments.join("")}${colors.Reset}\n`)
}

exports.warn = (...arguments) => {
    let time = new Date()
    process.stdout.write(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${colors.FgYellow}${arguments.join("")}${colors.Reset}\n`)
}

exports.error = (...arguments) => {
    let time = new Date()
    process.stdout.write(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${colors.FgRed}${arguments.join("")}${colors.Reset}\n`);
}

exports.success = (...arguments) => {
    let time = new Date()
    process.stdout.write(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${colors.FgGreen}${arguments.join("")}${colors.Reset}\n`);
}