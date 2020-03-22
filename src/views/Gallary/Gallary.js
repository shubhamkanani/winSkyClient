import React,{useState,useEffect} from 'react'
import { Button,Col,Row,InputGroupText, ListGroup,ListGroupItem,DropdownItem, ButtonGroup,DropdownToggle,DropdownMenu, ButtonDropdown} from 'reactstrap'
import {GetImages,GetAllItems,GetDocuments,RemoveDocument,removeSelectedDocument,downloadSelectedDocument} from '../../api'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {Checkbox} from 'antd'
                               //List Of Items Componant

//main functional compnant

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
  const btnStyle={
    float:'right',
    border:'0px',
    backgroundColor:'transparent',
    overflow:'hidden',
    padding:'0px'
}
                                           //State
  var loop = [];
  const [state,setState] = useState({});
  const [checked,setChecked] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const [size,setSize] = useState({pre:0,all:10,increment:10});
  var Selected = [];
  //Methods
  const toggle = () => setOpen(!dropdownOpen);

                                //tooltip
  const renderTooltip = (props) =>{
    return <Tooltip {...props}>Remove Item</Tooltip>;
  }
//render Method

  useEffect(() => {
    if(checked){
      state.data.map(item=>{
        Selected.push(item._id);
        return null
      })
    }
  }, [checked])

//images
  const onClickImageFolder = async() =>{
        await GetImages().then(res=>{setState(res)})

  }
//all items
  const onClickAllItemsFolder = async() =>{
    await GetAllItems().then(res=>{setState(res)})
    // console.log(state)
    // console.log(state.allPage)
    if(state.data){
      console.log(state.data.length);
      for(let i=0;i<=Math.floor(state.data.length/size.increment);i++){

        loop.push(i+1);
        console.log(loop)
    }
    }
  }
//documents
  const onClickDocumentFolder = async() =>{
    await GetDocuments().then(res=>{setState(res)})
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
      setChecked(false)
      var index = Selected.indexOf(e.target.value);
      delete Selected[index];
      Selected = Selected.filter(data => {
        if(data){
        return data
        }
        return null
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
  const forwardPage = async() =>{
    setSize({...size,pre:size.pre+size.increment,all:size.all+size.increment})
  }
  const backwardPage = async() =>{
    setSize({...size,pre:size.pre-size.increment,all:size.all-size.increment})
  }
  return (
    <div>
    <Row>
        <Col sm={2} style={{borderRight:'2px solid gray', height:'auto'}} >
          <br />
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
          <br/>
            <ListGroup >
                {state.data && state.data.length>0 && <ListGroupItem>
                    <Row>
                      <Col sm={1}>
                        <Checkbox onChange={onChangeall} checked={checked}></Checkbox>
                      </Col>
                      <Col sm={3}>
                          <span style={{float:'left'}}><b>Select All</b></span>
                      </Col>
                      <Col sm={8}>
                        {state.data && <Button outline color="danger" onClick={()=>removeSelectedDocument(Selected)} style={{float:"right",marginLeft:'15px'}}>
                                            <b>Remove Selected Item</b>
                                            </Button>
                        }
                        {state.data && <Button outline color="success" onClick={()=>downloadSelectedDocument(Selected)} style={{float:"right"}}><b><i className="fa fa-arrow-circle-down"> </i> Download Selected Item</b></Button>}
                      </Col>
                    </Row>
                  </ListGroupItem>}
            { state.data && state.data.map((item, index) =>
              {return index>=size.pre && index<size.all && <ListGroupItem key={index}>
                  <Row>
                    <Col sm={1}>
                        {checked ? <Checkbox onChange={onChange} value = {item._id} checked={checked}></Checkbox>:''}
                        {checked ? '':<Checkbox onChange={onChange} value = {item._id}></Checkbox>}
                    </Col>

                    <Col sm={5} style={{overflow:'scroll'}}><span style={{float:'left'}}><b>{item.filename}</b></span></Col>
                    <Col sm={4}><span>{item.createdAt}</span></Col>
                    <Col sm={2}>
                    <OverlayTrigger placement="bottom"
                        delay={{ show: 20, hide: 700 }}
                        overlay={renderTooltip}>
                    <Button style={btnStyle} onClick={()=>{RemoveDocument(item)}}><i className="fa fa-trash fa-lg" ></i></Button></OverlayTrigger>
                    </Col>
                  </Row>
                </ListGroupItem>}
            )}
            </ListGroup>

            {state.data && state.data.length>0 &&
              <div>
              <ButtonGroup style={{margin:'20px'}}>
                {size.pre===0?<Button disabled><i className="fa fa-backward"></i></Button>:<Button onClick={()=>{setSize({...size,pre:0,all:size.increment})}}><i className="fa fa-backward"></i></Button>}
                {size.pre===0?<Button disabled><i className="fa fa-chevron-left"></i></Button>:<Button onClick={backwardPage}><i className="fa fa-chevron-left"></i></Button>}
              </ButtonGroup>

              <ButtonGroup>
              {console.log(loop)}
                {loop!=null && loop.map((item,index)=>{
                  return <Button>index</Button>
                })}
              </ButtonGroup>

              <ButtonGroup style={{margin:'20px'}}>
                  {size.pre>=(state.data.length-size.increment)?
                    <Button disabled><i className="fa fa-chevron-right"></i></Button>:
                    <Button onClick={forwardPage}><i className="fa fa-chevron-right"></i></Button>
                  }
                  {size.pre>=(state.data.length-size.increment)?
                    <Button disabled><i className="fa fa-forward"></i></Button>:
                    <Button onClick={()=>{setSize({...size,pre:Math.floor(state.data.length/size.increment)*size.increment,all:state.data.length})}}>
                      <i className="fa fa-forward"></i>
                    </Button>
                  }
              </ButtonGroup>

              <ButtonGroup>
                <Button disabled><b>List Size</b></Button>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle>
                   <b>{size.increment}<i className="fa fa-chevron-down"></i></b>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={()=>{setSize({pre:0,all:10,increment:10})}}>10</DropdownItem>
                    <DropdownItem onClick={()=>{setSize({pre:0,all:20,increment:20})}}>20</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
            </div>}
        </Col>
    </Row>
    </div>
  )
}

export default Gallary
