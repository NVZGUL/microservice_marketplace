import { IS_AUTH } from '../actions';

export default function reducer(state = {isAuth: false, isVerify: false}, action) {
  switch (action.type) {
    case IS_AUTH:
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}