import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import NavBar from "../components/Workspace/NavBar";
import TaskList from "../components/Workspace/TaskList";
import { useFetchTaskListQuery } from "../redux/slices/taskApiSlice";

import {
  AsideContainer,
  GridContainer,
  MainContainer,
  NavContainer,
} from "./StyledWorkSpace";
const taskContainerVariant = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
  hidden: {
    opacity: 0,
  },
};
const MotionContainer = motion(MainContainer); //Передача пропсов motion на кастомный компонент
const ToDoLayout = () => {
  const { data: taskList, isSuccess } = useFetchTaskListQuery();

  return (
    <GridContainer>
      <NavContainer forwardedAs="nav" elevation={12}>
        <NavBar />
      </NavContainer>
      <AsideContainer forwardedAs="aside" elevation={12} aria-label="Menu">
        Menu
      </AsideContainer>

      <MotionContainer
        variants={taskContainerVariant}
        initial={"hidden"}
        animate={"visible"}
        // variants={container}
        // animate="show"
        forwardedAs={"main"}
        elevation={12}
      >
        {isSuccess && (
          <>
            <TaskList taskList={taskList} />
            <Pagination
              sx={{
                position: "absolute",
                bottom: 1,
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              count={Math.ceil(taskList.length / 9)}
              variant="outlined"
            />
          </>
        )}
      </MotionContainer>
    </GridContainer>
  );
};

export default ToDoLayout;
