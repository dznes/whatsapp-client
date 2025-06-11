import { describe, it, assert, expect } from "vitest";
import { MessagesClient } from "./message";
import { testEnv } from "../test/env";

describe("Whatsapp Message Client", () => {
  const {
    WA_PHONE_NUMBER_ID,
    CLOUD_API_VERSION,
    CLOUD_API_ACCESS_TOKEN,
    TEST_RECIPIENT_NUMBER,
  } = testEnv;

  let client: MessagesClient; 

  it("Should be able to init messages client", async () => {
    client = new MessagesClient(
      CLOUD_API_ACCESS_TOKEN,
      CLOUD_API_VERSION,
      WA_PHONE_NUMBER_ID,
    );

    assert(client);
    expect(client.token).toBeTruthy();
  });
  it("Should be able to send a message", async () => {
    const data = await client.send({
      type: "text",
      recipient_number: TEST_RECIPIENT_NUMBER,
      content: "Teste envio de mensagem pelo Whatsapp API Client",
    });
    assert(data.messages[0].id);
    expect(data.contacts[0].input === TEST_RECIPIENT_NUMBER);
  });

  it("Should be able to reply to a message", async () => {
    const firstMessage = await client.send({
      type: "text",
      recipient_number: TEST_RECIPIENT_NUMBER,
      content: "Teste envio de mensagem pelo Whatsapp API Client",
    });
    const messageId = firstMessage.messages[0].id;

    const data = await client.send({
      type: "text",
      recipient_number: TEST_RECIPIENT_NUMBER,
      context: {
        message_id: messageId,
      },
      content: `Mensagem de responsta para a mensage de ID: ${messageId}`,
    });
    assert(data.messages[0].id);
    expect(data.contacts[0].input === TEST_RECIPIENT_NUMBER);
  });
});
