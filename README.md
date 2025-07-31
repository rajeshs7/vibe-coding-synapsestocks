# SynapseStocks

Agentic AI-powered stock intelligence platform

---

## Overview
SynapseStocks is a full-stack, agentic AI platform designed to help investors and analysts make smarter stock trading decisions. It combines modular AI agents, modern dashboards, and secure authentication to provide explainable, multi-factor market insights.

- **Frontend:** React + Material-UI (client/)
- **Backend:** Node.js + Express + lowdb (server/)
- **AI Agents:** Modular, pluggable, and sector-aware

---

## Monorepo Structure
```
SynapseStocks/
├── client/   # React frontend (dashboard, login, agent config)
├── server/   # Node.js backend (API, agents, auth, db)
├── README.md # (this file)
```

---

## Quick Start

### 1. Clone the repo
```
git clone https://github.com/Cognizant-SPE/vibe-coding-synapsestocks.git
cd vibe-coding-synapsestocks
```

### 2. Setup the backend
```
cd server
npm install
cp .env.sample .env   # or create your own .env
npm run dev
```

### 3. Setup the frontend
```
cd ../client
npm install
cp .env.sample .env   # or create your own .env
npm start
```

---

## Features
- Secure login with JWT authentication
- Dashboard with agent cards for News, Financials, Chemical Prices, Climate, Social Sentiment, and Regulatory factors
- Modular backend agents (easy to extend)
- Environment-based API configuration
- Clean, modern UI with Material-UI

---

## Contributing
- Fork and clone the repo
- See `client/README.md` and `server/README.md` for details on each part
- PRs and issues welcome!

---

## License
This project is for demo and educational use. See LICENSE file if present.
