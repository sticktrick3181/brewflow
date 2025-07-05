import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  Container, 
  Avatar, 
  Divider,
  styled,
  ButtonProps,
  ThemeProvider,
  CssBaseline,
  createTheme
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { getDesignTokens } from './theme';
import { 
  AccountCircle, 
  Code as PlaygroundIcon, 
  AttachMoney as PricingIcon, 
  ExitToApp as LogoutIcon,
  Person as ProfileIcon,
  AccountBalanceWallet as WalletIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import MainPage from './pages/MainPage';
import Playground from './pages/Playground';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';

// Animation
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Groq Theme Colors
const colors = {
  // Primary colors
  purple: {
    500: '#9C43FF',
    600: '#7D36CC',
    700: '#5E2899',
  },
  // Grayscale
  gray: {
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  // Backgrounds
  background: {
    default: '#0A0A0A',
    paper: '#111111',
  },
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#ADB5BD',
  },
};

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.drawer + 1,
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&.scrolled': {
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
}));

// Define the props for our custom NavButton
type NavButtonProps = {
  to: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?: () => void;
};

// Create a custom NavButton that works with React Router
const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(({ 
  to, 
  children, 
  startIcon,
  color = 'inherit',
  onClick,
  ...props 
}, ref) => {
  const navigate = useNavigate();
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return (
    <Button
      ref={ref}
      color={color}
      startIcon={startIcon}
      onClick={handleClick}
      sx={{
        mx: 1,
        px: 2,
        py: 1.5,
        fontWeight: 500,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: (theme) => theme.palette.mode === 'light' 
            ? 'rgba(0, 0, 0, 0.04)' 
            : 'rgba(255, 255, 255, 0.1)',
          transform: 'translateY(-1px)',
          color: (theme) => theme.palette.primary.contrastText,
        },
        '&.active': {
          color: (theme) => theme.palette.primary.contrastText,
          backgroundColor: (theme) => theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.08)',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

// Set display name for better debugging
NavButton.displayName = 'NavButton';

const UserMenu = styled(Menu)(({ theme }) => ({
  '&& .MuiPaper-root': {
    minWidth: 200,
    borderRadius: 8,
    marginTop: 8,
    background: `${theme.palette.background.paper} !important`,
    color: theme.palette.text.primary,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    border: `1px solid ${theme.palette.divider}`,
    '& .MuiMenuItem-root': {
      padding: '10px 16px',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: `${theme.palette.primary.light}20`,
        color: theme.palette.primary.main,
      },
      '&:active': {
        backgroundColor: `${theme.palette.background.paper}CC`,
      },
      '& svg': {
        color: theme.palette.primary.main,
        marginRight: 12,
      },
    },
    '& .MuiDivider-root': {
      borderColor: `${theme.palette.divider}`,
      margin: '4px 0',
    },
  },
}));

interface NavbarProps {
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleTheme, isDarkMode }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Placeholder values for wallet and login
  const walletAmount = 120.50;
  const isLoggedIn = true;
  const userName = 'John Doe';

  return (
    <StyledAppBar 
      position="sticky" 
      elevation={0}
      className={scrolled ? 'scrolled' : ''}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Left-aligned navigation items */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-start' }}>
            <NavButton 
              color="inherit" 
              to="/playground"
              startIcon={<PlaygroundIcon />}
              onClick={() => navigate('/playground')}
            >
              Playground
            </NavButton>
            <NavButton 
              color="inherit" 
              to="/pricing"
              startIcon={<PricingIcon />}
              onClick={() => navigate('/pricing')}
            >
              Pricing
            </NavButton>
          </Box>

          {/* Centered logo */}
          <Box 
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'inherit',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              '&:hover': {
                '& img': {
                  transform: 'scale(1.05)',
                },
                '& .logo-text': {
                  color: 'primary.main',
                  transform: 'translateY(-1px)',
                }
              }
            }}
          >
            <Box 
              component="img"
              src={isDarkMode ? "/logo.png" : "/logo1.png"}
              alt="BrewFlow Logo"
              sx={{ 
                height: 40, // Increased from 32px to 40px
                width: 'auto',
                maxWidth: 180, // Ensure logos don't exceed this width
                objectFit: 'contain',
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.1))',
                transition: 'all 0.3s ease, opacity 0.3s ease',
                opacity: 1,
              }}
            />
            <Typography
              className="logo-text"
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                fontWeight: 700,
                letterSpacing: '0.5px',
                transition: 'all 0.2s ease',
                color: 'inherit',
                mt: 0.5,
              }}
            >
              
            </Typography>
          </Box>

          {/* Right-aligned items */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Theme Toggle Button */}
            <IconButton 
              onClick={onToggleTheme}
              color="inherit" 
              sx={{ 
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
              aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDarkMode ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>

            {/* Wallet and user menu */}
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isLoggedIn && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: 'primary.main',
                borderRadius: 2,
                px: 2,
                py: 0.8,
                mr: 2,
                color: 'white',
                boxShadow: '0 2px 8px rgba(247, 78, 53, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(247, 78, 53, 0.4)'
                }
              }}>
                <WalletIcon fontSize="small" sx={{ mr: 1, color: 'white' }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                  ${walletAmount.toFixed(2)}
                </Typography>
              </Box>
            )}
            
            <Box 
              onClick={handleMenu}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                bgcolor: 'primary.dark',
                borderRadius: 2,
                px: 2,
                py: 0.8,
                ml: 1,
                color: 'white',
                boxShadow: '0 2px 8px rgba(247, 78, 53, 0.3)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'primary.main',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(247, 78, 53, 0.4)'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  mr: 1,
                  transition: 'all 0.2s ease',
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'white', lineHeight: 1.2 }}>
                  {userName.split(' ')[0]}
                </Typography>
                <Typography variant="caption" sx={{ color: 'white', opacity: 0.9, lineHeight: 1, display: 'block' }}>
                  {isLoggedIn ? 'Free Plan' : 'Sign In'}
                </Typography>
              </Box>
            </Box>

            <UserMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userName.toLowerCase().replace(/\s+/g, '.')}@example.com
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                <ProfileIcon sx={{ mr: 1, fontSize: 20 }} />
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Logout
              </MenuItem>
            </UserMenu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};



