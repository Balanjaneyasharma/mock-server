# 🧪 Dynamic Mock Server with Schema-Based Random Data

A powerful Express-based mock server that dynamically generates **random API responses** using defined **schemas**. Perfect for front-end developers to simulate APIs without backend dependencies.

## 🚀 Features
- ✅ Supports all HTTP methods: `GET`, `POST`, `PUT`, `DELETE`
- 🧠 Dynamic data generation using JSON Schema
- 🧪 Payload validation for POST/PUT requests
- 🔁 Easily reload endpoints from a single config file
- 📦 Modular structure for easy maintenance
- ⚡ Built-in `/randomData` test endpoint

## 📁 Project Structure
```
mock-server/
├── mock-routes.json          # Define all mock routes here
├── schemas/                  # Optional: store shared schema files
├── utilities/
│   ├── randomGenerator.js    # Generates data based on schema
│   ├── schemaValidator.js    # Validates payloads using schema
│   └── json-schema.js        # Shared schema types (JSDoc typed)
├── server.js                 # Entry point
├── package.json
```

## 📦 Installation
```bash
git clone https://github.com/Balanjaneyasharma/mock-server.git
cd mock-server
npm install
```

## ▶️ Running the Server
```bash
node server.js
```
Server runs at: `http://localhost:3424`

## 🔧 How to Use

### 1. Define Routes in `mock-routes.json`
```json
{
  "/api/users": {
    "GET": {
      "status": 200,
      "schema": {
        "type": "array",
        "minItems": 3,
        "maxItems": 6,
        "items": {
          "type": "object",
          "properties": {
            "id": { "type": "id", "format": "uuid" },
            "name": { "type": "string", "minLength": 3, "maxLength": 10 },
            "email": { "type": "string", "format": "email" }
          },
          "required": ["id", "name", "email"]
        }
      }
    }
  },
  "/api/user": {
    "POST": {
      "status": 201,
      "schema": {
        "type": "object",
        "properties": {
          "name": { "type": "string", "minLength": 3 },
          "email": { "type": "string", "format": "email" }
        },
        "required": ["name", "email"]
      },
      "response": { "message": "User created successfully" }
    }
  }
}
```

### 2. Start the Server
```bash
node server.js
```

### 3. Use the Mock API
- `GET http://localhost:3424/api/users` → returns schema-based random user list
- `POST http://localhost:3424/api/user` → validates and returns mock success

## 🔁 Reloading Routes
Update `mock-routes.json` and restart the server to apply changes.

💡 Use `nodemon` for auto-restart:
```bash
npm install -g nodemon
nodemon server.js
```

## 🔬 Test Endpoint
Hit this to verify schema-based generation:
```
GET http://localhost:3424/randomData
```
Returns:
```json
{
  "id": 123,
  "name": "John Doe"
}
```

## 📚 Supported Schema Types
- **string**: with `format` (email, date, phone), `minLength`, `maxLength`
- **number**: with `min`, `max`
- **boolean**
- **null**
- **array**: with `minItems`, `maxItems`, and nested `items`
- **object**: with `properties`, `required`
- **id**: custom type with `format: "uuid"` or `"number"`

## 📦 Use Cases
- Front-end development without waiting for backend
- UI testing with dynamic/randomized data
- Simulate API behaviors for QA/demos

## ✨ Future Plans
- [ ] Hot-reloading for routes
- [ ] UI or CLI to define routes
- [ ] OpenAPI/Swagger auto-gen support
- [ ] Publish as an npm package (`npx mock-server`)

## 🛠 Maintainer
Built with ❤️ by Balu
