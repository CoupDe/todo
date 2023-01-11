export interface IUser {
  user: {
    id: number;
    first_name: string;
    username: string;
    email: string;
  };
  token: { access: string; refresh: string };
}
//************FORM TYPES & INTERFACE*************************************
export interface IAuthFormValuesByToken {
  login_field: string;
  password: string;
}
//***************API AUTH TYPES & INTERFACE***************
export interface IAuthRequest {
  login_field: string;
  password: string;
}
export interface IUserToken {
  access: string;
  refresh: string;
}
export interface IUserInfo {
  userId: string;
  username: string;
  first_name: string;
}

export interface ICommentRequest {
  description: string;
  comment_task: number;
  comment_creator: number;
}
export interface IComment {
  description: string;
  comment_task: string;
  comment_creator: string;
  created_at: string;
  id: string;
}

export interface ITaskComment {
  short_description: string;
  id: number;
  importance_task: string;
  updated_at: Date;
  created_at: string;
  isComplete: boolean;
  creator: string;
  comments: IComment[];
}
// export type UserFetchData = IUserToken & IUserInfo;
export interface UserFetchData extends IUserToken, IUserInfo {}
//***************Расширение сделано с целью
//представления данных в более понятном стиле***************
export interface IUserAuth {
  token: IUserToken | null;
  userinfo: IUserInfo;
  isAuth: boolean;
}

//***************API TASK TYPES & INTERFACE***************
export type PriorityTask = "AA" | "BB" | "CC";
export interface ITask {
  created_at: string;
  short_description: string;
  id: number;
  importance_task: PriorityTask;
  creator: string;
  isComplete: boolean;
  updated_at: string;
  description: string;
}

//***************ERROR TYPES & INTERFACE***************
export interface ICustomError {
  data: { detail: string[] };
  status: number;
}
export interface IError {
  detail: string;
  status?: number | string;
}

export interface IAuthFormError {
  status?: string | number;
  data?: unknown;
  error?: string;
}

export interface IStatusProps {
  isError: boolean;
  errorMessage: IError;
  isSuccess: boolean;
  isLoading: boolean;
  first_name: string;
}

export interface IStatusAuthInfo {
  authLogInfo: {
    status: "error" | "loading" | "success" | "default";
    payloadInfo: string;
  };
}
//***************GAME***************
export interface IGameStep {
  compStep: number[];
  playerStep: number[];
}

export interface IStatusGame {
  winner: number[] | null;
  draw: boolean;
}
//**********filter & sort types***************

export interface IFilteredQuerys {
  filterValues: string[];
}
export interface ISortedQuerys {
  sortedQuery: string;
}
////////////////////Guard Types///////////////

export type TrefreshToken = { access: string };
