import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Table } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import Avatar from "../../../components/@vuexy/avatar/AvatarComponent"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-20.jpg"
import httpRequest from "../../../infrastructures/api-http"
import {
    Edit,
    Trash2
} from "react-feather"
import { history } from "../../../history"

class BasicUsage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listUser: []
        }
    }
    async componentDidMount () {
        let res = await httpRequest.get('/api/test')
        this.setState({
            listUser: res.data.searchResult2
        })
    }
    renderTable (listUser) {
        return listUser.map((user, index) => {
            return (
                <tr key={index}>
                    <th scope="row">1</th>
                    <td>
                        <Avatar img={avatarImg}
                            status="online"
                            badgeText="6"
                            badgeColor="danger"
                            badgeUp />
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>@{user.user_name}</td>
                    <td>
                        <div className="actions cursor-pointer">
                            <Edit
                                className="mr-50"
                                size={15}
                                onClick={() => history.push("/app/user/edit")}
                            />
                            <Trash2
                                size={15}
                            />
                        </div>
                    </td>
                </tr>
            )
        })
    }
    render () {
        return (
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbTitle="Dashboard"
                    breadCrumbParent="Dashboard"
                    breadCrumbActive="Quản lý người dùng"
                />
                <Card>
                    <CardHeader>
                        <CardTitle>Quản lý người dùng</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <td>Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable(this.state.listUser)}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}
export default BasicUsage
