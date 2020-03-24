import axios from 'axios'
import {getToken} from './Authentications'
import FileSaver from 'file-saver'
import download from 'downloadjs'
import fs from 'fs'
import {logout} from './Authentications'

//get total data size

export const getMediaDetails = async() =>{

    return await axios.get(process.env.REACT_APP_API_URL+"/api/upload?token="+getToken())
    .then(async res =>{
      var size=new Number;
      var documentSize=new Number;
      var imageSize=new Number;

      res.data.data.map((item)=>{
         size = parseFloat(size) + parseFloat((item.size/1024)/1024);
         //console.log(parseFloat((item.size/1024)/1024) , 'individual')
        if(item.mimetype.match('application/(docx?|xlsx?|pdf|rar|zip|7z)')){
            documentSize = parseFloat(documentSize) + parseFloat((item.size/1024)/1024)
            //console.log(parseFloat((item.size/1024)/1024),'enter....')
        }
        if(item.mimetype.match('image/(gif|p?jpeg|(x-)?png)')){
            imageSize = parseFloat(imageSize) + parseFloat((item.size/1024)/1024)
            //console.log(parseFloat((item.size/1024)/1024))
      }
      })
      //console.log(size,imageSize, documentSize)
      const totalSizeInfo = {
        size:size.toFixed(2),
        documentSize:documentSize.toFixed(2),
        imageSize:imageSize.toFixed(2)
      }
      return totalSizeInfo
    })
}


export const uploadFormData=(data)=>{
  axios.post(process.env.REACT_APP_API_URL+"/api/upload?token="+getToken(), data, {
       // receive two    parameter endpoint url ,form data
   })
 .then(res => { // then print response status
     //console.log(res.statusText)
     alert(res.data.message);
     return true
  })
}

// get all Images in gallary ( like .jpg, .png and Many more)

export const GetImages=async()=>{
  console.log(process.env.REACT_APP_API_URL)
  return await axios.get(process.env.REACT_APP_API_URL+"/api/upload/images?token="+getToken())
  .then(res => {
    //console.log(res.data)
    return res.data;
  })
}

// get All media(Document) in gallary

export const GetAllItems=async()=>{
  // console.log(size)
  return await axios.get(process.env.REACT_APP_API_URL+"/api/upload?token="+getToken())
  .then(async res => {
    return res.data;
  })
}

// get all Document in gallary ( like .pdf, .ppt and Many more)

export const GetDocuments=async()=>{
  return await axios.get(process.env.REACT_APP_API_URL+"/api/upload/documents?token="+getToken())
  .then(res => {
    //console.log(res.data)
    return res.data;
  })
}

// remove document and put into trash ( only one document at a time )

