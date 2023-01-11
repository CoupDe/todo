import { PaletteMode } from "@mui/material";
import { TransitionStatus } from "react-transition-group/Transition";
import { keyframes } from "styled-components";
import {
  MyMoon,
  MySun2,
  MySunRise,
  StyledSunSet,
  WrapSvg,
} from "./StyledSvgIcon";
interface IComponentAnimationProps {
  themeMode: PaletteMode;
  state: TransitionStatus;
}

//Анимация появления рассвета
const sunRiseEnter = keyframes`
  0% {
    transform: rotateX(0);
    transform-origin: bottom;
    opacity: 1;
  }
  100% {
    transform: rotateX(100deg);
    transform-origin: bottom;
    opacity: 0;
  }`;

const switchLightDark = keyframes`
    0% {
    transform: translateX(0) scaleY(1) scaleX(1);
    transform-origin: 50% 50%;
    filter: blur(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-1000px) scaleX(2) scaleY(0.2);
    transform-origin: 100% 50%;
    filter: blur(40px);
    opacity: 0;
  }
`;

//Анимация выхода рассвета
const sunRiseExit = keyframes`
  0% {
    transform: rotateX(100deg);
    transform-origin: bottom;
    opacity: 0;
    
  }
  100% {
    transform: rotateX(0);
    transform-origin: bottom;
    opacity: 1;
  }`;
//Анимация смены dark/light
const switchMode = keyframes`
    0% {
      transform: translateX(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateX(-100px) rotate(-540deg);
      opacity: 0;
    }
    `;

const moonIn = keyframes`
0% {
    transform: translateY(10px) rotate(90deg);
    filter: blur(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(-15px) rotate(0deg);
    opacity: 1;
  }`;
const moonOut = keyframes`
0% {
    transform: translateY(-15px) rotate(0deg);
   
    opacity: 1;
  }

  100% {
    transform: translateY(0px) rotate(90deg);
    opacity: 0;
  }`;

/* Глупая реализация я так и не придумал способ обойтись более лаконичным кодом без switch-case
 Я видел это, как передачу компонента в обертку*/
function darkThemeComponent({ themeMode, state }: IComponentAnimationProps) {
  switch (state) {
    case "entering":
      return <MySunRise mode={themeMode} step={state} />;
    case "entered":
      return <MySun2 mode={themeMode} step={state} $reverse={false} />;
    case "exiting":
      return <MySun2 mode={themeMode} step={state} $reverse={true} />;
    case "exited":
      return <MySunRise mode={themeMode} step={state} />;
  }
}
function lightThemeComponent({ themeMode, state }: IComponentAnimationProps) {
  switch (state) {
    case "entering":
      return <StyledSunSet mode={themeMode} step={state} />;
    case "entered":
      return <MyMoon mode={themeMode} step={state} />;
    case "exiting":
      return <MyMoon mode={themeMode} step={state} />;
    case "exited":
      return <StyledSunSet mode={themeMode} step={state} />;
  }
}

const IconStep = ({ themeMode, state }: IComponentAnimationProps) => {
  return (
    <>
      <WrapSvg mode={themeMode}>
        {themeMode === "dark"
          ? darkThemeComponent({ themeMode, state })
          : lightThemeComponent({ themeMode, state })}
      </WrapSvg>
    </>
  );
};
export default IconStep;

export {
  sunRiseEnter,
  sunRiseExit,
  switchMode,
  moonIn,
  moonOut,
  switchLightDark,
};
// const sunriseAnimation = (props: ITransitionProps) =>
//   css`
//     animation: ${sunRiseShow};
//     animation-duration: 0.5s;
//     animation-fill-mode: both;
//     animation-direction: ${props.step === "exiting"
//       ? "alternate-reverse"
//       : null};
//   `;
