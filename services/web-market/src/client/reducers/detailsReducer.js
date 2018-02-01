import { FETCH_DETAILS } from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return action.payload.data.data;
    default:
      return state;
  }
};
