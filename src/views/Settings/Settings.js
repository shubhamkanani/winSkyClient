import React,{useRef,useState,useEffect} from 'react'
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button,Col,Row,Progress, Form ,FormGroup ,Label ,InputGroup, InputGroupAddon, Input,Modal,ModalBody,ModalHeader, ListGroup,ListGroupItem
} from 'reactstrap';
import{uploadImg,uploadData,GetAllItems} from './../../api'
import './Settings.css'
import moment from 'moment'
import {connect} from 'react-redux'


function Settings(props) {
  const inputFile = useRef(null)
  //const [pimg, setPimg] = useState({});
  const [totalFile,setTotalfile] = useState();
  const startDate = moment().subtract(7,"days");
  const [state,setState] = useState(()=>{const recentData = []
    GetAllItems().then(async res=>{
      setTotalfile(res.data.length);
    await res.data.map(async(item)=>{
        if(moment().min(startDate._d)){
          await recentData.push(item)
        }
    })
    setState(recentData)
  })})
  const [pinput,setPinput] = useState({});
  const [loding,setloding] = useState(false);
  const [modal, setModal] = useState(false);
  const recentData =[];
  const toggle = () => setModal(!modal);

  // useEffect(()=>{

  //   console.log(startDate._d);
  //   GetAllItems().then(async res=>{
  //     await res.data.map(async(item)=>{
  //         if(moment().min(startDate._d)){
  //           await recentData.push(item)
  //         }
  //     })
  //     console.log(recentData);
  //   })
  // },[])

  const editProfileImg = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };

  const onChangeImgFile = async(event) => {
    event.stopPropagation();
    event.preventDefault();
    //console.log(event.target.files[0])
    var form = new FormData();
    form.append('file', event.target.files[0]);
    console.log(event.target.files[0])
    uploadImg(form);
  }
  const onhandalInputChange = async(event) =>{
    event.persist();
    setPinput({...pinput,[event.target.name]: event.target.value});
    //console.log(pinput)
  }
  const onPassSubmit = async(event) =>{
    event.preventDefault();
    let passwordRegEx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/;
    if(pinput.newPassword){
      if(!pinput.newPassword.match(passwordRegEx)){
        alert("password is less secure use atlest 8char && ([A-Z],[a-z],[@$%])");
        return false;
      }
      uploadData(pinput).then(res=>{setPinput({});});
      console.log(pinput)
    }
    else {
      alert('enter value of new password or old password')
    }
  }
  const onClickEdit = () =>{
    setPinput({firstName:props.items.data[0].firstName,
      lastName:props.items.data[0].lastName,
      emailId:props.items.data[0].emailId
    })
    toggle();
  }
  const onhandaleSubmitProfile = (event) =>{
    event.preventDefault();
    setloding(true)
    uploadData(pinput,props).then(res=>{setPinput({})}).then(red=>{setloding(false)});
  }
  const onhandaleChangeProfile = (event) =>{
    event.persist();
    setPinput({...pinput,[event.target.name]: event.target.value});
  }

  return (
    <div>
      <Row style={{marginTop:'15px'}}>
        <Col sm={4}>
          <Card className="text-white bg-primary">
              <CardBody className="pb-0" style={{padding:'15px'}}>
                  <Button color='success' className="float-right" onClick={onClickEdit}><b> <i className='fa fa-edit'> </i> Edit </b></Button>
                <div className="text-value">Edit Profile</div>
                <div>Change your profile data</div>
              </CardBody>
                <div className="chart-wrapper mx-3" style={{padding:'15px'}}>
                    <Progress value={75} color='success'/>
                </div>
            </Card>
                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle}>Edit Profile Data</ModalHeader>
                                      <ModalBody>
                                          <Form onSubmit={onhandaleSubmitProfile}>
                                                <FormGroup>
                                                  <Label for='first name'><b>Change firstname :</b></Label>
                                                  <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                      <Button disabled><i className='fa fa-user-circle-o'></i></Button>
                                                    </InputGroupAddon>
                                                    <Input type='text' name='firstName' value={pinput.firstName} placeholder='Enter Email here' onChange={onhandaleChangeProfile}/>
                                                  </InputGroup>
                                                </FormGroup>
                                                <FormGroup>
                                                  <Label for='last name'><b>Change lastname :</b></Label>
                                                  <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                      <Button disabled><i className='fa fa-user-circle-o'></i></Button>
                                                    </InputGroupAddon>
                                                    <Input type='text' name='lastName' value={pinput.lastName} placeholder='Enter Email here' onChange={onhandaleChangeProfile}/>
                                                  </InputGroup>
                                                </FormGroup>
                                                  <FormGroup>
                                                    <Label for='emailId'><b>Change email_Id :</b></Label>
                                                    <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                      <Button disabled><i className='fa fa-envelope-open'></i></Button>
                                                    </InputGroupAddon>
                                                    <Input type='email' name='emailId' value={pinput.emailId} placeholder='Enter Email here' onChange={onhandaleChangeProfile}/>
                                                    </InputGroup>
                                                  </FormGroup>
                                            {!loding?<Row style={{float:'right', marginRight:'3px'}}>
                                              <Button color="primary" type='submit' style={{margin:'2px'}}><b>Edit Profile</b></Button>
                                              <Button color="secondary" onClick={toggle} style={{margin:'2px'}}><b>Cancel Edit</b></Button>
                                            </Row>:
                                            <Row style={{float:'right'}}>
                                              <Button color="primary" type='submit' style={{margin:'2px'}} disabled><b>Edit Profile</b></Button>
                                              <Button color="secondary" disabled style={{margin:'2px'}}><b>Cancel Edit</b></Button>
                                            </Row>
                                          }
                                          </Form>
                                      </ModalBody>
                                    </Modal>
        </Col>
        <Col sm={4}>
          <Card className="text-white bg-warning">
              <CardBody className="pb-0" style={{padding:'15px'}}>
                  <Button color='primary' className="float-right"><b> <i className='fa fa-lock'> </i> Change </b></Button>
                <div className="text-value">Change Password</div>
                <div>Change your security Password</div>
              </CardBody>
                <div className="chart-wrapper mx-3" style={{padding:'15px'}}>
                    <Progress value={75} color='#17a2b8'/>
                </div>
            </Card>
        </Col>
        <Col sm={4}>
          <Card className="text-white bg-danger">
              <CardBody className="pb-0" style={{padding:'15px'}}>
                  <Button color='warning' className="float-right"><b> <i className='fa fa-edit'> </i> Display </b></Button>
                <div className="text-value">Display Profile</div>
                <div>Show your Enter Data</div>
              </CardBody>
                <div className="chart-wrapper mx-3" style={{padding:'15px'}}>
                    <Progress value={75} color='warning'/>
                </div>
            </Card>
        </Col>
      </Row>
      <Row>
        <div class="col-xl-8 col-md-8 col-sm-8">

              <div class="bg-white shadow rounded overflow-hidden">
                  <div class="px-4 pt-0 pb-4 bg-dark">
                      <div class="media align-items-end profile-header">
                          <div class="profile mr-3">
                            <img src="https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail"/>
                            <br/>
                            <div>
                              <button class="btn btn-dark btn-sm btn-block" onClick={editProfileImg}>Edit profile image</button>
                              <input type="file" name="file" ref={inputFile} accept="image/*" onChange={onChangeImgFile} style={{display: "none"}}/>
                            </div>
                          </div>
                          <div class="media-body mb-5 text-white">
                              <h3 class="mt-0 mb-0">{props.items.data[0].firstName + ' ' + props.items.data[0].lastName}</h3>
                              <p class="small mb-4"> <i class="fa fa-envelope-open mr-2"></i>{props.items.data[0].emailId}</p>
                          </div>
                      </div>
                  </div>

                  <div class="bg-light p-4 d-flex justify-content-end text-center">
                      <ul class="list-inline mb-0">
                          <li class="list-inline-item">
                              <h5 class="font-weight-bold mb-0 d-block">{totalFile}</h5><small class="text-muted"> <i class="fa fa-folder-open mr-1"></i>Uploaded Files</small>
                          </li>
                      </ul>
                  </div>

                  <div class="py-4 px-4">
                      <div class="d-flex align-items-center justify-content-between mb-3">
                          <h5 class="mb-0">Recent Files</h5><a href="#" class="btn btn-link text-muted">Show all</a>

                      </div>
                      <div class="row">
                            <ListGroup style={{width:'100%'}}>
                            {console.log(state)}
                            { state && state.map((item, index) =>
                              {
                                return <ListGroupItem key={index}>
                                  <Row>
                                    <Col sm={7} style={{overflow:'scroll'}}><span style={{float:'left'}}><b>{item.filename}</b></span></Col>
                                    <Col sm={5}><span>{item.createdAt}</span></Col>
                                  </Row>
                                </ListGroupItem>
                              })
                            }
                            </ListGroup>
                      </div>
                      <div class="py-4">
                          <h5 class="mb-3">Recent posts</h5>
                          <div class="p-4 bg-light rounded shadow-sm">
                              <p class="font-italic mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                              <ul class="list-inline small text-muted mt-3 mb-0">
                                  <li class="list-inline-item"><i class="fa fa-comment-o mr-2"></i>12 Comments</li>
                                  <li class="list-inline-item"><i class="fa fa-heart-o mr-2"></i>200 Likes</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
          <div class="col-xl-4 col-md-4 col-sm-4">
            <Col sm={12}  style={{padding:'0px'}}>
                <Card className="text-darkgray bg-secondary">
                  <CardBody className="pb-0" style={{padding:'15px'}}>
                      <Form onSubmit={onPassSubmit}>
                        <FormGroup>
                          <Label for='oPassword'><b>Enter old Password :</b></Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <Button style={{backgroundColor:'darkgray'}} disabled><i className='fa fa-lock'></i></Button>
                            </InputGroupAddon>
                            <Input type='password' name='oldPassword' onChange={onhandalInputChange} placeholder='Enter old password here' required/>
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <Label for='nPassword'><b>Enter New Password :</b></Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <Button style={{backgroundColor:'darkgray'}} disabled><i className='fa fa-lock'></i></Button>
                            </InputGroupAddon>
                            <Input type='password' name='newPassword' onChange={onhandalInputChange} placeholder='Enter new password here' required/>
                          </InputGroup>
                        </FormGroup>
                        <Button type='submit' color='warning' className="float-right"><b> <i className='fa fa-refresh'> </i> Change Password </b></Button>
                    </Form>
                  </CardBody>
                    <div className="chart-wrapper mx-3" style={{padding:'15px'}}>
                        <Progress value={75} color='warning'/>
                    </div>
                </Card>
            </Col>
          </div>
      </Row>
    </div>
  )
}
const mapStateToProps = state =>({
  ...state,
  // console.log(userData.items.data[0].role)
  // return userData.items.data[0].role
})
export default connect(mapStateToProps,null)(Settings);
