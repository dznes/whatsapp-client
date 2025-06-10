import { describe, it, assert, expect } from "vitest";
import { MessagesClient } from "./message";
import { env } from "../../../env";

const numberId = env.WA_PHONE_NUMBER_ID;
const version = env.CLOUD_API_VERSION;
const token = env.CLOUD_API_ACCESS_TOKEN;

describe("Whatsapp Message Client", () => {
  it("Should be able to init messages client", async () => {
    const client = new MessagesClient(token, version, numberId);

    assert(client)
    expect(client.token).toBeTruthy()

  });
  it("Should be able to send a message", async () => {
    const client = new MessagesClient(token, version, numberId);
    const data = await client.send({
      type: "text",
      recipient_number: "5511968622121",
      content: "Teste envio de mensagem pelo Whatsapp API Client",
    })
    console.log(data)
  });
});