const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };
  
  const theme = React.useMemo(
    () => {
      const baseTheme = createTheme({
        ...getDesignTokens(mode),
        transitions: {
          duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              'body': {
                transition: 'background-color 0.5s ease, color 0.5s ease',
              },
              'a, button, .MuiButton-root, .MuiIconButton-root, .MuiListItemButton-root, .MuiCard-root, .MuiPaper-root': {
                transition: 'all 0.5s ease !important',
              }
            }
          }
        }
      });
      
      if (mode === 'dark') {
        return createTheme({
          ...baseTheme,
          palette: {
            ...baseTheme.palette,
            mode: 'dark',
            background: {
              default: '#333333',
              paper: '#3a3a3a',
            },
            primary: {
              main: '#f74e35',
              light: '#ff7f5f',
              dark: '#e63e1a', // Brighter orange for dark mode hover states
              contrastText: '#ffffff',
            },
            text: {
              primary: '#fcfafa',
              secondary: '#e6e4e4',
            },
          },
        });
      }
      
      return baseTheme;
    },
    [mode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
        <Router>
          <Navbar onToggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
          <Box component="main" sx={{ pt: 8, minHeight: '100vh', bgcolor: 'background.default' }}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Box>
          <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.paper', borderTop: '1px solid', borderColor: 'divider', color: 'text.secondary' }}>
            <Container maxWidth="lg">
              <Typography variant="body2" align="center">
                {new Date().getFullYear()} Your Company Name. All rights reserved.
              </Typography>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
  );
};

export default App;
