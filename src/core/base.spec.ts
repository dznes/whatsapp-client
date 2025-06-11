import { describe, it, expect } from "vitest";
import { BaseClient } from "./base";
import { testEnv } from "../test/env";

describe("Whatsapp API Base Client Tests", () => {
  const {
    WA_PHONE_NUMBER_ID,
    CLOUD_API_VERSION,
    CLOUD_API_ACCESS_TOKEN,
    TEST_RECIPIENT_NUMBER,
  } = testEnv;

  let client: BaseClient;

  it("Should be able to initiate Base Client", () => {
    client = new BaseClient(CLOUD_API_ACCESS_TOKEN, "prod");
    expect(client).toBeTruthy();
    expect(client.token).toBe(CLOUD_API_ACCESS_TOKEN);
  });

  it("Should be able to send text message using doRequest", async () => {
    const method = "POST";
    const urlPath = `${CLOUD_API_VERSION}/${WA_PHONE_NUMBER_ID}/messages`;
    const body = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: TEST_RECIPIENT_NUMBER,
      type: "text",
      text: {
        preview_url: false,
        body: "BASE CLIENT test text message",
      },
    };

    const data = await client.doRequest(method, urlPath, body);
    expect(data.messages[0].id).toBeTruthy();
    expect(data.contacts[0].input).toBe(TEST_RECIPIENT_NUMBER);
  });
});
