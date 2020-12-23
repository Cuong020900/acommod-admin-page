import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import axios from "axios"


class Home extends React.Component {
  state = {
    options: {
      chart: {
        id: "lineChart"
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
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
}

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
           <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={350}
          />
        </CardBody>
      </Card>
    )
  }
}
export default Home
