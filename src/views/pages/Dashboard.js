import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import BasicUsage from "./Dashboard/BasicUsage"
import Prism from "prismjs"

class Dashboard extends React.Component{
  componentDidMount() {
    Prism.highlightAll()
  }
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Syntax Highlighter"
          breadCrumbParent="Content"
          breadCrumbActive="Syntax Highlighter"
        />
        <Row>
          <Col sm="12">
            <BasicUsage />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Dashboard