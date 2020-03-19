import React, {useState,useEffect} from 'react'
import { Button,Col,Row, ListGroup,ListGroupItem} from 'reactstrap'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {removeTrash ,getTrashDocument,retriveTrash,emptySelectedTrash,retriveSelectedTrash} from '../../api'
import { Checkbox } from "antd";

function Trash() {
  const initialState = {}
  const [state, setstate] = useState(initialState)
  //css...........................
  const headerStyle = {
    backgroundColor:"#5DADE2",
    marginBottom:'7px',
    padding:'10px',
    fontSize:'22px',
    color:'whitesmoke',

  }
  const containerBox={
    border:'2px solid transparent',
    margin:'10px 0px',
    borderRadius: '25px',
    height:'100vh',
    overflow:'hidden'
  }
  const btnStyle={
    float:'right',
    border:'0px',
    backgroundColor:'transparent',
    overflow:'hidden',
    padding:'0px',
    marginRight:'10px'
}

const [checked,setChecked] = useState(false);
var Selected = [];
  //Methods...................
  useEffect(() => {
    getTrashDocument().then(async res=>setstate(res));
},[])
  useEffect(() => {
      if(checked){
        state.data.map(item=>{
          Selected.push(item._id);
          return null
        })
        console.log(Selected)
      }
  },[checked])
  const renderTooltipRemove = (props) =>{
    return <Tooltip {...props}>Remove Trash</Tooltip>;
  }
  const renderTooltipBack = (props) =>{
    return <Tooltip {...props}>Put Back Item</Tooltip>;
  }
  //checkbox
  const onChange = async(e)=>{
    console.log(`checked = ${e.target.checked}`,e.target.value);
    if(e.target.checked){
      Selected.push(e.target.value);
      Selected = Selected.filter(data => {
        if(data){
        return data
        }
        return null
      })
    }
    else{
      var index = Selected.indexOf(e.target.value);
      delete Selected[index];
      Selected = Selected.filter(data => {
        if(data){
        return data
        }
        return null;
      })
    }
    console.log(Selected)
  }
  const onChangeall = async(e)=>{
    if(e.target.checked){
      setChecked(true);
      state.data.map(item=>{
        Selected.push(item._id);
        return null
      })
    }
    else{
      setChecked(false);
    }
    console.log(Selected)
  }
  return (
    <div style={containerBox}>
      <div style={headerStyle}><b>Trash</b></div>
      <Row style={{height:"100vh",overflow:'scroll'}}>
            <ListGroup style={{width:'100vw',margin:'10px'}}>
              {state.data && state.data.length>0 && <ListGroupItem>
                <Row>
                  <Col sm={1}>
                    <Checkbox onChange={onChangeall}></Checkbox>
                  </Col>
                  <Col sm={3}>
                      <span style={{float:'left'}}><b>Select All</b></span>
                  </Col>
                  <Col sm={8}>
                    <Button outline color="info" style={{float:'right'}} onClick={()=>{emptySelectedTrash(Selected)}}><i className="fa fa-trash" ><b> Empty Selected Trash</b></i></Button>
                    <Button outline color="danger" style={{float:'right',marginRight:'10px'}} onClick={()=>{retriveSelectedTrash(Selected)}}><i className='fa fa-reply'><b> Retrive Selected Documents</b></i></Button>
                  </Col>
                </Row>
              </ListGroupItem>}
            { state.data && state.data.map((item, index) =>
                <ListGroupItem key={index}>
                  <Row>
                    <Col sm={1}>
                      {checked ? <Checkbox onChange={onChange} value = {item._id} checked={checked}></Checkbox>:''}
                      {checked ? '':<Checkbox onChange={onChange} value = {item._id}></Checkbox>}
                    </Col>
                    <Col sm={5}><span style={{float:'left'}}><b>{item.filename}</b></span></Col>
                    <Col sm={4}><span style={{}}>{item.updatedAt}</span></Col>
                    <Col sm={2}>
                      <OverlayTrigger placement="bottom"
                          delay={{ show: 20, hide: 700 }}
                          overlay={renderTooltipRemove}>
                      <Button style={btnStyle} onClick={()=>{removeTrash(item)}}><i className="fa fa-trash fa-lg" ></i></Button></OverlayTrigger>
                      <OverlayTrigger placement="bottom"
                          delay={{ show: 20, hide: 700 }}
                          overlay={renderTooltipBack}>
                      <Button style={btnStyle}  onClick={()=>{retriveTrash(item)}}><i className='fa fa-reply fa-lg'></i></Button></OverlayTrigger>
                    </Col>
                  </Row>
                </ListGroupItem>
            )}
            </ListGroup>
      </Row>
    </div>
  )
}

export default Trash
