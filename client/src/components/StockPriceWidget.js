import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  IconButton
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StockPriceWidget = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Helper to get stock name from symbol
  const getStockName = (symbol) => {
    const stockNames = {
      'AAPL': 'Apple',
      'MSFT': 'Microsoft', 
      'TSLA': 'Tesla',
      'JNJ': 'Johnson & Johnson',
      'PFE': 'Pfizer',
      'XOM': 'Exxon Mobil'
    };
    return stockNames[symbol] || symbol;
  };

  const fetchStockPrice = useCallback(async () => {
    if (!symbol) {
      setStockData(null);
      return;
    }

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
      console.log(`Fetching stock price for ${symbol} from ${API_URL}/api/stock/price`);
      
      const response = await fetch(`${API_URL}/api/stock/price?symbol=${symbol}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Stock price data received:', data);
      setStockData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching stock price:', error);
      setStockData(null);
    } finally {
      setLoading(false);
    }
  }, [symbol]);

  useEffect(() => {
    fetchStockPrice();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchStockPrice, 30000);
    
    return () => clearInterval(interval);
  }, [fetchStockPrice]);

  const formatNumber = (num, decimals = 2) => {
    return num?.toFixed(decimals) || '0.00';
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume?.toString() || '0';
  };

  const isPositive = stockData?.change >= 0;

  return (
    <Card 
      sx={{ 
        bgcolor: '#fff', 
        width: '100%',
        height: 60,
        display: 'flex', 
        alignItems: 'center',
        borderRadius: 2,
        boxShadow: 2,
        '&:hover': { boxShadow: 4 }
      }}
    >
      <CardContent sx={{ 
        width: '100%', 
        p: 2, 
        '&:last-child': { pb: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {!symbol ? (
          <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            Select a stock to view live price
          </Typography>
        ) : stockData ? (
          <>
            {/* Left section - Stock Name, Symbol and Price */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 600, minWidth: 160 }}>
                {getStockName(symbol)} ({symbol})
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, minWidth: 100 }}>
                ${formatNumber(stockData.price)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {isPositive ? 
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} /> : 
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: 20 }} />
                }
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: isPositive ? 'success.main' : 'error.main',
                    fontWeight: 600,
                    minWidth: 120
                  }}
                >
                  {isPositive ? '+' : ''}{formatNumber(stockData.change)} ({isPositive ? '+' : ''}{formatNumber(stockData.changePercent)}%)
                </Typography>
              </Box>
            </Box>

            {/* Center section - High/Low/Volume */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>H:</strong> ${formatNumber(stockData.high)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>L:</strong> ${formatNumber(stockData.low)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>Vol:</strong> {formatVolume(stockData.volume)}
              </Typography>
            </Box>

            {/* Right section - Updated time and refresh */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {lastUpdated && (
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                  Updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
              )}
              <IconButton 
                size="small" 
                onClick={fetchStockPrice} 
                disabled={loading}
                sx={{ p: 0.5 }}
              >
                {loading ? <CircularProgress size={16} /> : <RefreshIcon fontSize="small" />}
              </IconButton>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ color: 'error.main' }}>
            {loading ? 'Loading...' : 'Error loading price data'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StockPriceWidget;
