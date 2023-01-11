import { InferType, object, string } from "yup";

const languageRegex = /^[\w@.]+$/;

export const signInSchema = object({
  login_field: string()
    .trim()
    .lowercase()
    .matches(languageRegex, "Только латиница")
    .min(4, "Должно быть не менее четырёх символов")
    .required("Поле является обязательным для заполнения"),
  email: string()
    .email("Должен содержать `@` и домен `.`")
    .matches(languageRegex, "Только латиница")
    .min(5, "Должно быть не меньше пяти символов"),
  password: string()
    .matches(languageRegex, "Только латиница")
    .min(5, "Должно быть не меньше пяти символов")
    .required("Поле является обязательным для заполнения"),
});

export type LoginInput = InferType<typeof signInSchema>;