export const RemoveDocument=async(data)=>{
  await axios.delete(process.env.REACT_APP_API_URL+"/api/upload/removeitem?_id="+data._id)
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

// find All trash document

export const getTrashDocument=async()=>{
  return await axios.get(process.env.REACT_APP_API_URL+"/api/upload/trash?token="+getToken())
  .then(res => {
    console.log(res.data, 'from trash document')
    return res.data;
  })
}

// remove document from trash ( only one document at a time )

export const removeTrash = async(data)=>{
  return await axios.delete(process.env.REACT_APP_API_URL+"/api/upload/trash?_id="+data._id)
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

// retrive document from trash ( only one document retrive at a time )

export const retriveTrash = async(data)=>{
  return await axios.post(process.env.REACT_APP_API_URL+"/api/upload/trash?_id="+data._id)
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

// remove all selected trash ( empty trash at one click)

export const emptySelectedTrash = async(data)=>{
  console.log(data);
  return await axios.delete(process.env.REACT_APP_API_URL+"/api/upload/selectedtrash?token="+getToken(),{data:data})
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

// retrive all selected trash ( retrive all trash in one click)

export const retriveSelectedTrash = async(data)=>{
  console.log(data);
  return await axios.post(process.env.REACT_APP_API_URL+"/api/upload/selectedtrash?token="+getToken(),data)
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

// remove all selected document and put into trash ( remove all document in one click )

export const removeSelectedDocument = async(data)=> {
  console.log(data);
  return await axios.post(process.env.REACT_APP_API_URL+"/api/upload/selected?token="+getToken(),data)
  .then(res=>{
    alert(res.data.message);
    window.location.reload(false);
  })
  .catch(err=>{alert(err)})
}

//download selected documents

export const downloadSelectedDocument = async(alldata)=>{
  console.log(alldata);
  alldata.map(async item =>{
   const data = {
      _id:item
    }
    return await axios.post(process.env.REACT_APP_API_URL+"/api/upload/download?token="+getToken(),data)
    .then(res =>{
        console.log(res)
        FileSaver(process.env.REACT_APP_API_URL+'/uploads/'+res.data.emailId+'/'+res.data.filename,res.data.filename)
        window.open(res.data.filename);
  })
})
}


// only for backup

export const allDataBackUp = async(emailId) => {
  if(emailId){
      const data ={
        emailId:emailId
      }
      return await axios.post(process.env.REACT_APP_API_URL+'/api/backup/allbackup?token='+getToken(),data)
      .then(res=>{
        alert(res.data.message)
        return true
      })
  }
  else{
    return await axios.get(process.env.REACT_APP_API_URL+'/api/backup/allbackup?token='+getToken())
    .then(res=>{
      alert(res.data.message)
      return true
    })
    .catch(err=>{alert(err)
      return true
    })
  }
}


//Edit profile

export const uploadImg = async(data) => {
  console.log(data)
  if(data){
      return axios.post(process.env.REACT_APP_API_URL+'/api/userdetails/pimg?token='+getToken(),data)
      .then(res=>{
          if(res.data.success){
              window.location.reload(false);
          }
      })
      .catch(err=>{
        alert(err)
        return null
      })
  }
}

export const uploadData = async(data,props) => {
  //console.log(data.newPassword ,data.oldPassword)
  if(data.newPassword && data.oldPassword){
    axios.post(process.env.REACT_APP_API_URL+'/api/userdetails/updatedata?token='+getToken(),data)
    .then(res=>{
      alert(res.data.message)
        return null
    })
    .catch(err=>{
      alert(err)
      return null
    })
  }
  else{
    console.log(data)
    axios.post(process.env.REACT_APP_API_URL+'/api/userdetails/updatedata?token='+getToken(),data)
    .then(res=>{
      alert(res.data.message)
      if(res.data.success &&  res.data.echange){
        props.history.push('/')
        logout();

      }
      if(res.data.success){
        window.location.reload(false);
      }
        return null
    })
    .catch(err=>{
      alert(err)
      return null
    })
  }
}

// send message to user

export  const  messageSender = async (message) =>{
  console.log('enter.........')
  const data = {
    message:message
  }
     return await axios.post(process.env.REACT_APP_API_URL+'/api/message/send?token='+getToken(),data)
      .then(res=>{
        return res.data
      })
}

//retrieve message

export const retrieveMessage = async () =>{
  return  axios.get(process.env.REACT_APP_API_URL+'/api/message')
    .then(res=>{
      if(res.data.success){
          const emailId=[];var flag=false;
        res.data.data.map((item)=>{
            emailId.map(email =>{
              if(item.emailId===email){
                  flag=true;
              }
            })
          if(!flag){
            emailId.push(item.emailId)
          }
          flag=false;
        })
        const data = {
          emailList:emailId,
          data:res.data.data
        }
        return data
      }
    })
}

// admin send message

export const sendMsgByAdmin = async (data)=>{
  return  axios.post(process.env.REACT_APP_API_URL+'/api/message?',data)
    .then(res=>{
      if(res.data.success){
        const emailId=[];var flag=false;
        res.data.data.map((item)=>{
          emailId.map(email =>{
            if(item.emailId===email){
              flag=true;
            }
          })
          if(!flag){
            emailId.push(item.emailId)
          }
          flag=false;
        })
        const data = {
          emailList:emailId,
          data:res.data.data
        }
        console.log(data)
        return data
      }
    })
}

//user retrive message

export const retrieveMsgByUser = async ()=>{
  return  axios.get(process.env.REACT_APP_API_URL+'/api/message?token='+getToken())
    .then(res=>{
      if(res.data.success){
            //console.log(res.data)
            return res.data.data;
      }
    })
}
