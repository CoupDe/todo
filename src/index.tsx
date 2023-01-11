import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
setupListeners(store.dispatch); //Необходимо установить слушатель для реализации refetch при реконнекте или переключении окна браузера
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
