import React, {useState} from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios'
import { Validation } from './Validation';
function Register(props) {
    const [inputs, setInputs] = useState({role:'user'});
   // const [state, setState] = useState({loading:'false'});
    const handleInputChange = (event) => {
      //console.log(inputs)
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }
    const handleSubmit=(event)=>{
      event.preventDefault();
      if(Validation(inputs)){
        const data = {
          firstName:inputs.fname,
          lastName:inputs.lname,
          emailId : inputs.email,
          password : inputs.password,
          role:inputs.role
        }
        console.log(data)
          axios.post('http://localhost:8080/auth/signup',data)
          .then(res=>{
            console.log(res.data.message)
            if(!res.data.success){
              alert(res.data.message);
              setInputs(null)
            }
            else{
              alert(res.data.message);
              props.history.push('/login')
            }
          })
          .catch(err=>{

            console.log(err)
          })
      } else {
          return false
      }
    }
    return (
        <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={inputs.fname} name='fname' placeholder="first name" onChange={handleInputChange} autoComplete="fname" required/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" value={inputs.lname} name='lname' placeholder="last name" onChange={handleInputChange} autoComplete="lname" required/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope-open-o"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" value={inputs.emailId} name='email' placeholder="Email" onChange={handleInputChange} autoComplete="email" required/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={inputs.password} name='password' placeholder="Password" onChange={handleInputChange} autoComplete="new-password" required/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" value={inputs.re_password} name='conformPassword' placeholder="Repeat password" onChange={handleInputChange} autoComplete="new-password" required/>
                    </InputGroup>
                    <Button type='submit' color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default Register
