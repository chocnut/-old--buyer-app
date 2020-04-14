import { SET_NEXT_STEP } from "./wizard.actionTypes";

const initialState = {
  currentStep: 0,
  nextStep: 0,
  prevStep: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEXT_STEP: {
      return {
        ...state,
        currentStep: action.payload
      };
    }
    default:
      return state;
  }
};
