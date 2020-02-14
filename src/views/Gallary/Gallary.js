import React,{useState} from 'react'
import { Button,Col,Row,InputGroupText, ListGroup,ListGroupItem} from 'reactstrap'
import {GetImages,GetAllItems,GetDocuments,RemoveDocument} from '../../api'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
                               //List Of Items Componant
function List(props){
  const renderTooltip = (props) =>{
    return <Tooltip {...props}>Remove Item</Tooltip>;
  }
  const data = props.data
  const date = Date(props.data.createdAt)
  const btnStyle={
      float:'right',
      border:'0px',
      backgroundColor:'transparent',
      overflow:'hidden',
      padding:'0px'
  }
  return(
    <div>{console.log(data,'data console')}
      <ListGroupItem>
        <Row>
          <Col sm={5}><span style={{float:'left'}}><b>{data.filename}</b></span></Col>
          <Col sm={5}><span style={{}}>{data.createdAt}</span></Col>
          <Col sm={2}>
          <OverlayTrigger placement="bottom"
              delay={{ show: 20, hide: 700 }}
              overlay={renderTooltip}>
          <Button style={btnStyle} onClick={()=>{RemoveDocument(data)}}><i className="fa fa-trash fa-lg" ></i></Button></OverlayTrigger></Col>
        </Row>
      </ListGroupItem>
    </div>
  )
}
function Gallary() {
                                          //Style OF htmal atributtes
  var buttonTextStyle={
    backgroundColor:'transparent',
    border:'0px',
    display:'block',
  }
  var buttonStyle={
    width:'100%',
  }
  const [state,setState] = useState({});

  const onClickImageFolder = async() =>{
        await GetImages().then(res=>{setState(res)})
        console.log(state)
  }

  const onClickAllItemsFolder = async() =>{
    await GetAllItems().then(res=>{setState(res)})
    console.log(state)
  }

  const onClickDocumentFolder = async() =>{
    await GetDocuments().then(res=>{setState(res)})
    console.log(state)
  }

  return (
    <div onLoad={()=>{alert('page is loaded')}}>
    <Row>
        <Col sm={2} style={{borderRight:'2px solid gray', height:'100vh'}} >
          <br/>
                                          {/*All Button*/}
          <Button style={buttonStyle} onClick={onClickAllItemsFolder}>
            <i className="fa fa-folder-open fa-5x"></i>
            <InputGroupText style={buttonTextStyle}><b>All Items</b></InputGroupText>
          </Button>
          <br/><br/>
                                          {/*Iamges Button*/}
          <Button style={buttonStyle} onClick={onClickImageFolder}>
            <i className="fa fa-folder-open fa-5x"></i>
            <InputGroupText style={buttonTextStyle}><b>Images</b></InputGroupText>
          </Button>
          <br/><br/>
                                          {/*Document Button*/}
          <Button style={buttonStyle} onClick={onClickDocumentFolder}>
            <i className="fa fa-folder-open fa-5x"></i>
            <InputGroupText style={buttonTextStyle}><b>Documents</b></InputGroupText>
          </Button>
          <br/><br/>
                                          {/*Movies Button*/}
          <Button style={buttonStyle}>
            <i className="fa fa-folder-open fa-5x"></i>
            <InputGroupText style={buttonTextStyle}><b>Movies</b></InputGroupText>
          </Button>
          <br/><br/>
        </Col>
        <Col sm={10} style={{padding:'30px'}}>
            <ListGroup>
            { state.data && state.data.map((item, index) =>
              <List data={item} key={index}/>
            )}
            </ListGroup>
        </Col>
    </Row>
    </div>
  )
}

export default Gallary
