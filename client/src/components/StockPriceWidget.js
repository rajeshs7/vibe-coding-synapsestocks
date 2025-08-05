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
        minHeight: 119, 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        '&:hover': { boxShadow: 4 }
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 2, '&:last-child': { pb: 2 } }}>
        {!symbol ? (
          <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', textAlign: 'center', mt: 2 }}>
            Select a stock to view live price.
          </Typography>
        ) : stockData ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {symbol}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                ${formatNumber(stockData.price)}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isPositive ? 
                  <TrendingUpIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.25 }} /> : 
                  <TrendingDownIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.25 }} />
                }
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: isPositive ? 'success.main' : 'error.main',
                    fontWeight: 600
                  }}
                >
                  {isPositive ? '+' : ''}{formatNumber(stockData.change)} ({isPositive ? '+' : ''}{formatNumber(stockData.changePercent)}%)
                </Typography>
              </Box>
            </Box>

            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              H: ${formatNumber(stockData.high)} | L: ${formatNumber(stockData.low)} | Vol: {formatVolume(stockData.volume)}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
              {lastUpdated ? (
                <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.65rem' }}>
                  Updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
              ) : (
                <Box />
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
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', mt: 2 }}>
            {loading ? 'Loading...' : 'Error loading price data'}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default StockPriceWidget;
