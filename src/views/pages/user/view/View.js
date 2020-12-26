import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Table
} from "reactstrap"
import { Edit, Trash, Lock, Check } from "react-feather"
import { Link } from "react-router-dom"
import Checkbox from "../../../../components/@vuexy/checkbox/CheckboxesVuexy"
import { history } from "../../../../history"
import userImg from "../../../../assets/img/portrait/small/avatar-s-18.jpg"
import "../../../../assets/scss/pages/users.scss"
import { withRouter } from "react-router"
import axios from "axios"
class UserView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: null
    }
  }
  async componentDidMount () {
    const query = new URLSearchParams(this.props.location.search)

    let userId = query.get('id')

    if (userId === null) {
      this.props.history.push("/")
    } else {
      // get user info 
      await axios.get("https://localhost:5000/api/User/getbyId?id=" + userId, {
        withCredentials: true
      }).then(response => {
        let user = response.data
        this.setState({ user })
      })
    }
  }
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        <Media
                          className="rounded mr-2"
                          object
                          src={userImg}
                          alt="Generic placeholder image"
                          height="112"
                          width="112"
                        />
                      </Media>
                      <Media body>
                        <Row>
                          <Col sm="9" md="6" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Username
                                </div>
                                <div>{ this.state.user?.userName }</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Name
                                </div>
                                <div>{ this.state.user?.firstName + " " + this.state.user?.lastName}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Email
                                </div>
                                <div className="text-truncate">
                                  <span>{ this.state.user?.email }</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md="12" lg="5">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Đã xác nhận
                                </div>
                                <div>{ this.state.user?.isConfirm ? "Đã xác nhận" : "Chưa xác nhận"}</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Role
                                </div>
                                <div>{ function a(self) { 
                                  let result = ""
                                  Object.values(self.state.user?.roles ?? []).forEach(e => {
                                    result += e + " "
                                  })
                                  if (result === "") {
                                    return "user"
                                  }
                                  return result.toLowerCase()
                                }(this) }</div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Địa chỉ
                                </div>
                                <div>
                                  <span>{ this.state.user?.address }</span>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                  <Col className="mt-1 pl-0" sm="12">
                    <Button.Ripple className="mr-1" color="primary" outline>
                      <Link to={"/app/user/edit?id=" + this.state.user?.id}>
                        <Edit size={15} />
                        <span className="align-middle ml-50">Edit</span>
                      </Link>
                    </Button.Ripple>
                    <Button.Ripple color="danger" outline onClick={() => {
                      axios.delete("https://localhost:5000/api/User/deletebyid?id=" + this.state.user?.id)
                      history.push("/")
                    }}>
                      <Trash size={15} />
                      <span className="align-middle ml-50">Delete</span>
                    </Button.Ripple>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Information</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Birth Date
                    </div>
                    <div> 28 January 1998</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Mobile
                    </div>
                    <div>+65958951757</div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Website
                    </div>
                    <div className="text-truncate">
                      <span>https://rowboat.com/insititious/Crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Languages
                    </div>
                    <div className="text-truncate">
                      <span>English, French</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Gender
                    </div>
                    <div className="text-truncate">
                      <span>Female</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Contact
                    </div>
                    <div className="text-truncate">
                      <span>email, message, phone</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" md="6">
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="users-page-view-table">
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Twitter
                    </div>
                    <div className="text-truncate">
                      <span>https://twitter.com/crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Facebook
                    </div>
                    <div className="text-truncate">
                      <span>https://www.facebook.com/crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Instagram
                    </div>
                    <div className="text-truncate">
                      <span>https://www.instagram.com/crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Github
                    </div>
                    <div className="text-truncate">
                      <span>https://github.com/crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      CodePen
                    </div>
                    <div className="text-truncate">
                      <span>https://codepen.io/crystal</span>
                    </div>
                  </div>
                  <div className="d-flex user-info">
                    <div className="user-info-title font-weight-bold">
                      Slack
                    </div>
                    <div className="text-truncate">
                      <span>@crystal</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default withRouter(UserView)
