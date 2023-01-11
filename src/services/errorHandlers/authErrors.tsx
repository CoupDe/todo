import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {
  IAuthFormError,
  ICustomError,
  IError,
} from "../../typeinterfaces/types";

export function isFetchBaseQueryError(
  authError: unknown
): authError is FetchBaseQueryError {
  return typeof authError === "object" && authError != null;
}

// Все усиличя приложены для того что бы вытащить ошибку из API, по мне поджод очень кривой, но я не нашел другого решения
export const authErrorHandler = (authError: IAuthFormError): IError => {
  let errorDetail: IError = { detail: "", status: "" };

  if (isFetchBaseQueryError(authError)) {
    if (typeof authError.status === "number" && "data" in authError) {
      let tt = authError as unknown as ICustomError; // Утверждение типа

      return (errorDetail = {
        detail: tt.data.detail.join(),
        status: tt.status,
      });
    }
    switch (typeof authError.status === "string") {
      case authError.status === "FETCH_ERROR":
        return (errorDetail = {
          detail: "Ошибка подключения к серверу",
          status: authError.status,
        });
    }
  }

  return errorDetail;

  // if (typeof authError.status === "number") {
  //   if ("data" in authError) {
  //     console.log("adsadsdsa", typeof authError.data);
  //     return (
  //       (errorDetail.detail = authError.data),
  //       (errorDetail.status = authError.status)
  //     );
  //   }
  // }
};
