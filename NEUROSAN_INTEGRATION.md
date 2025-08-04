# NeuroSAN Integration Guide

## Overview
This document describes the integration of NeuroSAN Stock Evaluator API with the SynapseStocks frontend.

## Integration Details

### API Endpoint
- **URL**: `http://localhost:8080/api/v1/stock_evaluator/streaming_chat`
- **Method**: POST
- **Content-Type**: application/json

### Request Format
```json
{
  "user_message": {
    "text": "STOCK_SYMBOL"
  }
}
```

### Response Format
The API returns a JSON response with structured stock analysis including:
- **Stock**: Company name and symbol
- **Dashboard**: 6 domain-specific factors with headlines and summaries
- **Actions**: Array with BUY/SELL/HOLD recommendation

### Frontend Changes Made

1. **Environment Configuration**
   - Added `REACT_APP_NEUROSAN_API_URL=http://localhost:8080` to `.env`

2. **Dashboard Component Updates**
   - Added state management for stock analysis and loading
   - Implemented `handleGetInsights()` function to call NeuroSAN API
   - Created `renderDashboardCards()` to dynamically display API results
   - Updated stock selection to include multiple sectors (Tech, Auto, Pharma, Energy)
   - Enhanced recommendation chip to show BUY/SELL/HOLD with appropriate colors

3. **Supported Stock Symbols**
   - **Technology**: AAPL, MSFT
   - **Automotive**: TSLA
   - **Pharmaceutical**: JNJ, PFE
   - **Energy**: XOM

## Usage Instructions

1. **Start NeuroSAN Server**
   ```bash
   cd neuro-san
   python -m neuro_san.service.main_loop.server_main_loop
   ```

2. **Start Frontend**
   ```bash
   cd client
   npm start
   ```

3. **Use the Dashboard**
   - Select a stock from the dropdown
   - Click "Get Insights" to fetch analysis from NeuroSAN
   - View the 6 dynamic factor cards with real-time data
   - See the BUY/SELL/HOLD recommendation

## Features
- Real-time stock analysis from NeuroSAN AI agent
- Dynamic dashboard cards based on stock domain
- Loading states and error handling
- Multi-sector stock support
- Color-coded recommendations (Green=BUY, Red=SELL, Orange=HOLD)