import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import endpoints from "../../const/endpoints";
import { isRefreshToken } from "../../typeinterfaces/typeGuard";
import { logOut, updateToken } from "../slices/authSlice";
import { RootState } from "../store";

//Создание шаблона запроса
const baseQuery = fetchBaseQuery({
  baseUrl: `${endpoints.BASE}`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.token?.access; //Метод getstate() получает доступ к стору,и внедряет в заголовок запроса
    //Если есть токен
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
//Обновление токена доступа
//Создание кастомного запроса
// const refresh = useAppSelector((state) => state.authSlice.token?.refresh);
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const refreshToken = (api.getState() as RootState).authSlice.token?.refresh;

  let result = await baseQuery(args, api, extraOptions);

  //Проверка на окончание действия access токена
  if (result.error && result.error.status === 401) {
    // try to get a new token

    const refreshResult = await baseQuery(
      {
        url: "auth/token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },

      api,
      extraOptions
    );

    if (refreshResult.data) {
      //Доработать!!! Ошибка при доступе с TaskList
      //Неправильная конструкция, нууу по крайней мере некрасивая
      let access: string = "";
      if (isRefreshToken(refreshResult.data)) {
        access = refreshResult.data.access;
      }

      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      //Получить обновленный ACCESS токен
      api.dispatch(updateToken(access));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      // api.dispatch(loggedOut())
    }
  }
  return result;
};
/////////////////////////////////
export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
