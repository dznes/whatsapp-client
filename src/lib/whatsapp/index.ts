import { MediaClient } from "./core/media"
import { MessagesClient } from "./core/message"

export class WhatsappClient {
  public messages: MessagesClient 
  public media: MediaClient 

  constructor(token: string, version: string, phoneId: number) {
    this.messages = new MessagesClient(token, version, phoneId) 
    this.media = new MediaClient(token, version, phoneId)
  }
}
