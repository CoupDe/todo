import AvTimerIcon from "@mui/icons-material/AvTimer";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/hook";
import { useAddTaskMutation } from "../../redux/slices/taskApiSlice";
import { Departaments, PriorityTask } from "../../typeinterfaces/types";
import { newTaskSchema, TNewTask } from "../../validation/newTaskValidation";

const initialValueInput: TNewTask = {
  short_description: "",
  task_creator: "",
  description: "",
  importance_task: "",
  departament: "",
};

const NewTask = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [importance, setImportance] = useState<PriorityTask>();
  const [departamentChoice, setDepartamentChoice] = useState("");
  const [addTask] = useAddTaskMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const creator = useAppSelector((state) => state.authSlice.userinfo);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  initialValueInput.task_creator = creator.userId;

  const handleChoiceImportance = (importanceChoice: PriorityTask) => {
    setImportance(importanceChoice);
  };
  const handleChoiceDepartament = (event: SelectChangeEvent<string>) => {
    setDepartamentChoice(event.target.value);
  };
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
            addTask(values);
            console.log(values);
            alert(JSON.stringify(values, null, 2));
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
                <div>WARRNING :{formik.values.departament}</div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mr: 3,
                  }}
                >
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
                <Stack
                  sx={{
                    mt: 2,
                    maxHeight: 48,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <ToggleButtonGroup
                    value={importance}
                    exclusive
                    onChange={(_, val) => {
                      formik.setFieldValue("importance_task", val);
                      handleChoiceImportance(val);
                    }}
                    // onChange={handleChoiceImportance}
                    aria-label="importance_task"
                  >
                    <ToggleButton
                      color="success"
                      value="AA"
                      aria-label="low priority"
                    >
                      <AvTimerIcon />
                    </ToggleButton>
                    <ToggleButton
                      color="warning"
                      name="BB"
                      value="BB"
                      aria-label="mid priority"
                    >
                      <WarningIcon />
                    </ToggleButton>
                    <ToggleButton
                      color="error"
                      name="CC"
                      value="CC"
                      aria-label="hight priority"
                    >
                      <ErrorIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <FormControl
                    required
                    hiddenLabel
                    sx={{
                      minWidth: 200,
                      height: 48,
                    }}
                  >
                    <InputLabel
                      size="small"
                      sx={{ fontSize: 18, pt: 0.5 }}
                      id="demo-simple-select-required-label"
                    >
                      Департамент
                    </InputLabel>
                    <Select
                      id="departament"
                      label={"Департамент*"}
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          fontSize: 18,
                          minHeight: 0,
                        },

                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#fff",
                        },
                        "& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root":
                          { height: 48 },
                        height: 48,
                      }}
                      value={departamentChoice}
                      onChange={(event: SelectChangeEvent<string>) => {
                        formik.setFieldValue("departament", event.target.value);
                        handleChoiceDepartament(event);
                      }}
                    >
                      <MenuItem value={Departaments.Development}>
                        Разработки
                      </MenuItem>
                      <MenuItem value={Departaments.Services}>Сервиса</MenuItem>
                      <MenuItem value={Departaments.Management}>
                        Менеджмента
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                {/* Select */}
              </DialogContent>
              <DialogActions
                sx={{ flexDirection: "column", alignItems: "flex-end" }}
              >
                <Box>
                  <Button onClick={() => navigate(-1)}>Cancel</Button>
                  <Button type="submit">Submit</Button>
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
