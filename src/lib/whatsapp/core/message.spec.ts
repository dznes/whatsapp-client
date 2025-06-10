import { describe, it, assert, expect } from "vitest";
import { MessagesClient } from "./message";
import { env } from "../../../env";

const numberId = env.WA_PHONE_NUMBER_ID;
const version = env.CLOUD_API_VERSION;
const token = env.CLOUD_API_ACCESS_TOKEN;
const recipient_number = process.env.TEST_RECIPIENT_NUMBER

if (!recipient_number) {
  throw new Error("ADD RECIPIENT NUMBER FOR TESTS")
}

describe("Whatsapp Message Client", () => {
  it("Should be able to init messages client", async () => {
    const client = new MessagesClient(token, version, numberId);

    assert(client);
    expect(client.token).toBeTruthy();
  });
  it("Should be able to send a message", async () => {
    const client = new MessagesClient(token, version, numberId);
    const data = await client.send({
      type: "text",
      recipient_number,
      content: "Teste envio de mensagem pelo Whatsapp API Client",
    });
    assert(data.messages[0].id);
    expect(data.contacts[0].input === recipient_number);
  });

  it("Should be able to reply to a message", async () => {
    const client = new MessagesClient(token, version, numberId);
    const firstMessage = await client.send({
      type: "text",
      recipient_number,
      content: "Teste envio de mensagem pelo Whatsapp API Client",
    });
    const messageId = firstMessage.messages[0].id;

    const data = await client.send({
      type: "text",
      recipient_number,
      context: {
        message_id: messageId,
      },
      content: `Mensagem de responsta para a mensage de ID: ${messageId}`,
    });
    assert(data.messages[0].id);
    expect(data.contacts[0].input === recipient_number);
  });
});
