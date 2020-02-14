import React, {useState} from 'react';
import Container from 'reactstrap/lib/Container'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {login} from '../../../Authentications'

function Login(props) {
    const [inputs, setInputs] = useState({});
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }
    const handleSubmit=(event) => {
        event.preventDefault();
        console.log('hello')
        login(inputs.emailId,inputs.password)
        .then(res =>{
          props.history.replace('/');
         })
        .catch(err =>{
          alert(err);
        })
      }
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="p-6">
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-muted">Sign In to your account</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                 <InputGroupText>
                                                 <i className="fa fa-envelope-open-o"></i>
                                                 </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" placeholder="enter email" name="emailId" value={inputs.emailId} onChange={handleInputChange}/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password" name='password' autoComplete="current-password" value={inputs.password} onChange={handleInputChange}/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button type='submit' color="primary" className="px-4">Login</Button>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                            <Link to='/forgetpassword'>
                                              <Button color="link" className="px-0">Forgot password?</Button>
                                            </Link>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '10%' }}>
                                <CardBody className="text-center">
                                    <div>
                                    <h2>Sign up</h2>

                                    <Link to="/register">
                                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                    </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
