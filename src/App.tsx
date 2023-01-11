import { Container, CssBaseline } from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

import { AnimatePresence } from "framer-motion";
import { createContext } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { BackgroundBox } from "./StyledApp";
import ChangeColorTheme from "./theme/theme";
import ColorThemeButton from "./ui/ColorThemeButton";

export const ColorModeContext = createContext(() => {});
//При создании контекста необходимо указывать тип в т.ч. и функцию

function App() {
  const { theme, colorMode } = ChangeColorTheme();

  return (
    <>
      <ColorModeContext.Provider value={colorMode.changeColorMode}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline>
              <BackgroundBox themecolor={theme.palette.mode}>
                <Container maxWidth={false}>
                  <AnimatePresence mode="wait">
                    <RouterProvider router={router} />
                  </AnimatePresence>
                </Container>
                <ColorThemeButton />
              </BackgroundBox>
            </CssBaseline>
          </MuiThemeProvider>
        </StyledEngineProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
