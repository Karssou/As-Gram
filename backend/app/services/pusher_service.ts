import Pusher from 'pusher'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
})

export class PusherService {
  static async sendMessage(conversationId: number, message: any) {
    await pusher.trigger(`conversation-${conversationId}`, 'new-message', message)
  }

  public static async sendTyping(conversationId: number, userId: number) {
    await pusher.trigger(`conversation-${conversationId}`, 'user-typing', {
      userId,
    })
  }
}
