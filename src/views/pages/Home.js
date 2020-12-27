import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap"
import axios from "axios"
import SalesCard from "./analytics/SalesCard"
import ViewPerDays from "./analytics/ViewPerDays"
import MostView from "./analytics/MostView"
import MostLike from "./analytics/MostLike"

let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $white = "#fff"
class Home extends React.Component {
  state = {
    mostView: null,
    mostLike: null,
    options: {
      chart: {
        id: "lineChart"
      },
      xaxis: {
        categories: [
        ]
      },
      stroke: {
        curve: "straight"
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Số lượt truy cập theo ngày",
        align: "left"
      },
      colors: this.props.themeColors,
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      }
    },
    series: [
      {
        name: "line-series",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ]
  }

  async componentDidMount() {
    await axios.get("api/statistics/view-per-date").then(response => {
        let rowData = response.data
        this.setState({ options: {
          xaxis: {
            categories: rowData.map(e => e.date)
          }
        },
        series: [
          {
            name: 'views',
            data: rowData.map(e => e.views)
          }
        ]
      })
    })
    let mostView = await axios.get("https://localhost:5000/api/Post/mostview", {
      withCredentials: true
    })
    let mostLike = await axios.get("https://localhost:5000/api/Post/mostlike", {
      withCredentials: true
    })

    mostView = {
      name: "Post ID: " + mostView.data[0].postId + " được tạo bởi " + mostView.data[0].userName + " vào lúc " + new Date(mostView.data[0].publicTime).toJSON().slice(0,10),
      link: "https://localhost:3000/product-detail/" + mostView.data[0].postId
    }

    mostLike = {
      name: "Post ID: " + mostLike.data[0].postId + " được tạo bởi " + mostLike.data[0].userName + " vào lúc " + new Date(mostLike.data[0].publicTime).toJSON().slice(0,10),
      link: "https://localhost:3000/product-detail/" + mostLike.data[0].postId
    }

    this.setState(prevState => ({ mostView: mostView, mostLike: mostLike}))
}

  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12" md="12">
            <SalesCard />
          </Col>
          <Col lg="3" md="6" sm="12">
          </Col>
          <Col lg="3" md="6" sm="12">
          </Col>
        </Row>
        <Card>
                    <CardHeader>
                        <CardTitle>Tổng quan</CardTitle>
                    </CardHeader>
                    <CardBody>
                    <h5 className="mb-1">Bài viết nổi bật nhất </h5>
                    <a href={this.state.mostView?.link} target="_blank" className="mb-1">{this.state.mostView?.name ?? ""}</a>
                    <hr />
                    <h5 className="mb-1">Bài viết được yêu thích nhất </h5>
                    <a href={this.state.mostLike?.link} target="_blank" className="mb-1">{this.state.mostLike?.name ?? ""}</a>
                    </CardBody>
                </Card>
        <MostLike />
        <MostView />
        <ViewPerDays />
      </React.Fragment>
      
    )
  }
}
export default Home
