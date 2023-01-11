import { Box, useTheme } from "@mui/material";
import { FC, useContext, useState } from "react";
import { Transition } from "react-transition-group";
import { ColorModeContext } from "../App";
import IconStep from "./animation/animationColorThemeButton";

import "./testBtnCss.css";

//Анимация заката
// const MySunset = styled(Sunset)`
//   width: 35px;
//   fill: inherit;
//   color: inherit;

//   animation: ${(props: ITransitionProps) =>
//       props.step === "entering" && sunRiseEnter}
//     0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
//   /* cursor: pointer; */
// `;

interface IColorButtonProps {
  // children: React.ReactNode;
}
const ColorThemeButton: FC<IColorButtonProps> = () => {
  const changeColorMode = useContext(ColorModeContext);

  const [switchColorMode, setSwitchColorMode] = useState<Boolean>(false);
  const [hoverTransition, setHoverTransition] = useState<Boolean>(false);

  const theme = useTheme();


  function handleHoverTransitionOver(
    event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ): void {
    setHoverTransition((prev) => true);
  }
  function handleHoverTransitionOut(
    event: React.MouseEvent<HTMLOrSVGElement, MouseEvent>
  ): void {
    setHoverTransition((prev) => false);
  }

  function switchMode() {
    setSwitchColorMode((prev) => !switchColorMode);

    changeColorMode();
  }

  return (
    <Box
      sx={{
        width: "20px",
        height: "20px",
        position: "absolute",
        cursor: "pointer",
        bottom: "30px",
        right: "30px",
      }}
      onMouseEnter={(event) => handleHoverTransitionOver(event)}
      onMouseLeave={(event) => handleHoverTransitionOut(event)}
      onClick={switchMode}
    >
      <Transition
        key={theme.palette.mode}
        addEndListener={(node: HTMLElement, done: () => void) =>
          node.addEventListener("transitionend", done, false)
        }
        in={!!hoverTransition}
        timeout={300}
        appear
      >
        {(state) => <IconStep themeMode={theme.palette.mode} state={state} />}
      </Transition>
    </Box>
  );
};

export default ColorThemeButton;
