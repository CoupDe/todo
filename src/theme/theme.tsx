import { PaletteMode, useMediaQuery } from "@mui/material";
import { createTheme, Theme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import { Theme as MuiTheme } from "@mui/material/styles";
// Необходимо для использования хука useTheme от MUI
declare module "@emotion/react" {
  export interface Theme extends MuiTheme {}
}

export const colorTheme = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#333333",
          },
          secondary: {
            main: "#ff5500",
          },
          background: {
            paper: "#cec9c9",
            selector: "#bdbaba",
          },
          info: {
            main: "#3388dd",
          },
          text: {
            primary: "#0a0a0a",
          },
          divider: "#737171f8",
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          error: {
            main: "#f18484",
          },

          secondary: {
            main: "#FF7733",
            light: "#fff",
          },
          background: {
            paper: "#5d5c5c",
            selector: "#6c6a6a",
          },
          info: {
            main: "#3388dd",
          },
          text: {
            primary: "#ffffff",

            secondary: "#ffffff",
          },
          divider: "#fff",
        }),
  },
});

const themeComponents = (theme: Theme) => ({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },

    //Переопределение стиля заливки при автокомплите
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: "1.5rem",

          "&:-webkit-autofill": {
            fontSize: "1.5rem",

            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.paper} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "none",
        },
      },
    },
  },
});

export default function ChangeColorTheme() {
  //Определение темы по дефолту операционной системы
  let defaultColorTheme = useMediaQuery("(prefers-color-scheme: light)");
  const [themeColor, setThemeColor] = useState<"light" | "dark">(
    defaultColorTheme ? "light" : "dark"
  );

  const colorMode = useMemo(
    () => ({
      changeColorMode: () => {
        setThemeColor((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  //Это реализовано с целью обновления стилей темы на основе созданной темы
  const paletteTheme = useMemo(
    () => createTheme(colorTheme(themeColor)),
    [themeColor]
  );
  const theme = useMemo(
    () => createTheme(paletteTheme, themeComponents(paletteTheme)),
    [paletteTheme]
  );

  return { theme, colorMode };
}

//Необходимо использовать создание темы
// palette: {
//     mode: "light",
//     primary: {};

//       main: "#333333",
//     },
//     secondary: {
//       main: "#ff5500",
//     },
//     background: {
//       paper: "#b1b1b1",
//     },
//   },
// export const theme = createTheme({
//   palette: {
//     mode,
//     ...(mode=== "dark"?{
//     primary: {
//       main: "#333333",
//     },
//     secondary: {
//       main: "#ff5500",
//     },
//     background: {
//       paper: "#b1b1b1",
//     },
//     info: {
//       main: "#3388dd",
//     },
//     divider: "rgba(115,113,113,0.12)",
//   }:{
//     primary: '#fff',
//     divider: deepOrange[700],
//     background: {
//       default: deepOrange[900],
//       paper: deepOrange[900],
//     },
//     text: {
//       primary: '#fff',
//       secondary: '#fff',
//     },
//   }),
// });

// palette: {
//     type: 'dark',
//     primary: {
//       main: '#333333',
//     },
//     secondary: {
//       main: '#ff5500',
//     },
//     background: {
//       paper: '#b1b1b1',
//     },
//     info: {
//       main: '#3388dd',
//     },
//     divider: 'rgba(115,113,113,0.12)',
//   },
