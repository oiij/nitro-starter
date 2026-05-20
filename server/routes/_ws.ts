import { defineWebSocketHandler } from 'nitro'

const peerMap = new Map<string, any>()

export default defineWebSocketHandler({
  open(peer) {
    const id = peer.id
    peerMap.set(id, peer)
    peer.websocket.send?.(JSON.stringify({ type: 'connected', payload: { message: 'Hello, World!', connections: [...peerMap.values()] } }))
  },
  async message(peer, message) {
    try {
      const msg = JSON.parse(typeof message === 'string' ? message : message.toString())
      peer.websocket.send?.(JSON.stringify(msg))
    }
    catch {
      peer.send(JSON.stringify({ type: 'error', payload: { message: '消息格式错误' } }))
    }
  },
  async close(peer) {
    const id = peer.id
    peerMap.delete(id)
  },
  error(_peer, error) {
    console.error('Error:', error)
  },
})
