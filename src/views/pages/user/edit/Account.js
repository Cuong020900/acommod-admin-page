import React from "react"
import {
  Media,
  Row,
  Col,
  Button,
  Form,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import userImg from "../../../../assets/img/portrait/small/avatar-s-18.jpg"
class UserAccountTab extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSend: {
        id: null,
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        address: null,
        accessId: 0
      },
      user: null
    }
  }

  async componentDidMount () {
    await axios.get("https://localhost:5000/api/User/getbyId?id=" + this.props?.userId, {
        withCredentials: true
      }).then(async response => {
        let user = response.data
        await this.setState({ user })
        this.setState(prevState => ({
            id: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phoneNumber,
            email: user?.email,
            address: user?.address
        }))
      })
  }

  updateUserInfo = async () => {
    let dataSend = {
      id: this.state?.id,
      firstName: this.state?.firstName,
      lastName: this.state?.lastName,
      phone: this.state?.phone,
      email: this.state?.email,
      address: this.state?.address
    }
    await fetch("https://localhost:5000/api/User/update?userId=" + this.state?.id, {
      "headers": {
        "accept": "*/*",
        "accept-language": "vi,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": JSON.stringify(dataSend),
      "method": "PUT",
      "mode": "cors",
      "credentials": "include"
    });
    toast.success("Thay đổi thông tin thành công")
  }

  assignRole = async (role) => {
    await fetch("https://localhost:5000/api/User/roleAssign", {
      "headers": {
        "accept": "*/*",
        "accept-language": "vi,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
      },
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": JSON.stringify({
        userId: this.state?.user?.id,
        accessId: 0,
        role: role
      }),
      "method": "PUT",
      "mode": "cors",
      "credentials": "include"
    })
    toast.success("Thay đổi role thành công")
  }
  render() {
    return (
      <Row>
        <ToastContainer />
        <Col sm="12">
          <Media className="mb-2">
            <Media className="mr-2 my-25" left href="#">
              <Media
                className="users-avatar-shadow rounded"
                object
                src={userImg}
                alt="user profile image"
                height="84"
                width="84"
              />
            </Media>
            <Media className="mt-2" body>
              <Media className="font-medium-1 text-bold-600" tag="p" heading>
                { this.state.user?.name }
              </Media>
              <div className="d-flex flex-wrap">
                <Button.Ripple className="mr-1" color="primary" outline>
                  Change
                </Button.Ripple>
                <Button.Ripple color="flat-danger">Remove Avatar</Button.Ripple>
              </div>
            </Media>
          </Media>
        </Col>
        <Col sm="12">
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    defaultValue={this.state.user?.userName}
                    id="username"
                    disabled={true}
                    placeholder="Username"
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">Phone</Label>
                  <Input
                    type="text"
                    defaultValue={ this.state.user?.phoneNumber}
                    id="name"
                    placeholder="Name"
                    onChange={e => this.setState({ phone: e.target.value })}
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">First Name</Label>
                  <Input
                    type="text"
                    defaultValue={ this.state.user?.firstName}
                    id="name"
                    placeholder="Name"
                    onChange={e => this.setState({ firstName: e.target.value })}
                  />
                </FormGroup>
              </Col>
              
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="name">Last Name</Label>
                  <Input
                    type="text"
                    defaultValue={ this.state.user?.lastName}
                    id="name"
                    placeholder="Name"
                    onChange={e => this.setState({ lastName: e.target.value })}
                  />
                </FormGroup>
              </Col>

              <Col md="6" sm="12">
              <FormGroup className="mb-0">
                <Label for="status">Role</Label>
                <Input
                    type="select"
                    name="status"
                    id="status"
                    defaultValue={this.state?.user?.roles}
                    onChange={e => {
                      this.assignRole(e.target?.value)
                    }}
                >
                    <option value={"ADMIN"}>Admin</option>
                    <option value={"MODERATOR"}>Mod</option>
                    <option value={"OWNER"}>Owner</option>
                    <option value={"RENTER"}>Renter</option>
                </Input>
            </FormGroup>
              </Col>
              
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="text"
                    defaultValue={this.state.user?.email}
                    id="email"
                    placeholder="Email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <Label for="company">Địa chỉ</Label>
                  <Input
                    type="text"
                    id="company"
                    defaultValue={ this.state.user?.address }
                    placeholder="company"
                    onChange={e => this.setState({ address: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col
                className="d-flex justify-content-end flex-wrap mt-2"
                sm="12"
              >
                <Button.Ripple className="mr-1" color="primary" onClick={this.updateUserInfo}>
                  Lưu thay đổi
                </Button.Ripple>
                <Button.Ripple color="flat-warning">Reset</Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}
export default UserAccountTab
