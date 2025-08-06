# NeuroSAN Stock Evaluation Server

AI-powered stock analysis service using the NeuroSAN agent framework.

## Quick Start

1. **Install dependencies:**
```bash
pip install -r requirements.txt
```

2. **Configure `.env` file:**
```env
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=https://your-endpoint.openai.azure.com/
OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
```

3. **Start server:**
```bash
python server.py
```

4. **Test the API:**
```bash
python test_client.py AAPL
```

## API Usage

**Endpoint:** `POST http://localhost:8080/api/v1/stock_evaluator/streaming_chat`

**Request:**
```json
{
  "user_message": {
    "text": "AAPL"
  }
}
```

**Response:**
```json
{
  "Stock": "Apple Inc. (AAPL)",
  "Dashboard": [
    {
      "Headline": "News",
      "Summary": "Latest market developments..."
    }
  ],
  "Actions": ["BUY"]
}
```

## Features

- 🤖 AI-powered stock analysis
- 📊 6-factor evaluation dashboard
- 💡 BUY/SELL/HOLD recommendations
- 🔄 Real-time API responses
- 🛡️ Secure Azure OpenAI integration