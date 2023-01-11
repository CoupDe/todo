import endpoints from "../../const/endpoints";
import { authConvertData } from "../../services/parseData/authUserConverter";
import {
  IAuthRequest,
  IUser,
  IUserAuth,
  UserFetchData,
} from "../../typeinterfaces/types";
import { authApi } from "../api/authApi";
import { authUserToken } from "./authSlice";
//Добавление отдельный конечных точек
export const authApiSlice = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "list/",
        credentials: "omit",
      }),
    }),

    signIn: builder.mutation<IUserAuth, IAuthRequest>({
      query: (data: IAuthRequest) => {
        return {
          url: endpoints.AUTHPATH.TOKEN,
          method: "POST",
          body: data,
          credentials: "omit", //Не понятно почему не пропускает заголовком include
        };
      },

      transformResponse: (response: UserFetchData): IUserAuth => {
        //Typescript КОСТЫЛЬ - UserFetchData - по сути тип объединения IUserToken & IUserTokenName
        //можно ли трансформировать интерфейс на основе 2х других с вложением,
        //?Почему есди из Бэкэнда не передать поле username возникает ошибка, предположительно в этом месте
        //?Почему в интерфейсы установлены обязательные поля с типом string но может передаться из бэкэнда undefined
        //Неправильная конструкция
        try {
          authConvertData(response);
        } catch (err) {
          console.log("Ошибка в преобразовании данных", { err });
        }
        const myResponse: IUserAuth = authConvertData(response);

        return myResponse;
      },
      //Данная функция представляет возможность доп. функционала до запроса и после запроса
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; //response

          if (data.token) {
            dispatch(authUserToken(data));
          }
        } catch (err) {
          console.log("e", err);
        }
      },
    }),
    refreshToken: builder.mutation<string, string>({
      query: (data: string) => {
        return {
          url: endpoints.AUTHPATH.REFRESH,
          method: "POST",
          body: data,
          // credentials: "omit", //Не понятно почему не пропускает заголовком include
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useSignInMutation, useRefreshTokenMutation } =
  authApiSlice;
