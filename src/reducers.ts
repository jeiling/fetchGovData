import { InitialState } from "./types";

const initialState:InitialState = {
    data: null,
    error: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    console.log('data',state.data)
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return {
          ...state,
          data: {...state.data, ...action.payload},
          error: null,
        };
      case 'FETCH_DATA_FAILURE':
        return {
          ...state,
          data: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  