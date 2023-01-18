import ENDPOINTS from "../../const/endpoints";
import {
  ICommentRequest,
  ITask,
  ITaskComment,
} from "../../typeinterfaces/types";
import { TNewTask } from "../../validation/newTaskValidation";
import { taskApi } from "../api/taskApi";
import { getTask } from "./viewSlice";
//Надо разобрать с формированием динамического baseUrl т.к. ApiSlice один но пути разные
const baseAPIURL = (endpoint: string) => ENDPOINTS.baseApi + endpoint;

export const taskApiSlice = taskApi.injectEndpoints({
  endpoints: (build) => ({
    //функция возвращающая некоторый объект //название метода  и запрос
    //build.query --> получение build.mutation --> CRUD
    fetchTaskList: build.query<ITask[], void>({
      query: () => ({
        url: baseAPIURL(ENDPOINTS.TODO.TASKLIST),
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // console.log("data in taskApiSlice", data);
          // `onSuccess` side-effect

          dispatch(getTask(data));
        } catch (err) {
          // console.log("err in taskApiSlice", err);
          // `onError` side-effect
          // dispatch(messageCreated("Error fetching post!"));
        }
      },
    }),
    //                Ожидаемый тип
    //                   *        тип параметра
    fetchTask: build.query<ITaskComment, number>({
      query: (id) => baseAPIURL(ENDPOINTS.TODO.TASK) + `${id}`,
      providesTags: ["Comment"],
    }),

    addComment: build.mutation<{ title: string }, ICommentRequest>({
      query(data: ICommentRequest) {
        const { comment_task } = data;
        return {
          url: `${
            baseAPIURL(ENDPOINTS.TODO.TASK) +
            comment_task +
            "/" +
            ENDPOINTS.TODO.COMMENT
          }`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Comment"],
    }),

    addTask: build.mutation<{ newTask: TNewTask }, TNewTask>({
      query(data: TNewTask) {
        console.log("query in rtQ", data);
        return {
          url: `${baseAPIURL(ENDPOINTS.TODO.TASKLIST) + "create/"}`,
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["NewTask"],
    }),
  }),
});

export const {
  useFetchTaskListQuery,
  useFetchTaskQuery,
  usePrefetch,
  useAddCommentMutation,
  useAddTaskMutation,
} = taskApiSlice;
