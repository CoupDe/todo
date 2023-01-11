import Moon from "@mui/icons-material/Brightness3";
import { Sun, Sunrise, Sunset } from "@styled-icons/feather";
import { TransitionStatus } from "react-transition-group/Transition";
import styled, { css, keyframes } from "styled-components";
import {
  moonIn,
  moonOut,
  sunRiseEnter,
  sunRiseExit,
} from "./animationColorThemeButton";

interface ITransitionProps {
  readonly step?: TransitionStatus;
  readonly mode: string;
  readonly $reverse?: boolean;
}

const switchLightDark = keyframes`
  0% {
  transform: translateX(0) scaleY(1) scaleX(1);
  
  filter: blur(0);
  opacity: 1;
}
100% {
  transform: translateX(-30px) scaleX(2) scaleY(0.2);
  
  filter: blur(10px);
  opacity: 0;
}
`;
const darkLightSwitch = () =>
  css`
    ${switchLightDark} 0.2s cubic-bezier(0.755, 0.050, 0.855, 0.060)  both;
  `;
//Анимация появления солнца
const sunBlurEnter = keyframes`
0% {
    transform: translateY(10px) rotate(720deg);
    filter: blur(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(-15px) rotate(0deg);
    opacity: 1;
  }`;
//Анимация выхода солнца
const sunBlurExit = keyframes`
  0% {
    transform: translateY(-15px) rotate(0deg);
    opacity: 1;
      
    }
    50% {
    transform: translateY(-15px) rotate(0deg);
    opacity: 1;
      
    }
    100% {
      transform: translateY(-15px) rotate(7200deg);
    filter: blur(20px);
    opacity: 0;
    }`;

const sunBlur = (props: boolean) =>
  css`
    ${props
      ? sunBlurEnter
      : sunBlurExit} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards
  `;
const WrapSvg = styled.div<ITransitionProps>`
  color: ${(props) => (props.mode === "dark" ? "#ffb703" : "#161617")};
  & > * {
    width: 30px;
    fill: ${(props) => (props.mode === "dark" ? "#ffb703" : "#161617")};
  }
`;

const MySun = styled(Sun)<ITransitionProps>`
  animation: ${(props) =>
      props.step === "entered" ? sunBlurEnter : sunBlurExit}
    0.3s cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
`;
// animation: ${darkLightSwitch};

const MySun2 = styled(Sun)<ITransitionProps>`
  animation: ${(props) => (props.$reverse ? sunBlur(false) : sunBlur(true))};
`;
/* (props) => props.step === "entered" && sunBlur */
const MySunRise = styled(Sunrise)<ITransitionProps>`
  animation: ${(props) =>
      props.step === "entering" ? sunRiseEnter : sunRiseExit}
    0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
`;

const MyMoon = styled(Moon)<ITransitionProps>`
  animation: ${(props) => (props.step === "entered" ? moonIn : moonOut)} 0.3s
    cubic-bezier(0.39, 0.575, 0.565, 1) forwards;
`;
const StyledSunSet = styled(Sunset)<ITransitionProps>`
  animation: ${(props) =>
      props.step === "entering" ? sunRiseEnter : sunRiseExit}
    0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const MySunRise2 = styled(Sunrise)<ITransitionProps>`
  animation: ${darkLightSwitch};
`;
export { MySun, MySunRise, WrapSvg, MyMoon, StyledSunSet, MySunRise2, MySun2 };
//Анимация заката
