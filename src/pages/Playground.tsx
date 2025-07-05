import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Chat from '../components/Chat';

const Playground: React.FC = () => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    bgcolor: 'background.default',
  }}>
    <Container maxWidth="xl" sx={{ py: 3, flex: 1 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          mb: 3,
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        Instant Token & Price Estimator
      </Typography>
      <Chat />
    </Container>
  </Box>
);

export default Playground;
