import { Box, IconButton } from "@mui/material";
import { motion, useAnimation, Variants } from "framer-motion";
import { useState } from "react";
import { MotionPaper, variantsPaper } from "./Task";
import { item } from "./TaskList";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { Link as RouterLink } from "react-router-dom";

const iconVariants: Variants = {
  initial: { scale: 1, color: "grey", x: 0 },
  hoverEffect: {
    color: ["hsl(0, 0%, 50%)", "hsl(0, 5%, 50%)", "hsl(0, 0%, 71%)"],
    scale: [1, 1.1, 1, 0.99, 0.97, 1],
    x: [0, 12, -10, -1, 12, 7, 0],
    transition: {
      type: "spring",
      stiffness: 180,

      duration: 0.4,
    },
  },
  overEffect: {
    scale: 1,
    color: ["hsl(0, 0%, 71%)", "hsl(0, 5%, 50%)", "hsl(0, 0%, 50%)"],
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,

      duration: 0.3,
      mass: 2,
    },
  },
  click: { scale: 0.9 },
};
const TaskAddButton = () => {
  const controls = useAnimation();

  const hoverShowButtonGroup = () => {
    controls.start("hoverEffect");
  };
  const hoverHideButtonGroup = () => {
    controls.start("hoverEffectEnd");
    controls.start("overEffect");
  };

  return (
    <motion.article variants={item}>
      <MotionPaper
        component={motion.div}
        variants={variantsPaper}
        animate={controls}
        onHoverStart={() => hoverShowButtonGroup()}
        onHoverEnd={() => hoverHideButtonGroup()}
        // onPointerMove={(e: React.PointerEvent<HTMLDivElement>) => tiltTask(e)}
        elevation={6}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "190px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RouterLink to={"create/"}>
            <IconButton
              component={motion.button}
              variants={iconVariants}
              initial={"initial"}
              animate={controls}
              whileTap={"click"}
              disableRipple
              aria-label="addTask"
            >
              <AddTaskOutlinedIcon sx={{ width: 100, height: 100 }} />
            </IconButton>
          </RouterLink>
        </Box>
      </MotionPaper>
    </motion.article>
  );
};

export default TaskAddButton;
