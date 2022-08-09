import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useSanctum } from 'react-sanctum';

const Login = () => {
  const [loginData, setloginData] = useState({ email: '', password: '' })
  const [validated, setValidated] = useState(false);
  // const [errorMessage, seterrorMessage] = useState('');
  const navigate = useNavigate()
  const { authenticated, user, signIn, checkAuthentication } = useSanctum();


  useEffect(() => {
    // if (authenticated) {
      // console.log('aaa');
      // if (user.admin) {
      //   navigate('/')
      // } else {
      //   signOut()
      // }
      // dispatch(getUser(user))
      checkAuthentication()
        .then(res => {
          if (res && authenticated) {
            if (user.admin) {
              navigate("/")
              dispatch(getUser(user))
            } else {
              signOut()
            }
          } 
          // else if (authenticated === false) {
          //   navigate("/login")
          //   dispatch(getUser(user))
          // }
        })
        .catch(err => {
          dispatch(getUser(user))
          navigate("/500")
        })
      // if (authenticated === false) {
      //   navigate("/login")
      // }
    // }
  }, [authenticated, navigate]);

  const onChangeHandler = (e) => {
    // if (errorMessage) {
    //   seterrorMessage('')
    // }
    setloginData((prev) => {
      prev[e.target.name] = e.target.value
      return prev
    })
  }


  const onSubmitHandler = (e) => {
    e.preventDefault()
    const form = e.currentTarget;
    if (form.checkValidity()) {
      e.stopPropagation();
      signIn(loginData.email, loginData.password)
        .then(() => {
          // seterrorMessage('')
          navigate('/')
        })
      // .catch(() => seterrorMessage("Incorrect email or password"));
    }
    setValidated(true);
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmitHandler}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        name="email"
                        defaultValue={loginData.email}
                        onChange={onChangeHandler}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        defaultValue={loginData.password}
                        onChange={onChangeHandler}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
