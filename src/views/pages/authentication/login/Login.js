import React from "react"
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap"
import { Mail, Lock, Check, Facebook, Twitter, GitHub } from "react-feather"
import { history } from "../../../../history"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import googleSvg from "../../../../assets/img/svg/google.svg"

import loginImg from "../../../../assets/img/pages/login.png"
import "../../../../assets/scss/pages/authentication.scss"

import { connect } from 'react-redux'

import axios from "axios"

import { getUserInfo } from '../../../../redux/actions/auth/userinfoActions'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

class Login extends React.Component {
  state = {
    activeTab: "1",
    email : "",
    password: ""
  }

  notifyWarning = () => toast.warning("Sai tên đăng nhập hoặc mật khẩu!")

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }
  login = async () => {
    let dataSend = {
      "userName": this.state.email,
      "password": this.state.password
    }
    // let res = await axios.post("https://localhost:5000/api/User/login", dataSend)
    const response = await fetch("https://localhost:5000/api/Login/login", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataSend) // body data type must match "Content-Type" header
    });

    if (response.status === 200) {
      await this.props.getData()
      history.push("/")
    } else {
      this.notifyWarning()
    }
  }
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <ToastContainer />
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center px-1 py-0"
              >
                <img src={loginImg} alt="loginImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2">
                      <CardBody>
                        <h4>Login</h4>
                        <p>Welcome back, please login to your account.</p>
                        <Form onSubmit={e => e.preventDefault()}>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="text"
                              placeholder="Username"
                              value={this.state.email}
                              onChange={e => this.setState({ email: e.target.value })}
                            />
                            <div className="form-control-position">
                              <Mail size={15} />
                            </div>
                            <Label>Email</Label>
                          </FormGroup>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={e => this.setState({ password: e.target.value })}
                            />
                            <div className="form-control-position">
                              <Lock size={15} />
                            </div>
                            <Label>Password</Label>
                          </FormGroup>
                          <FormGroup className="d-flex justify-content-between align-items-center">
                            <Checkbox
                              color="primary"
                              icon={<Check className="vx-icon" size={16} />}
                              label="Remember me"
                            />
                            <div className="float-right">
                              Forgot Password?
                            </div>
                          </FormGroup>
                          <div className="d-flex justify-content-between">
                            <Button.Ripple color="primary" outline>
                             Register                           
                            </Button.Ripple>
                            <Button.Ripple color="primary" type="submit" onClick={() => { 
                              this.login()
                              }}>
                                Login 
                            </Button.Ripple>
                          </div>
                        </Form>
                      </CardBody>
                      <div className="auth-footer">
                        <div className="divider">
                          <div className="divider-text">OR</div>
                        </div>
                        <div className="footer-btn">
                          <Button.Ripple className="btn-facebook" color="">
                            <Facebook size={14} />
                          </Button.Ripple>
                          <Button.Ripple className="btn-twitter" color="">
                            <Twitter size={14} stroke="white" />
                          </Button.Ripple>
                          <Button.Ripple className="btn-google" color="">
                            <img src={googleSvg} alt="google" height="15" width="15" />
                          </Button.Ripple>
                          <Button.Ripple className="btn-github" color="">
                            <GitHub size={14} stroke="white" />
                          </Button.Ripple>
                        </div>
                      </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch(getUserInfo())
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    name: state.auth.userInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
