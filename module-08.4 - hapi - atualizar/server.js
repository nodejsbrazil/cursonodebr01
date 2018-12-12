const http = require('http')

http.createServer((req, res) => {
    res.end('Hello node!')
}).listen(4000, () => {
    console.log('server rodando!!')
})