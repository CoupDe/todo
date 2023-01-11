import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import SyncLoader from "react-spinners/SyncLoader";
import { RootState } from "../../redux/store";
import { IStatusAuthInfo } from "../../typeinterfaces/types";

// Компонент возвращает JSX со статусом логирования
const StatusAuthBar: React.FC<IStatusAuthInfo> = (): JSX.Element => {
  const { status, payloadInfo } = useSelector(
    (state: RootState) => state.authSlice.authLogInfo
  );
  const theme = useTheme();

  switch (status) {
    case "error":
      return <Typography color={`${status}`}>{payloadInfo}</Typography>;
    case "loading":
      return <SyncLoader loading={true} color={theme.palette.action.active} />;
    case "success":
      return (
        <Typography color="success.main">{`Добро пожаловать, ${payloadInfo}!`}</Typography>
      );
    case "default":
      return <Typography>{` `}</Typography>;
  }
};

export default StatusAuthBar;
