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
  images64,
  status
}) => async dispatch => {
  const payload = {
    title: productName,
    description,
    target_price: targetPrice,
    quantity,
    delivery_country: countryCode,
    status
  };

  try {
    // const result = await createRequest(payload);
    const result = {
      data: {
        data: {
          attributes: {
            id: 10,
            title: payload.title,
            created_at: new Date(),
            public_id: "1",
            featured_image_url:
              "https://images.unsplash.com/photo-1499708544652-0e4c43899071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
            status: 2
          }
        }
      }
    };
    const { data } = result;

    const { id } = data.data;

    // images64.forEach(async image => {
    // await uploadRequestPhotos({
    //   requestId: id,
    //   file: image
    // });
    // });

    dispatch({ type: STORE_USER_REQUESTS, payload: [data.data] });
    dispatch({ type: CLEAR_FORM });
    dispatch({ type: CREATE_REQUEST_SUCCESS });
  } catch (e) {
    console.log(e);
    dispatch({ type: CREATE_REQUEST_FAIL });
    dispatch({ type: CLEAR_FORM });
  }
};
