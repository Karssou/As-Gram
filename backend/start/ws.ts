import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    console.log(`Utilisateur connecté : ${socket.id}`)

    // Écouter un message envoyé par un client
    socket.on('message', (data) => {
      console.log('Message reçu :', data)
      io.emit('message', data) // Réémet le message à tous les clients
    })

    socket.on('disconnect', () => {
      console.log(`Utilisateur déconnecté : ${socket.id}`)
    })
  })

  io.listen(3333)
  console.log('Serveur WebSocket démarré sur le port 3333')
})
