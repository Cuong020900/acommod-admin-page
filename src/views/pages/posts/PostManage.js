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
import userImg from "../../../assets/img/portrait/small/avatar-s-19.jpg"
class PostManage extends React.Component {
    test () {
        console.log(this.props.match.params.id)
    }
    render () {
        return (
            <Row>
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
                                Crystal Hamilton
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
                                        defaultValue="crystal"
                                        id="username"
                                        placeholder="Username"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input type="select" name="status" id="status">
                                        <option>Active</option>
                                        <option>Banned</option>
                                        <option>Closed</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col md="6" sm="12">
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        defaultValue="Crystal Hamilton"
                                        id="name"
                                        placeholder="Name"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                                <FormGroup>
                                    <Label for="role">Role</Label>
                                    <Input type="select" name="role" id="role">
                                        <option>User</option>
                                        <option>Staff</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="text"
                                        defaultValue="crystalhamilton@gmail.com"
                                        id="email"
                                        placeholder="Email"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md="6" sm="12">
                                <FormGroup>
                                    <Label for="company">Company</Label>
                                    <Input
                                        type="text"
                                        id="company"
                                        defaultValue="North Star Aviation Pvt Ltd"
                                        placeholder="company"
                                    />
                                </FormGroup>
                            </Col>
                            <Col
                                className="d-flex justify-content-end flex-wrap mt-2"
                                sm="12"
                            >
                                <Button onClick={this.test.bind(this)} className="mr-1" color="primary">
                                    Save Changes
                                </Button>
                                <Button color="flat-warning">Reset</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        )
    }
}
export default PostManage
