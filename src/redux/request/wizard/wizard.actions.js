import { SET_NEXT_STEP } from "./wizard.actionTypes";

export const setNextStep = step => dispatch =>
  dispatch({
    type: SET_NEXT_STEP,
    payload: step
  });
