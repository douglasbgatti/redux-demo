const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

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

const actions = {
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
      return { ...state, users: action.payload, loading: false };
    }

    case constants.FETCH_USERS_ERROR: {
      return { ...state, error: action.payload };
    }
  }
};

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(actions.fetchUsersRequest());

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        const users = response.data;
        dispatch(actions.fetchUsersSuccess(users));
      })
      .catch(error => {
        dispatch(actions.fetchUsersFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
