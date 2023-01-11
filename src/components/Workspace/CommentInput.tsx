import { Box, Fab, Stack, TextField, Typography } from "@mui/material";

import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import TextDecreaseIcon from "@mui/icons-material/TextDecrease";
import TextIncreaseIcon from "@mui/icons-material/TextIncrease";
import { Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hook/hook";
import { useAddCommentMutation } from "../../redux/slices/taskApiSlice";
import {
  commentScheme,
  TCommentInput
} from "../../validation/commentTaskValidation";
const initialValueInput: TCommentInput = { comment: "" };

const CommentInput = () => {
  const [showInput, setShowInput] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);
  const [useprops, setUseProps] = useState(false);
  const [addComment] = useAddCommentMutation();
  const { taskId } = useParams();
  const { userId } = useAppSelector((state) => state.authSlice.userinfo);

  const handlerShowInput = () => {
    setShowInput((prev) => !prev);
    setUseProps(false);
  };

  return (
    <>
      <AnimatePresence>
        {showInput ? (
          <Box
            component={motion.div}
            initial={{ opacity: 1, width: 0, marginTop: "0px" }}
            animate={{
              opacity: 1,

              width: "100%",
            }}
            transition={{
              duration: 0.3,
            }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setUseProps(true)}
          >
            <Formik
              initialValues={initialValueInput}
              validationSchema={commentScheme}
              onSubmit={(values, actions) => {
                addComment({
                  comment_task: +taskId!,
                  description: values.comment,
                  comment_creator: +userId,
                });

                actions.setSubmitting(false);
              }}
            >
              {/* () =>
                    props.touched.comment &&
                    props.errors.comment &&
                    setShowSendButton(true) */}
              {(props) => (
                <form
                  id="commentForm"
                  onChange={() => {
                    props.values.comment && props.isValid
                      ? setShowSendButton((prev) => true)
                      : setShowSendButton((prev) => false);
                  }}
                  onSubmit={props.handleSubmit}
                >
                  <TextField
                    id="comment"
                    label="Добавить комментарий"
                    name="comment"
                    multiline={useprops === true}
                    variant="filled"
                    minRows={1}
                    maxRows={3}
                    fullWidth
                    onBlur={props.handleBlur}
                    value={props.values.comment}
                    onChange={props.handleChange}
                    inputProps={{ style: { fontSize: "1rem" } }}
                    helperText={props.dirty && props.errors.comment}
                  />
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          <Box></Box>
        )}
      </AnimatePresence>

      <Stack
        sx={{
          justifyContent: "flex-end",
          display: "flex",
          ml: 1,
          my: 1,
          alignItems: "center",
        }}
        spacing={2}
        direction="row"
      >
        {showInput && showSendButton && (
          <Fab size="small" form="commentForm" type="submit" variant="circular">
            <ForwardToInboxIcon fontSize="small" />
          </Fab>
        )}
        <Fab
          sx={{ height: 40 }}
          color="default"
          variant="extended"
          onClick={handlerShowInput}
        >
          {!showInput ? (
            <TextIncreaseIcon sx={{ mr: 1 }} />
          ) : (
            <TextDecreaseIcon sx={{ mr: 1 }} />
          )}
          <Typography variant="body2" sx={{ mt: "3px" }}>
            Комментарий
          </Typography>
        </Fab>
      </Stack>
    </>
  );
};

export default CommentInput;
