import * as actions from "./user.actionTypes";

export const storeUser = payload => ({ type: actions.STORE_USER, payload });

export const updateUser = payload => ({ type: actions.UPDATE_USER, payload });
