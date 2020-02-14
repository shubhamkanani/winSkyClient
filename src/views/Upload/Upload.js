import React, {useState} from 'react'
import {Col,Row, Button} from "reactstrap"
import Dropzone from "react-dropzone";
import axios from 'axios'
import {getToken} from '../../Authentications'
import {uploadFormData} from '../../api'
function Upload() {
  const [state,setState] = useState({});

  const onChangeHandler = event =>{
    setState({selectedFile: event.target.files,})
  }
  const onClickHandler = () => {
    const data = new FormData()
    for(var x = 0; x<state.selectedFile.length; x++) {
        data.append('file', state.selectedFile[x])
    }
    console.log(getToken());
    uploadFormData(data);
 }
  return (
    <div>
        <Row>
          <Col span={6}>
            Good Morning
          </Col>
          <Col span={6}>
            <input type="file" class="form-control" multiple onChange={onChangeHandler}/>
            <Button onClick={onClickHandler}><b>Upload</b></Button>
          </Col>
        </Row>
    </div>
  )
}

export default Upload
