import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap"
import classnames from "classnames"
import { User, Info, Share } from "react-feather"
import AccountTab from "./Account"
import InfoTab from "./Information"
import SocialTab from "./Social"
import "../../../../assets/scss/pages/users.scss"
import { withRouter } from "react-router"
import axios from "axios"
class UserEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeTab: "1",
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
      await axios.get("api/users/list").then(async response => {
        let user = response.data[0]
        await this.setState({ user })
        console.log(this.state)
      })
    }
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    return (
      <Row>
        <Col sm="12">
          <Card>
            <CardBody className="pt-2">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1"
                    })}
                    onClick={() => {
                      this.toggle("1")
                    }}
                  >
                    <User size={16} />
                    <span className="align-middle ml-50">Account</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2"
                    })}
                    onClick={() => {
                      this.toggle("2")
                    }}
                  >
                    <Info size={16} />
                    <span className="align-middle ml-50">Information</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "3"
                    })}
                    onClick={() => {
                      this.toggle("3")
                    }}
                  >
                    <Share size={16} />
                    <span className="align-middle ml-50">Social</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <AccountTab {...this.state.user} />
                </TabPane>
                <TabPane tabId="2">
                  <InfoTab />
                </TabPane>
                <TabPane tabId="3">
                  <SocialTab />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default withRouter(UserEdit)
