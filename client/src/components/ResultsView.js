import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ResultsView = () => {
  return (
    <>

      <Typography variant="h4" gutterBottom>Results & Insights</Typography>
      <Typography variant="body1" gutterBottom>See detailed trend breakdowns and agent explanations here.</Typography>
      <Card sx={{ maxWidth: 500, mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Sample Results Card</Typography>
          <Typography variant="body2" color="text.secondary">
            Results and explanations will be rendered here.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ResultsView;
