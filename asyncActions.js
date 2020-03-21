const { createStore } = require("redux");

const initialState = {
  loading: false,
  users: [],
  error: ""
};

const constants = {
  FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
  FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE"
};

export const actions = {
  fetchUsersRequest: () => ({ type: constants.FETCH_USERS_REQUEST }),
  fetchUsersSuccess: payload => ({
    type: constants.FETCH_USERS_SUCCESS,
    payload
  }),
  fetchUsersFailure: payload => ({
    type: constants.FETCH_USERS_SUCCESS,
    payload
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_USERS_REQUEST: {
      return { ...state, loading: true };
    }

    case constants.FETCH_USERS_SUCCESS: {
      return { ...state, users: action.payload };
    }

    case constants.FETCH_USERS_ERROR: {
      return { ...state, error: action.payload };
    }
  }
};

const store = createStore(reducer);
