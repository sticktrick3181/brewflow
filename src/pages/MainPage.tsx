import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const MainPage: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      p: 4, 
      maxWidth: 1200, 
      mx: 'auto',
      minHeight: 'calc(100vh - 64px - 64px)', // Account for header/footer
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 100,
            color: 'primary.main',
            display: 'inline-block',
            fontSize: '2.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: '0.5em',
          }}
        >
          No-Code WhatsApp Business Chatbot
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary"
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.6,
            color: 'text.secondary'
          }}
        >
          Empowering Enterprises with Seamless Automation and AI-Powered Conversations
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
        gap: 4,
        mt: 4
      }}>
        <Paper 
          sx={{ 
            p: 4, 
            height: '100%',
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          }}
          elevation={0}
        >
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            What is the need?
          </Typography>
          <Typography color="text.primary" sx={{ lineHeight: 1.8 }}>
            In today's fast-paced business environment, instant customer engagement is crucial. Our platform enables enterprises to deploy powerful WhatsApp chatbots without any coding, streamlining support, sales, and notifications.
          </Typography>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 4, 
            height: '100%',
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          }}
          elevation={0}
        >
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Why us?
          </Typography>
          <Typography color="text.primary" sx={{ lineHeight: 1.8 }}>
            We offer a robust, scalable, and secure solution trusted by leading enterprises. Our intuitive interface, enterprise-grade features, and 24/7 support make us the partner of choice for digital transformation.
          </Typography>
        </Paper>
        
        <Paper 
          sx={{ 
            p: 4, 
            height: '100%',
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            }
          }}
          elevation={0}
        >
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
            Pay as you use
          </Typography>
          <Typography color="text.primary" sx={{ lineHeight: 1.8 }}>
            Perfect for developers and startups: scale up as you grow and only pay for the tokens you use. Transparent pricing ensures you maximize value without hidden fees.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MainPage;
