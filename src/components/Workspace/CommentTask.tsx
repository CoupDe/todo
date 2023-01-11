import { DialogContentText, Divider, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { IComment } from "../../typeinterfaces/types";
interface ICommentProps {
  comment: IComment;
  index: number;
  marginProps: object;
}
const commentVariants = {
  show: (index: number) => ({
    x: index % 2 > 0 ? -150 : 150,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  }),
  visible: (index: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: 100 },
      delay: index * 0.07,
    },
  }),
};

const CommentTask: React.FC<ICommentProps> = ({
  comment,
  index,
  marginProps,
}) => {
  const selectorComment = index % 2 > 0 ? true : false;

  return (
    <>
      <Paper
        component={motion.article}
        variants={commentVariants}
        custom={index}
        sx={{
          ...marginProps,
          borderRadius: "12px",
          p: "2px",
          my: 1,
          backgroundColor: selectorComment
            ? "background.paper"
            : "background.selector",
          border: "3px solid grey",
          overflowWrap: "break-word",
        }}
      >
        <Typography
          variant="subtitle2"
          align={selectorComment ? "right" : "left"}
          mr={1}
        >
          <em>
            {comment.comment_creator} | {comment.created_at}
          </em>
        </Typography>

        <Divider />

        <DialogContentText variant="body1" id="scroll-dialog-description">
          {"\u00A0" + comment.description}
        </DialogContentText>
      </Paper>
    </>
  );
};

export default CommentTask;
