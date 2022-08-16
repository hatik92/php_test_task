import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import style from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useSanctum } from "react-sanctum";
import { getUser } from '../../appSlice';
import { loginAsUser } from './loginSlice';
import librarianIcon from '../../images/librarian.png'
import studentIcon from '../../images/student.png'
import { useRef } from 'react';

const Login = () => {
  const loginAsStorage = localStorage.getItem("loginAs");
  const [loginToggle, setloginToggle] = useState(loginAsStorage ? JSON.parse(loginAsStorage) : false);
  const [loginData, setloginData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { authenticated, user, signIn } = useSanctum();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('loginAs', loginToggle)
    dispatch(loginAsUser(loginToggle))
  }, [loginToggle, dispatch]);

  useEffect(() => {
    if (!loginAsStorage) {
      return
    }
    dispatch(loginAsUser(JSON.parse(loginAsStorage)))
  }, [dispatch]);
  
  useEffect(() => {
    if (authenticated) {
      navigate('/')
      dispatch(getUser(user))
    }
  }, [authenticated, dispatch, navigate, user]);

  const onChangeHandler = (e) => {
    if (errorMessage) {
      seterrorMessage('')
    }
    setloginData((prev) => {
      prev[e.target.name] = e.target.value;
      return prev;
    });
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity()) {
      e.stopPropagation();
      signIn(loginData.email, loginData.password)
        .then(() => {
          seterrorMessage('')
          navigate('/')
        })
        .catch(() => seterrorMessage("Incorrect email or password"));
    }
    setValidated(true);
  }
  const loginAs = () => {
    setloginToggle(!loginToggle)
  }

  return <>
    <div className='min-vh-100 d-flex flex-row align-items-center'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
            <div className='csrd-group'>
              <div className={style.loginForm + ' p-4'}>
                <div className='card-body'>
                  <img src={loginToggle ? librarianIcon : studentIcon} width='80' alt='' />
                  <Form className='m-auto' onSubmit={onSubmitHandler} noValidate validated={validated}>
                    {errorMessage
                      ? <h3 className='text-danger'>{errorMessage}</h3>
                      : <h3 className='text-success'>Plase login</h3>
                    }
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        required
                        name='email'
                        defaultValue={loginData.email}
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Control
                        required
                        name='password'
                        defaultValue={loginData.password}
                        onChange={onChangeHandler}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <div className='row'>
                      <div className='col-6'>
                        <Button variant="primary" type="submit">Submit</Button>
                      </div>
                      <div className='col-6 text-right'>
                        <Button onClick={() => loginAs()}>Login as {!loginToggle ? 'librarian' : 'student'}</Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login
