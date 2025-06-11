import { describe, it, expect } from "vitest";
import { WhatsappClient } from ".";
import { testEnv } from "./test/env"

describe("Whatsapp Client tests", () => {
  const { WA_PHONE_NUMBER_ID, CLOUD_API_VERSION, CLOUD_API_ACCESS_TOKEN, TEST_RECIPIENT_NUMBER } = testEnv
  const numberId = testEnv.WA_PHONE_NUMBER_ID
  const version = testEnv.CLOUD_API_VERSION;
  const token = testEnv.CLOUD_API_ACCESS_TOKEN;
  const recipient_number = testEnv.TEST_RECIPIENT_NUMBER

  it("Should be able to init Whatsapp client", () => {
    const client = new WhatsappClient(CLOUD_API_ACCESS_TOKEN, CLOUD_API_VERSION, WA_PHONE_NUMBER_ID);
    expect(client).toBeTruthy();
  });

  it("Should be able to use Message methods", async () => {
    const client = new WhatsappClient(CLOUD_API_ACCESS_TOKEN, CLOUD_API_VERSION, WA_PHONE_NUMBER_ID);
    const data = await client.messages.send({
      type: "text",
      recipient_number: TEST_RECIPIENT_NUMBER,
      content: "Envio teste utilizando Whatsapp Client",
    });
    expect(data.messages[0].id).toBeTruthy();
  });
});
