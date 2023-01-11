import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, FormControl, TextField } from "@mui/material";
import styled, { keyframes } from "styled-components";

const tocheSocial = keyframes` 
{
  0%{
  transform: rotate3d(1, 1, 0, 0deg);
}
50% {
  transform: rotate3d(1, 1, 0, -180deg);
}
100% {
  transform: rotate3d(1, 1, 0, -360deg);
}
}
`;

const errorShake = keyframes`
   0% {
    transform: translateX(48px);
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    transform: translateX(26px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: translateX(13px);
    animation-timing-function: ease-in;
  }
  82% {
    transform: translateX(6.5px);
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateX(4px);
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87%,
  98% {
    transform: translateX(0px);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateX(0px);
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
`;

interface FieldProps {
  isError?: boolean;
}
export const StyledFieldBox = styled(Box)<FieldProps>`
  display: flex;
  align-items: ${(props: FieldProps) =>
    props.isError ? "flex-end" : "center"};
`;

export const StyledFormControl = styled(FormControl)<{ $isError: boolean }>`
  & > p {
    animation: ${(props) => props.$isError && errorShake} 0.3s both;
  }
`;

export const StyledTextField = styled(TextField)<{ $isError: boolean }>`
  & > p {
    animation: ${(props) => props.$isError && errorShake} 0.3s both;
  }
`;

export const StyledGitHubIcon = styled(GitHubIcon)`
  &:hover {
    animation: ${tocheSocial} 0.5s linear both;
  }
`;

export const StyledInstagramIcon = styled(InstagramIcon)`
  &:hover {
    animation: ${tocheSocial} 0.5s linear both;
  }
`;
