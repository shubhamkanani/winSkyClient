import decode from 'jwt-decode';
import axios from 'axios';

export const login = async (emailId,password)=>{
const data = {
              email:emailId,
              password:password,
            }
            console.log(data.email,data.password)
            return await axios.post(
              'http://localhost:8080/auth/signin',
              data
            )
            .then(res=> {
              console.log(res.data.token)
              setToken(res.data.token)
              return Promise.resolve(res.data);
            })

}
export const loggedIn=()=>{
          // Checks if there is a saved token and it's still valid
          const token = getToken() // GEtting token from localstorage
          return !!token && !isTokenExpired(token) // handwaiving here
      }
export const isTokenExpired=(token)=>{
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
export const setToken=(idToken)=>{
          console.log(idToken)
            // Saves user token to localStorage
            localStorage.setItem('id_token', idToken)
      }
export const getToken=()=>{
          // Retrieves the user token from localStorage
          return localStorage.getItem('id_token')
      }
export const logout=()=>{
          // Clear user token and profile data from localStorage
          localStorage.removeItem('id_token');
      }
export const forgot=async (emailId)=>{
  const data = {
    emailId:emailId,
  }
  //console.log(data)
  return await axios.post(
    'http://localhost:8080/auth/forgotpassword',
    data
  )
  .then(res=> {
    //console.log(res.data)
    return Promise.resolve(res.data);
  })
};
export const reset=async (password,token)=>{
  const data = {
    password:password,
  }
  return await axios.post(
    'http://localhost:8080/auth/resetpassword?token='+token,
    data
  )
  .then(res=> {
    //console.log(res.data)
    return Promise.resolve(res.data);
  })
}
// export const fetch=(url, options)=>{
//         // performs api calls sending the required authentication headers
//         const headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }

//         // Setting Authorization header
//         // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
//         if (loggedIn()) {
//             headers['Authorization'] = 'Bearer' + this.getToken()
//         }

//         return fetch(url, {
//             headers,
//             ...options
//         })
//             .then(this._checkStatus)
//             .then(response => response.json())
//     }
