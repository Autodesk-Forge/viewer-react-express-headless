import { types } from '../actions';

const initialState = {
  properties: []
};

export default function viewer(state = initialState, action) {
  switch(action.type) {
    case types.GET_AGGREGATE_PROPERTIES:
      const { properties } = action;
      return {
        ...state,
        properties,
      }
    default:
      return state;
  }
}
