import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    h1:{
      fontSize: "4em"
    },
    h2:{
        fontSize:"3em"
    },
    body1:{
        fontSize:"1.5em"
    },
    body2:{
        fontSize:"1em"
    },
    fontFamily: [
      'Roboto Condensed', // Your desired font
    ].join(','),
  },
});
