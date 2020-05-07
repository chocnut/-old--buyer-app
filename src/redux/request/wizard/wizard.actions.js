import {
  SET_NEXT_STEP,
  SAVE_FORM_DATA,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAIL,
  CLEAR_FORM
} from "./wizard.actionTypes";
import { STORE_USER_REQUESTS } from "../request.actionTypes";

import { createRequest, uploadRequestPhotos } from "../../../services/request";

export const setNextStep = step => dispatch =>
  dispatch({
    type: SET_NEXT_STEP,
    payload: step
  });

export const saveFormData = payload => dispatch =>
  dispatch({
    type: SAVE_FORM_DATA,
    payload
  });

export const submitRequest = ({
  productName,
  description,
  targetPrice,
  quantity,
  countryCode,
  images64
}) => async dispatch => {
  const payload = {
    title: productName,
    description,
    target_price: targetPrice,
    quantity,
    delivery_country: countryCode
  };

  try {
    const result = await createRequest(payload);
    const { data } = result;

    const { id } = data.data;

    images64.forEach(async image => {
      await uploadRequestPhotos({
        requestId: id,
        file: image
      });
    });

    dispatch({ type: CREATE_REQUEST_SUCCESS });
    dispatch({ type: CLEAR_FORM });
    dispatch({ type: STORE_USER_REQUESTS, payload: [data.data] });
  } catch (e) {
    console.log(e);
    dispatch({ type: CREATE_REQUEST_FAIL });
    dispatch({ type: CLEAR_FORM });
  }
};
