const { createStore, combineReducers } = require("redux");

const BUY_CAKE = "BUY_CAKE";
const BUY_ICE_CREAMS = "BUY_ICE_CREAMS";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "Redux Action to Buy Cake"
  };
}

function buyIceCreams() {
  return {
    type: BUY_ICE_CREAMS,
    info: "Redux Action to Buy Ice Cream"
  };
}

const initialStateCake = {
  numberOfCakes: 10
};

const initialStateIceCream = {
  numberOfIceCreams: 20
};

const cakeReducer = (state = initialStateCake, action) => {
  switch (action.type) {
    case BUY_CAKE: {
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1
      };
    }

    default: {
      return state;
    }
  }
};

const iceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case BUY_ICE_CREAMS: {
      return {
        ...state,
        numberOfIceCreams: state.numberOfIceCreams - 1
      };
    }

    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
});

const store = createStore(rootReducer);

console.log("Initial state", store.getState());

const storeUnsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCreams());
store.dispatch(buyIceCreams());

storeUnsubscribe();
