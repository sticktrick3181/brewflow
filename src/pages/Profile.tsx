import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile: React.FC = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h3" gutterBottom>
      Profile & Wallet
    </Typography>
    <Typography>
      View your wallet balance, transaction history, and manage your profile. (Functionality coming soon.)
    </Typography>
  </Box>
);

export default Profile;
