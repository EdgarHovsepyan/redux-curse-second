import {
  INCREMENT,
  DECREMENT,
  CHANGE_THEME,
  ENABLE_BUTTONS,
  DISABLE_BUTTONS,
} from "./types";

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const chnageTheme = (newTheme) => {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  };
};

export const enableBtn = (newTheme) => {
  return {
    type: ENABLE_BUTTONS,
  };
};

export const disableBtn = (newTheme) => {
  return {
    type: DISABLE_BUTTONS,
  };
};

export const asyncIncrement = () => {
  return function (dispatch) {
    dispatch(disableBtn());
    setTimeout(() => {
      dispatch({ type: INCREMENT });
      dispatch(enableBtn());
    }, 2000);
  };
};
