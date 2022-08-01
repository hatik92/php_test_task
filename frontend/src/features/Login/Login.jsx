import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import {  login } from './loginSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setloginData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {isAuth} = useSelector(store => store.login)
  
  useEffect(() => {
    if (isAuth) {
      return navigate('/')
    }
  }, [isAuth]);

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(login(loginData))
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </>
}

export default Login
