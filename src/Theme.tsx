import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    h1:{
      fontSize: "2em"
    },
    h2:{
        fontSize:"4em",
        color: "#F025F5"  
    },
    h3:{
        fontSize:"3.5em",
        color: "#F025F5"
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
