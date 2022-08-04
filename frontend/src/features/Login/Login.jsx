import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import style from './login.module.css';
import { useNavigate } from 'react-router-dom';
import { useSanctum } from "react-sanctum";
import { getUser } from '../../appSlice';

const Login = () => {
  const [loginData, setloginData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { authenticated, user, signIn } = useSanctum();

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

  return <>
    <div className={style.loginForm + ' mt-5 container bg-gradient d-flex justify-content-center'}>
      <Form className='w-50 m-auto' onSubmit={onSubmitHandler} noValidate validated={validated}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  </>
}

export default Login
