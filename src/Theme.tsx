import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontSize: 14,
    h1:{
      fontSize: "4em"
    },
    h2:{
        fontSize:"3em"
    },
    h3:{
        fontSize:"2em"
    },
    body1:{
        fontSize:"1.5em"
    },
    body2:{
        fontSize:"1em"
    },
    subtitle1:{
        fontSize:"0.5em"
    },
    fontFamily: [
      'Roboto Condensed', // Your desired font
    ].join(','),
  },
});
