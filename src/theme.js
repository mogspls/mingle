import { createTheme, responsiveFontSizes } from "@mui/material";

// Colors
const brandColor = "#e0e0e0";
const secondary = "#B2DDDD";
const tertiary = "#D84A4C";

let theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: brandColor,
    },
    secondary: {
      main: tertiary,
    },
    tertiary: {
      main: tertiary,
    },
    background: {
      default: brandColor,
      paper: brandColor,
    },
    divider: secondary,
    text: {
      primary:"#547E9C"
    }
  },
  typography: {
    fontFamily: 'Zilla Slab, sans-serif',
    color: "#fff",
    body1: {
      color: secondary,
      fontFamily: 'Zilla Slab, sans-serif',
      fontWeight: "600"
    },
    h1: {
      color: secondary,
      fontWeight: '600',
      lineHeight: 0.78
    },
    h2: {
      color: secondary,
      fontWeight: '400',
      lineHeight: 0.78
    },
    h3: {
      color: "#547E9C",
      fontWeight: '400',
      lineHeight: 0.78
    },
    h4: {
      color: "#fff",
      linheight: 0.78
    },
    h6: {
      color: "#999",
      padding: '21px 0px',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0px'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '0px 4px',
          padding: '7px 21px',
          background: "#e0e0e0",
          color: "#fff",
          fontFamily: 'Poppins',
          fontWeight: '300',
          letterSpacing: '0.1em',
          borderRadius: '0px',
        },
        '&:hover': {
          background: "#C24244"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontSize: "12px"
        }
      }
    }
  }
});

theme = responsiveFontSizes(theme);
export default theme;