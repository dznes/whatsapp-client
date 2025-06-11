import { BaseClient } from "./base";

type Image = {
  id?: string;
  link?: string;
};

type Audio = {
  id?: string;
  link?: string;
};

type Location = {
  latitude: string;
  longitude: string;
  name: string;
  address: string;
};

type Contacts = {
  addresses?: {
    street?: string;
    city?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: "HOME" | "WORK";
  }[];
  birthday?: string;
  emails?: {
    email?: string;
    type?: "HOME" | "WORK";
  }[];
  name?: {
    formatted_name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    suffix?: string;
    prefix?: string;
  };
  org?: {
    company: string;
    department: string;
    title: string;
  };
  phones?: {
    phone: string;
    wa_id: string;
    type: "HOME" | "WORK";
  }[];
  urls?: {
    url: string;
    type: "HOME" | "WORK";
  };
};

type BaseMessageProps = {
  type: "text" | "image" | "audio" | "location" | "contacts";
  recipient_number: string;
  content: string;
  context?: {
    message_id: string;
  };
  image?: Image;
  audio?: Audio;
  location?: Location;
  contacts?: Contacts;
};

export class MessagesClient extends BaseClient {
  private phoneId: number;
  private version: string;

  get endpoint() {
    return `${this.version}/${this.phoneId}/messages`;
  }

  constructor(token: string, version: string, phoneId: number) {
    super();
    this.token = token;
    this.version = version;
    this.phoneId = phoneId;
  }

  send({
    type,
    recipient_number,
    content,
    context,
    image,
    audio,
    location,
    contacts,
  }: BaseMessageProps) {
    return this.doRequest("POST", this.endpoint, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient_number,
      type: type,
      context: context ?? undefined,
      text: {
        preview_url: false,
        body: content,
      },
      image: image ?? undefined,
      audio: audio ?? undefined,
      location: location ?? undefined,
      contacts: contacts ?? undefined,
    });
  }

  markAsRead(messageId: string) {
    return this.doRequest("POST", this.endpoint, {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    });
  }
}
