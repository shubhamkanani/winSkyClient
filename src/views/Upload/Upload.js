import React, {useState,useCallback,useEffect} from 'react'
import {Card, CardHeader, CardBody, CardFooter, ListGroupItem, ListGroup} from "reactstrap"
import {useDropzone} from "react-dropzone";
import {getToken} from '../../Authentications'
import {uploadFormData} from '../../api'


function Upload() {
  //    style
  const btn = {
    float:'right',
    margin:'10px'
  }
  const [state,setState] = useState({selectedFile:[]});
  const [loding,setLoding] = useState(false)

  // const
  useEffect(() => {
  }, [loding])
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles)
      setState({selectedFile : acceptedFiles})
  },[])
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  const onClickRefresh = event =>{
    setState({selectedFile: '',})
  }
  const onClickHandler = async() => {
    setLoding(true)
    if(state.selectedFile.length<=0){
      setLoding(false)
      return alert('Select any files after click on upload')
    }
    const data = new FormData()
    for(var x = 0; x<state.selectedFile.length; x++) {
       await data.append('file', state.selectedFile[x])
    }
    console.log(data)
    //console.log(getToken());
    if(uploadFormData(data)){
      setLoding(false)
    };
    console.log(loding)
 }
  return (
    <div>
    <br/>
        <Card>
            <CardHeader style ={{fontSize:'20px',backgroundColor:'#63c2de'}}>
                  <b>Upload Files</b>
            </CardHeader>
            <CardBody style={{textAlign:'center'}}>
                <div {...getRootProps()} style={{border:'2px dashed black',maxHeight:'100vw',overflowY: "scroll"}}>
                  {state.selectedFile.length<=0 && <div style={{opacity:'0.3',padding:'25px'}}>
                    <input {...getInputProps()} />
                    <i className="fa fa-folder-open fa-5x"></i>
                    <p>Drag & drop some files here, or click to select files</p>
                  </div>}
                    <ListGroup>
                    {state.selectedFile && state.selectedFile.map((file,index) => {
                        return <ListGroupItem key={index}>
                                  <span style={{float:"left"}}><b style={{ margin:'0px 10px'}}>{index+1}</b>{file.name}</span>
                                </ListGroupItem>
                    }
                    )}
                    </ListGroup>
                </div>
            </CardBody>
            <CardFooter>
                <button type="button" class="btn btn-outline-dark" style={btn} onClick={onClickHandler}>
                  <b><i className="fa fa-upload fa-1x"></i> Upload Files</b>
                </button>
                <button type="button" class="btn btn-outline-danger" style={btn} onClick={onClickRefresh}>
                  <b><i className="fa fa-refresh fa-1x"></i> Refresh Upload</b>
                </button>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Upload
