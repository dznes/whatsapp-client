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

## 🛠️ Environment Setup

### Run PostgreSQL on Port 5433

You can run PostgreSQL on a non-default port (5433) using Docker:

```bash
docker run --name pg-whatsapp \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=whatsapp_server \
  -p 5433:5432 \
  -d postgres
```

### Create Database Schema

Once PostgreSQL is running, apply the schema using the following command:

```bash
psql -U postgres -W -h localhost -p 5433 -d whatsapp_server -f sql/schema.sql
```

---

## 🧩 Project Structure

```
src/
├── clients/
│   ├── message.ts           # Generic request client with request/response logging
│   └── media.ts             # Handles media uploads to WhatsApp Cloud API
├── sql/
│   └── schema.sql           # SQL schema for database initialization
├── utils/
│   └── validation.ts        # (Planned) Zod runtime validators
.env                         # Environment config
README.md                    # Project documentation
```

---

## 📦 Usage Example

```ts
import { BaseClient } from "./clients/baseClient";

const client = new BaseClient("YOUR_ACCESS_TOKEN");

// This will use multipart/form-data automatically because the path ends in /media
await client.doRequest("POST", "v18.0/{{Phone-Number-ID}}/media", {
  messaging_product: "whatsapp",
  file: "/Users/Sample.jpg"
});
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
- [ ] Create unit tests for `BaseClient` and `MediaClient` using Jest or Vitest
- [ ] Type-safe configuration loading from `.env`

---

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

