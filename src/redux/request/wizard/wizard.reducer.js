import { SET_NEXT_STEP } from "./wizard.actionTypes";

const initialState = {
  currentStep: 0,
  nextStep: 0,
  prevStep: 0,
  form: {
    title: "",
    description: "",
    targetPrice: 0,
    quantity: 0,
    deliveryCountry: ""
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_NEXT_STEP: {
      return {
        ...state,
        currentStep: action.payload,
        nextStep: action.payload,
        prevStep: action.payload - 1 <= 0 ? 0 : action.payload - 1
      };
    }
    default:
      return state;
  }
};
