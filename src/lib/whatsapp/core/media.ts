import { BaseClient } from "./base";

type BaseMediaProps = {
  file: File;
};

export class MediaClient extends BaseClient {
  private phoneId: number;
  private version: string;

  get endpoint() {
    return `${this.version}/${this.phoneId}/media`;
  }

  constructor(token: string, version: string, phoneId: number) {
    super();
    this.token = token;
    this.version = version;
    this.phoneId = phoneId;
  }

  upload({ file }: BaseMediaProps) {
    return this.doRequest("POST", this.endpoint, {
      messaging_product: "whatsapp",
      file,
    });
  }
}
