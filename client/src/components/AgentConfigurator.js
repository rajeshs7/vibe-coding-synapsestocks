import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const AgentConfigurator = () => {
  return (
    <>

      <Typography variant="h4" gutterBottom>Agent Configurator</Typography>
      <Typography variant="body1" gutterBottom>Add or edit agents and select data sources here.</Typography>
      <Card sx={{ maxWidth: 500, mt: 4 }}>
        <CardContent>
          <Typography variant="h6">Sample Agent Config UI</Typography>
          <Typography variant="body2" color="text.secondary">
            Agent configuration UI will go here.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AgentConfigurator;
/// esl 