import React, {useState} from 'react';
import Container from 'reactstrap/lib/Container'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {reset} from '../../../Authentications'
import queryString from 'query-string';
import decode from 'jwt-decode';
import { Validation } from './Validation';
function Reset(props) {

  const token = queryString.parse(props.location.search).token;
  const emailId = decode(token).sub
  //console.log(emailId)

  const [inputs, setInputs] = useState({});
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  const handleSubmit=(event) => {
    event.preventDefault();
  if(Validation(inputs)){
    event.preventDefault();
    reset(inputs.password,token)
    .then(res => {
      alert(res.message)
    })
    .catch(err =>{
      alert(err);
    })
  }
  else{
    return false
  }
  }
  return (
        <div className="app flex-row align-items-center">{
          console.log()
        }

        <Container>
            <Row className="justify-content-center">
                <Col md="6">
                        <Card className="p-6">
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <h1>Reset Password</h1>
                                    <br/>
                                    <h5 className="text-muted">Change your Password associated with below email</h5>
                                    <br/>
                                    <InputGroup className="mb-3" style={{fontSize:'25px'}}>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                              <i className="fa fa-envelope-open-o"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="email" placeholder="enter email" name="emailId" value={emailId} onChange={handleInputChange} disabled/>
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                          <i className="icon-lock"></i>
                                        </InputGroupText>
                                      </InputGroupAddon>
                                      <Input type="password" value={inputs.password} name='password' placeholder="Password" onChange={handleInputChange} autoComplete="new-password" />
                                    </InputGroup>
                                    <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText>
                                        <i className="icon-lock"></i>
                                      </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" value={inputs.conformpassword} name='conformPassword' placeholder="Conform Password" onChange={handleInputChange} autoComplete="new-password" />
                                  </InputGroup>
                                    <Row>
                                        <Col xs="6">
                                          <Link to='/login'>
                                            <Button color="link" className="px-0">Back To Sign In?</Button>
                                          </Link>
                                        </Col>
                                        <Col xs="6" className="text-right">
                                            <Button type='submit' color="primary" className="px-4">Change Password</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Reset
