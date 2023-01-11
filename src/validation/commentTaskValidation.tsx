import { InferType, object, string } from "yup";

export const commentScheme = object({
  comment: string()
    .max(3000, "Должно быть не больше 3000 символов")
    .min(20, "Должно быть не менее 20 символов")
    .required("Поле обязательно к заполнению"),
});
export type TCommentInput = InferType<typeof commentScheme>;
