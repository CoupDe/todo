import React, { useState } from "react";
import {
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
  Box,
  TextField,
  Stack,
  ToggleButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { newTaskSchema, TNewTask } from "../../validation/newTaskValidation";
import { useAppSelector } from "../../hook/hook";

const initialValueInput: TNewTask = {
  short_description: "",
  creator: "",
  description: "",
  importance_task: "",
};

const NewTask = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const creator = useAppSelector((state) => state.authSlice.userinfo);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  initialValueInput.creator = creator.first_name;

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
        <Formik
          initialValues={initialValueInput}
          validationSchema={newTaskSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {(formik) => (
            <Box
              component={"form"}
              id="taskForm"
              onSubmit={formik.handleSubmit}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ justifyContent: "center", ml: 3 }}
                  id="short_description"
                  name="short_description"
                  placeholder="Краткое описание"
                  variant="standard"
                  autoFocus
                  required
                  value={formik.values.short_description}
                  onChange={formik.handleChange}
                  InputProps={{
                    style: { fontSize: "0.5em" },
                    disableUnderline: true,
                  }}
                />
                <div>WARRNING :{formik.errors.short_description}</div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    mr: 3,
                  }}
                >
                  <Typography
                    align="center"
                    variant="subtitle1"
                    sx={{ display: "inline" }}
                    id="scroll-dialog-title"
                  >
                    Data
                  </Typography>
                  <Typography
                    align="center"
                    variant="subtitle1"
                    sx={{ display: "inline" }}
                    id="scroll-dialog-title"
                  >
                    {creator.first_name}
                  </Typography>
                </Box>
              </Box>
              <DialogContent dividers={true} sx={{ overflowX: "hidden" }}>
                <TextField
                  id="description"
                  name="description"
                  label="Описание задачи"
                  multiline
                  minRows={3}
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  sx={{
                    height: "100%",
                    " .MuiOutlinedInput-root": {
                      height: "100%",
                      alignItems: "flex-start",
                    },
                    " .MuiOutlinedInput-input": { fontSize: "1.2rem" },
                  }}
                />
                <Stack>
                  <ToggleButtonGroup
                    value={"aaa"}
                    exclusive
                    onChange={() => console.log("Importance")}
                    aria-label="importance_task"
                  ></ToggleButtonGroup>
                </Stack>
              </DialogContent>
              <DialogActions
                sx={{ flexDirection: "column", alignItems: "flex-end" }}
              >
                <Box>
                  <Button onClick={() => navigate(-1)}>Cancel</Button>
                  <Button
                    type="submit"
                    onClick={() => console.log(formik.values)}
                  >
                    Submit
                  </Button>
                </Box>
                {/* <Button onClick={handleClose}>Subscribe</Button> */}
              </DialogActions>
            </Box>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default NewTask;
