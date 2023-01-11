import CommentIcon from "@mui/icons-material/Comment";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { useFetchTaskQuery } from "../../redux/slices/taskApiSlice";
import CommentInput from "./CommentInput";
import CommentTask from "./CommentTask";

const parentVariant = {
  visible: {
    opacity: 1,
    y: -20,
    transition: {
      when: "beforeChildren",
      staggerChildren: 1,

      default: { ease: "easeInOut" },
    },
  },
  show: {
    opacity: 0,
    x: 1,
    transition: {
      when: "afterChildren",
    },
  },
};

const TaskModal = () => {
  const [isOpen] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const { taskId } = useParams();

  //  const task = location.state as ITask;
  const { data: task } = useFetchTaskQuery(+taskId!, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  // const task = useAppSelector((state) =>
  //   state.viewTaskSlice.taskList.find((task) => task.id === +taskId!)
  // );
  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  // const handleShowCommentInput = () => {
  //   setCreateComment(!createComment);
  // };
  // const { data, isSuccess } = useFetchTaskQuery(+taskId! ?? skipToken);
  // const { data } = useFetchTaskQuery(+taskId);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        open={isOpen}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {task ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <DialogTitle sx={{ display: "inline" }} id="scroll-dialog-title">
                <em>{task.short_description}</em>
              </DialogTitle>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  mr: 3,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ display: "inline" }}
                  id="scroll-dialog-title"
                >
                  {task.created_at}
                </Typography>
                <Typography
                  align="center"
                  variant="subtitle1"
                  sx={{ display: "inline" }}
                  id="scroll-dialog-title"
                >
                  {task.creator}
                </Typography>
              </Box>
            </Box>
            <DialogContent dividers={true} sx={{ overflowX: "hidden" }}>
              <Typography variant="subtitle2">Описание:</Typography>

              <Typography variant="body1">{task.short_description}</Typography>
              <Divider sx={{ mx: -2 }}>
                <IconButton
                  disableRipple
                  size="small"
                  onClick={handleShowComments}
                >
                  <CommentIcon fontSize="small" />
                </IconButton>
              </Divider>
              {/* Comment Component */}

              {task.comments.length > 0 && (
                <Box
                  sx={{ mt: 2 }}
                  component={motion.div}
                  variants={parentVariant}
                  initial="show"
                  animate="visible"
                >
                  {showComments &&
                    task.comments.map((comment, _i) => (
                      <CommentTask
                        key={comment.id}
                        index={_i}
                        comment={comment}
                        marginProps={_i % 2 > 0 ? { ml: 2 } : { mr: 2 }}
                      />
                    ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions
              sx={{ flexDirection: "column", alignItems: "flex-end" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <CommentInput />
              </Box>
              <Box>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
                <Button onClick={() => navigate(-1)}>Submit</Button>
              </Box>
              {/* <Button onClick={handleClose}>Subscribe</Button> */}
            </DialogActions>
          </>
        ) : (
          <Box
            sx={{
              height: "300px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SyncLoader color="grey" />
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default TaskModal;
