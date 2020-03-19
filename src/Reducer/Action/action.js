import axios from 'axios'
import {getToken} from '../../Authentications'
export const FETCH_PRODUCTS_BEGIN   = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

const fetchProductsBegin = () =>({
  type: FETCH_PRODUCTS_BEGIN
})
export const fetchProductsSuccess = data =>({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: { data }
});
export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: { error }
});
export const fetchData = () =>{
  return async dispatch => {
    dispatch(fetchProductsBegin())
    //const data = await axios.get("http://localhost:3000/settings/userpermission")
    console.log(process.env.REACT_APP_API_URL,'bash_api')
    axios.get(process.env.REACT_APP_API_URL+"/api/userdetails?token="+getToken())
    .then(res => {
         dispatch(fetchProductsSuccess(res.data));
         return res.data;
      })
      .catch(error => {
        dispatch(fetchProductsFailure(error))
      });
  }
}
