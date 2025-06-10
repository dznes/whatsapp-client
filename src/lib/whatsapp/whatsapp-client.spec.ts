import { describe, it, expect } from "vitest";
import { WhatsappClient } from ".";
import { env } from "../../env";

const numberId = env.WA_PHONE_NUMBER_ID;
const version = env.CLOUD_API_VERSION;
const token = env.CLOUD_API_ACCESS_TOKEN;
const recipient_number = process.env.TEST_RECIPIENT_NUMBER

if (!recipient_number) {
  throw new Error("ADD RECIPIENT NUMBER FOR TESTS")
}

describe("Whatsapp Client tests", () => {
  it("Should be able to init Whatsapp client", () => {
    const client = new WhatsappClient(token, version, numberId);
    expect(client).toBeTruthy();
  });
  it("Should be able to use Message methods", async () => {
    const client = new WhatsappClient(token, version, numberId);
    const data = await client.messages.send({
      type: "text",
      recipient_number,
      content: "Envio teste utilizando Whatsapp Client",
    });
    expect(data.messages[0].id).toBeTruthy();
  });
});
