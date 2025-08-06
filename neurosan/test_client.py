"""Test client for NeuroSAN stock evaluation server"""

import requests
import json
import sys

def test_stock_evaluation(symbol: str = "AAPL"):
    """Test the stock evaluation agent"""
    
    url = "http://localhost:8080/api/v1/stock_evaluator/streaming_chat"
    payload = {"user_message": {"text": symbol}}
    
    try:
        print(f"Testing stock evaluation for {symbol}...")
        response = requests.post(url, json=payload, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            # Extract just the stock analysis from the response
            if "response" in result and "text" in result["response"]:
                stock_data = json.loads(result["response"]["text"])
                print("\nStock Analysis:")
                print(f"Stock: {stock_data['Stock']}")
                print(f"Recommendation: {stock_data['Actions'][0]}")
                print("\nFactors:")
                for factor in stock_data['Dashboard']:
                    print(f"- {factor['Headline']}: {factor['Summary']}")
            else:
                print(json.dumps(result, indent=2))
        else:
            print(f"Error {response.status_code}: {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Connection error: {e}")
        print("Make sure the NeuroSAN server is running: python server.py")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        test_stock_evaluation(sys.argv[1])
    else:
        test_stock_evaluation("AAPL")