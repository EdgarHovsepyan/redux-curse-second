import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./redux/rootReducer";
import {
  decrement,
  increment,
  asyncIncrement,
  chnageTheme,
} from "./redux/actions";

import "./styles.css";
import { CHANGE_THEME } from "./redux/types";

const counter = document.querySelector("#counter");
const addBtn = document.querySelector("#add");
const subBtn = document.querySelector("#sub");
const asyncBtn = document.querySelector("#async");
const themeBtn = document.querySelector("#theme");

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, logger),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

addBtn.addEventListener("click", () => {
  store.dispatch(increment());
});

subBtn.addEventListener("click", () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(chnageTheme(newTheme));
});

store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(
    (btn) => (btn.disabled = state.theme.disabled)
  );
});

store.dispatch({ type: "INIT_APPLICATION" });
