import { BaseClient } from "./base";

type SendMessageProps = {
  type: string;
  recipient_number: string;
  content: string;
};

export class MessagesClient extends BaseClient {
  private phoneId: number;
  private version: string;

  get endpoint() {
    return `${this.version}/${this.phoneId}/messages`;
  }

  constructor(token: string, version: string, phoneId: number) {
    super();
    this.token = token
    this.version = version;
    this.phoneId = phoneId;
  }

  send({ type, recipient_number, content }: SendMessageProps) {
    return this.doRequest("POST", this.endpoint, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient_number,
      type: type,
      text: {
        preview_url: false,
        body: content,
      },
    });
  }
}
