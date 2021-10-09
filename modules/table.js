module.exports = (fields) => {
    let table = "Name            | Description\n----------------|--------------------------------\n"
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i]
        let { name, value } = field

        let line = `${name.padEnd(15)} | ${value}\n`
        table += line
    }
    return table
}