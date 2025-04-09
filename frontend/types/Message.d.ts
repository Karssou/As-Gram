interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
  updatedAt: string;
  reactions: MessageReactions[];
}
