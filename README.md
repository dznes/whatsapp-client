# WhatsApp Client SDK

A custom Node.js SDK for interacting with the WhatsApp Cloud API, including media upload, message handling, and more.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dznes/whatsapp-client.git
cd whatsapp-client
```

### 2. Install dependencies

```bash
npm install
```

---

## 🧩 Project Structure

```
src/
├── clients/
│   ├── message.ts           # Generic request client with request/response logging
│   └── media.ts             # Handles media uploads to WhatsApp Cloud API

├── utils/
│   └── validation.ts        # (Planned) Zod runtime validators
.env                         # Environment config
README.md                    # Project documentation
```

---

## 📌 TODOs

- [ ] **Add runtime validations** using [`zod`](https://github.com/colinhacks/zod) or similar:
- Validate token and environment in `BaseClient` constructor
- Validate body input shape for all request methods
- [ ] **Enhance `MediaClient`**:
- [ ] Detect MIME type and set appropriate `Content-Type` headers for each media file
  - [ ] Format `body` into `FormData` for `/media` endpoints using file streams
- [ ] Add retry logic with exponential backoff (especially for 429 rate-limit errors)
  - [ ] Add logging configuration:
- Allow toggling verbose mode (debug logs vs. silent prod)

  - [x] Create unit tests for `BaseClient` and `MediaClient` using Jest or Vitest
  - [x] Type-safe configuration loading from `.env`

  ***

## 🔒 Authentication

    Set your token in an `.env` file:

```
WHATSAPP_TOKEN=your_facebook_access_token_here
```

Or pass it directly to the client constructor:

```ts
const client = new BaseClient("your_token_here");
```

---

## 📄 License

MIT
