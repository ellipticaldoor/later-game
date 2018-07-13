import 'game'
import { server } from 'server/socket'
import 'server/state/state'

const port = process.env.PORT || 4000

server.listen(port, () => console.log(`Listening socket.io on port ${port}`))
