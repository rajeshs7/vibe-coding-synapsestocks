import * as React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Positive', value: 55 },
  { name: 'Neutral', value: 25 },
  { name: 'Negative', value: 20 },
];
const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const barData = [
  { name: 'Jan', price: 120 },
  { name: 'Feb', price: 128 },
  { name: 'Mar', price: 133 },
  { name: 'Apr', price: 129 },
  { name: 'May', price: 135 },
];

export default function SampleCharts() {
  return (
    <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
      {/* Pie Chart: Social Sentiment */}
      <Card sx={{ minWidth: 320, flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Social Sentiment</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Bar Chart: Chemical Prices */}
      <Card sx={{ minWidth: 320, flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Chemical Prices (last 5 months)</Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
