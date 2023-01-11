import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";
import styled from "styled-components";

export const GridContainer = styled("div")`
  display: grid;
  height: 100vh;
  opacity: 0.7;
  gap: 0.3rem;
  padding: 0.3rem;

  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: 50px auto;
`;

export const AsideContainer = styled(Paper)`
  grid-column: 1;
  grid-row: 1/3;
  /* grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2; */
`;

export const NavContainer = styled(Paper)`
  grid-column: 2/12;
  grid-row: 1;

  /* grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2; */
`;

export const MainContainer = styled(Paper)`
  grid-column: 2/12;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: 200px;
  grid-column-gap: 1em;
  grid-row-gap: 1em; //???
  padding: 12px;
  position: relative;
  /* grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2; */
`;

export const MyFoo = styled(motion.div)`
  background-color: #fff;
`;
