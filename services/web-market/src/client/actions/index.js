import axios from 'axios';


export const FETCH_DETAILS = 'fetch_details';
export const fetchDetails = () => async dispatch => {
  const res = await axios.get('http://localhost:3030/details')
  
  dispatch({
    type: FETCH_DETAILS,
    payload: res
  });
};