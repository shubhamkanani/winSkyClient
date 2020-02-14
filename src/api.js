import axios from 'axios'
import {getToken} from './Authentications'
const Token = getToken();
export const uploadFormData=(data)=>{
  axios.post("http://localhost:8080/api/upload?token="+getToken(), data, {
       // receive two    parameter endpoint url ,form data
   })
 .then(res => { // then print response status
     console.log(res.statusText)
     alert(res.data.message);
  })
}

export const GetImages=async()=>{
  return await axios.get("http://localhost:8080/api/upload/images?token="+getToken())
  .then(res => {
    //console.log(res.data)
    return res.data;
  })
}

export const GetAllItems=async()=>{
  return await axios.get("http://localhost:8080/api/upload?token="+getToken())
  .then(res => {
    //console.log(res.data)
    return res.data;
  })
}

export const GetDocuments=async()=>{
  return await axios.get("http://localhost:8080/api/upload/documents?token="+getToken())
  .then(res => {
    //console.log(res.data)
    return res.data;
  })
}

export const RemoveDocument=async(data)=>{
  await axios.delete("http://localhost:8080/api/upload/removeitem?_id="+data._id)
  .then(res=>{
    alert(res.data.message);
  })
  .catch(err=>{alert(err)})
}
