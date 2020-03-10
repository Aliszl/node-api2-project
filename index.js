const server = require('./apis/server')

const PORT = 3000

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})
