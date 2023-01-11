import { IStatusProps, IStatusAuthInfo } from "../../typeinterfaces/types";

let authStatus: IStatusAuthInfo = {
  authLogInfo: { status: "default", payloadInfo: "" },
};
export function getStatus({
  isError,
  errorMessage,
  isSuccess,
  isLoading,
  first_name,
}: IStatusProps): IStatusAuthInfo {
  if (isLoading) {
    authStatus.authLogInfo = { status: "loading" as const, payloadInfo: "" };
    return authStatus;
  } else if (isError) {
    authStatus.authLogInfo = {
      status: "error" as const,
      payloadInfo: errorMessage.detail,
    };
    return authStatus;
  } else if (isSuccess) {
    authStatus.authLogInfo = {
      status: "success" as const,
      payloadInfo: first_name,
    };
    return authStatus;
  }

  return (authStatus = { authLogInfo: { status: "default", payloadInfo: "" } });
}
