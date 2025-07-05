import { createTheme, Theme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      gradients: {
        primary: string;
        secondary: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      gradients?: {
        primary?: string;
        secondary?: string;
      };
    };
  }
}

// Groq Console inspired color palette
const groqColors = {
  // Primary colors - Groq orange/red
  primary: {
    main: '#f74e35', // Primary brand color
    light: 'rgba(247, 78, 53, 0.1)', // 10% opacity of main
    dark: '#d93f28', // Slightly darker for hover states
    contrastText: '#ffffff',
  },
  // Secondary colors - Grayscale
  secondary: {
    main: '#4a4a4a', // Secondary text
    light: '#767676', // Lighter text
    dark: '#2d2d2d', // Darker text
    contrastText: '#ffffff',
  },
  // Status colors
  success: {
    main: '#00a854',
    light: '#e6f7ee',
    dark: '#006633',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#faad14',
    light: '#fff7e6',
    dark: '#d48806',
    contrastText: '#000000',
  },
  error: {
    main: '#f5222d',
    light: '#fff1f0',
    dark: '#a8071a',
    contrastText: '#ffffff',
  },
  info: {
    main: '#1890ff',
    light: '#e6f7ff',
    dark: '#0050b3',
    contrastText: '#ffffff',
  },
  // Background colors
  background: {
    default: '#fcfafa', // Off-white background
    paper: '#ffffff',   // White surface
  },
  // Text colors
  text: {
    primary: '#1a1a1a',     // Almost black for primary text
    secondary: '#4a4a4a',   // Dark gray for secondary text
    disabled: '#bfbfbf',    // Light gray for disabled text
  },
  // Divider
  divider: 'rgba(0, 0, 0, 0.08)',
  // Grayscale
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#f0f0f0',
    300: '#e0e0e0',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1a1a1a',
  },
};

// Create a theme instance with mode
const getDesignTokens = (mode: PaletteMode) => {
  const isLight = mode === 'light';
  
  // First create a base theme with just the palette
  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: groqColors.primary.main,
        light: groqColors.primary.light,
        dark: groqColors.primary.dark,
        contrastText: groqColors.primary.contrastText,
      },
      secondary: {
        main: groqColors.secondary.main,
        light: groqColors.secondary.light,
        dark: groqColors.secondary.dark,
        contrastText: groqColors.secondary.contrastText,
      },
      background: {
        default: groqColors.background.default,
        paper: groqColors.background.paper,
      },
      text: {
        primary: groqColors.text.primary,
        secondary: groqColors.text.secondary,
        disabled: groqColors.text.disabled,
      },
      divider: 'rgba(118, 118, 118, 0.15)',
    },
  });

  // Then add the rest of the theme configuration
  theme = createTheme(theme, {

    typography: {
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontFamilySecondary: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontFamilyMonospace: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
      // Heading styles
      h1: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        marginBottom: '0.5em',
      },
      h2: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '2rem',
        lineHeight: 1.2,
        letterSpacing: '-0.01em',
        marginBottom: '0.5em',
      },
      h3: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '1.75rem',
        lineHeight: 1.3,
        marginBottom: '0.5em',
      },
      h4: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '1.5rem',
        lineHeight: 1.3,
        marginBottom: '0.5em',
      },
      h5: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        marginBottom: '0.5em',
      },
      h6: {
        fontFamily: '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 100,
        fontSize: '1.125rem',
        lineHeight: 1.4,
        marginBottom: '0.5em',
      },
      // Subtitles
      subtitle1: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.5,
        color: theme.palette.text.secondary,
      },
      subtitle2: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: theme.palette.text.secondary,
      },
      // Body text
      body1: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
        color: theme.palette.text.primary,
      },
      body2: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: theme.palette.text.secondary,
      },
      // Buttons
      button: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 600,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      // Code blocks
      code: {
        fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
        fontSize: '0.9em',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: '0.2em 0.4em',
        borderRadius: 4,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          'html, body': {
            height: '100%',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          '*, *::before, *::after': {
            boxSizing: 'border-box',
          },
          'a': {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          'code': {
            fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
            fontSize: '0.9em',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            padding: '0.2em 0.4em',
            borderRadius: 4,
          },
          'pre': {
            fontFamily: 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            padding: '1em',
            borderRadius: 8,
            overflowX: 'auto',
            lineHeight: 1.5,
            margin: '1.5em 0',
            '& code': {
              backgroundColor: 'transparent',
              padding: 0,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.secondary,  // Changed from text.primary to text.secondary
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 16px',
            fontWeight: 600,
            textTransform: 'none',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.grey[600],
            },
          },
          outlined: {
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
              backgroundColor: 'rgba(247, 78, 53, 0.04)',
            },
          },
          text: {
            '&:hover': {
              backgroundColor: 'rgba(247, 78, 53, 0.04)',
            },
          },
          sizeSmall: {
            padding: '4px 12px',
            fontSize: '0.8125rem',
          },
          sizeLarge: {
            padding: '10px 24px',
            fontSize: '1rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            background: theme.palette.background.paper,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${theme.palette.divider}`,
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '24px 24px 16px',
          },
          title: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: theme.palette.text.primary,
          },
          subheader: {
            color: theme.palette.text.secondary,
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '16px 24px',
            '&:last-child': {
              paddingBottom: '24px',
            },
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: '8px 16px 16px',
            justifyContent: 'flex-end',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
          size: 'small',
        },
        styleOverrides: {
          root: {
            marginBottom: '16px',
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: 1.5,
                borderColor: theme.palette.primary.main,
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: theme.palette.text.secondary,
            '&.Mui-focused': {
              color: theme.palette.primary.main,
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[400],
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderWidth: 1.5,
            },
          },
          input: {
            padding: '10.5px 14px',
          },
          notchedOutline: {
            borderColor: theme.palette.grey[300],
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginTop: 4,
            marginLeft: 0,
            '&.Mui-error': {
              color: theme.palette.error.main,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: theme.palette.grey[800],
            color: theme.palette.common.white,
            fontSize: '0.75rem',
            padding: '6px 12px',
            borderRadius: 4,
          },
          arrow: {
            color: theme.palette.grey[800],
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.divider,
            margin: '16px 0',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          },
          elevation1: {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          },
          elevation2: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
  });

  // Add custom properties to the theme
  return {
    ...theme,
    custom: {
      gradients: {
        primary: 'linear-gradient(90deg, #9C43FF 0%, #6A11CB 100%)',
        secondary: 'linear-gradient(90deg, #1A1A1A 0%, #2D2D2D 100%)',
      },
    },
  };
};

// Create and export the default dark theme
export const theme = createTheme(getDesignTokens('dark'));

export { getDesignTokens };

export default theme;
