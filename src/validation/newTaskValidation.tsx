import { InferType, object, string, SchemaOf } from "yup";
import { ITask } from "../typeinterfaces/types";

export const newTaskSchema = object({
  short_description: string()
    .trim()
    .required("Поле является обязательным для заполнения")
    .max(100, "Не более 100 символов"),
  task_creator: string().required(),
  description: string().required("Поле является обязательным для заполнения"),
  importance_task: string().required(),
  departament: string().required(),
});

export type TNewTask = InferType<typeof newTaskSchema>;
