import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
// import {  login } from './loginSlice';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Common/Context/AuthProvider';
import { useSanctum } from "react-sanctum";


const Login = () => {
  const [loginData, setloginData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { authenticated, user, signIn } = useSanctum();

  // const {isAuth} = useSelector(store => store.login)
  // const { setAuth } = useContext(AuthContext);
  
  // useEffect(() => {
  //   if (isAuth) {
  //     return navigate('/')
  //   }
  // }, [isAuth]);

  const onSubmitHandler = (e) => {
    e.preventDefault()
    signIn(loginData.email, loginData.password)
      .then(() => navigate('/'))
      .catch(() => window.alert("Incorrect email or password"));

    // setAuth({ email: loginData.email, password:loginData.password });
    // dispatch(login(loginData))
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
