import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import {  login } from './loginSlice';

const Login = () => {
  const [loginData, setloginData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(csrf())
  // }, [dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login(loginData))
    console.log(loginData);
  }
  return <>
    <div className='container d-flex justify-content-center'>
      <Form className='w-50' onSubmit={e => onSubmitHandler(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={loginData.email}
            onChange={e => setloginData(state => ({...state, email: e.target.value}))}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={loginData.password}
            onChange={e => setloginData(state => ({...state, password: e.target.value}))}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </>
}

export default Login
