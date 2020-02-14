import React, {useState} from 'react';
import Container from 'reactstrap/lib/Container'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {forgot} from '../../../Authentications'
function Forgot(props) {
  const [inputs, setInputs] = useState({});
    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
      }
      const handleSubmit=(event) => {
        event.preventDefault();
        //console.log('hello')
        console.log(inputs.emailId)
        forgot(inputs.emailId)
        .then(res =>{
          alert(res.message)
         })
        .catch(err =>{
          alert(err);
        })
      }
  return (
    <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                            <Card className="p-6">
                                <CardBody>
                                    <Form onSubmit={handleSubmit}>
                                        <h1>Forget Password</h1>
                                        <br/>
                                        <h5 className="text-muted">Enter Email Address Associated With Your Account</h5>
                                        <h6 className="text-muted">We will email you a link to reset your password </h6>
                                        <br/>
                                        <InputGroup className="mb-3" style={{fontSize:'25px'}}>
                                            <InputGroupAddon addonType="prepend">
                                                 <InputGroupText>
                                                  <i className="fa fa-envelope-open-o"></i>
                                                 </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="email" placeholder="enter email" name="emailId" value={inputs.emailId} onChange={handleInputChange}/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                              <Link to='/login'>
                                                <Button color="link" className="px-0">Back To Sign In?</Button>
                                              </Link>
                                            </Col>
                                            <Col xs="6" className="text-right">
                                                <Button type='submit' color="primary" className="px-4">Send Mail</Button>
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

export default Forgot
