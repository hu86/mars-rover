import { createMuiTheme } from "@material-ui/core/styles";

const primary = "#9C2E35";

export default createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: "3rem",
        fontFamily: "House On Mars",
      },
    },
  },
});
