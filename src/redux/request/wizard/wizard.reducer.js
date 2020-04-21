import {
  SET_NEXT_STEP,
  SAVE_FORM_DATA,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAIL,
  CLEAR_FORM
} from "./wizard.actionTypes";

const initialState = {
  currentStep: 0,
  nextStep: 0,
  prevStep: 0,
  form: {
    productName: "",
    description: "",
    targetPrice: 0,
    quantity: 0,
    images: [],
    images64: [],
    countryCode: "",
    country: ""
  },
  status: ""
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
    case SAVE_FORM_DATA: {
      return {
        ...state,
        form: {
          ...state.form,
          ...action.payload
        }
      };
    }
    case CREATE_REQUEST_SUCCESS: {
      return {
        ...state,
        status: "SUCCESS"
      };
    }
    case CREATE_REQUEST_FAIL: {
      return {
        ...state,
        status: "FAIL"
      };
    }
    case CLEAR_FORM: {
      return initialState;
    }
    default:
      return state;
  }
};
