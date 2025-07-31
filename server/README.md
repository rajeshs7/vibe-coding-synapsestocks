# SynapseStocks Server

This is the Node.js/Express backend for SynapseStocks, providing agentic AI endpoints and authentication for the stock intelligence platform.

## Features
- Express API with modular routing
- JWT authentication and user registration
- Passwords securely hashed with bcryptjs
- Agent endpoints (e.g., NewsAgent) for multi-factor stock analysis
- Data storage via lowdb (JSON-based, file-backed)

## Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Configure Environment
Create a `.env` file (see `.env.sample` if present) and set your secrets:
```
PORT=4000
JWT_SECRET=your_secret_key
```

### 3. Run the Server
```
npm run dev
```

The server will run at [http://localhost:4000](http://localhost:4000).

## Project Structure
- `src/index.js` — Main entry point
- `src/auth.js` — Authentication routes
- `src/db.js` — Shared lowdb instance
- `src/agents/` — Modular agent implementations
- `db.json` — Data storage (users, agents, results)

## Notes
- Ensure `db.json` is writable by the server process.
- Never commit real `.env` files or secrets to version control.
- Extend agents by adding new modules to `src/agents/` and registering new routes.

---
For more details, see the main project README or contact the maintainers.
