import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    h1:{
      fontSize: "2em",
      color: "#d4d4d4ff"
    },

    h2:{
        fontSize:"4em",
        fontFamily:"Oswald",
        fontWeight: "bold"
    },

    h3:{
        fontSize:"3.5em",
    },

    body1:{
        fontSize:"1.25em",
        color: "#bebebeff"
    },

    body2:{
        fontSize:"1em",
        fontFamily: "Montserrat",
        color: "#8b8b8bff"
    },

    subtitle1:{
        fontSize:"0.5em"
    },

    sidebar1: {
        fontSize:"0.75em",
        color: "#999999ff"
    },

    sidebar2: {
        fontSize:"1em",
        color: "#f0f0f0ff"
    },
    fontFamily: [
      'Roboto Condensed', // Your desired font
    ].join(','),
  },
});
