# SynapseStocks System Architecture

## Overview
SynapseStocks is a modern, agentic AI-powered stock analytics dashboard. It combines a React frontend, a Node.js backend API, and a modular Neuro-SAN agentic AI system for deep, multi-domain stock insights.

---

## High-Level Architecture Diagram

```
+-------------------+         +-------------------+         +----------------------+
|                   |         |                   |         |                      |
|   User Browser    +-------->+   React Frontend  +-------->+   Backend API        |
|   (Client)        |  HTTP   |   (Dashboard.js)  |  REST   |   (Express/Node.js)  |
|                   |         |                   |         |                      |
+-------------------+         +-------------------+         +----------------------+
                                                           |  /api/neurosan/...   |
                                                           +----------+-----------+
                                                                      |
                                                                      | (HTTP/REST)
                                                                      v
                                                          +-----------------------+
                                                          |  Neuro-SAN Agentic    |
                                                          |  AI System            |
                                                          |  (Python/LLM/Agents)  |
                                                          +-----------------------+
```

---

## Component Breakdown

### 1. User Browser
- Interacts with the app via a modern web browser.

### 2. React Frontend (client/src/components/Dashboard.js)
- Written in React + MUI.
- Handles UI, stock selection, and displays analytics.
- Calls backend API endpoints to fetch analysis and stock data.
- Receives results and presents them to the user.

### 3. Backend API (Express/Node.js or similar)
- Receives REST API requests from the frontend.
- Handles endpoints like `/api/neurosan/stock-analysis` and `/api/agent/news`.
- Forwards analysis requests to the Neuro-SAN agentic AI system.
- May also handle authentication, user management, etc.

### 4. Neuro-SAN Agentic AI System
- A backend system (often Python-based) that orchestrates multiple AI agents.
- Each agent specializes in a domain (news, financials, chemical prices, climate, sentiment, regulatory, etc.).
- Receives requests from the backend API, runs advanced analytics (possibly using LLMs, data pipelines, or ML models).
- Aggregates and returns structured insights and recommendations.

---

## Data Flow Example

1. **User selects a stock and clicks "Get Insights"** in the React Dashboard.
2. **Frontend sends POST** to `/api/neurosan/stock-analysis` with the selected stock symbol.
3. **Backend API receives request** and forwards it to the Neuro-SAN system.
4. **Neuro-SAN orchestrates agentic analysis**, collects data from various agents, and compiles a dashboard summary.
5. **Backend API receives the analysis** and sends it back to the frontend.
6. **Frontend displays insights** in the dashboard cards.

---

## Technologies

- **Frontend:** React, Material-UI (MUI)
- **Backend:** Node.js (Express or similar)
- **AI System:** Python (FastAPI/Flask, LLMs, custom agent orchestration)
- **Communication:** REST APIs (JSON)
- **Agentic AI:** Modular agents for each data/insight domain, orchestrated by Neuro-SAN

---

## Diagram as Image
If you need this diagram as a PNG or SVG, let us know!
