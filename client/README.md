# SynapseStocks Client

This is the React frontend for SynapseStocks, an agentic AI-powered stock intelligence platform.

## Features
- Modern, responsive UI with Material-UI (MUI)
- Secure login with JWT authentication
- Dashboard with cards for News, Financials, Chemical Prices, Climate, Social Sentiment, and Regulatory factors
- Dynamic data fetching from backend agents
- Easy API URL configuration via `.env`

## Getting Started

### 1. Install Dependencies
```
npm install
```

### 2. Configure Environment
Copy `.env.sample` to `.env` and update the backend API URL if needed:
```
REACT_APP_API_URL=http://localhost:4000
```

### 3. Run the App
```
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `src/components/` — Main UI components (Dashboard, AgentConfigurator, ResultsView)
- `src/pages/` — Page-level components (LoginPage)
- `src/assets/` — Static images (e.g., login page background)

## Environment Variables
- `REACT_APP_API_URL` — Backend server URL for API calls

## Notes
- Ensure the backend is running and accessible at the configured API URL.
- For demo/testing, register a user via the backend or add directly to `db.json`.

---
For more details, see the main project README or contact the maintainers.
