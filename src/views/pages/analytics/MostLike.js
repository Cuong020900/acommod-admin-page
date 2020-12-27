import React from "react"
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap"
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
                ]
            },
            stroke: {
                curve: "straight"
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: "",
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
        await axios.get("https://localhost:5000/api/Post/mostlike").then(response => {
            let rowData = response.data
            this.setState({
                options: {
                    xaxis: {
                        categories: rowData.map(e => ("Post ID: " + e.postId))
                    }
                },
                series: [
                    {
                        name: 'likes',
                        data: rowData.map(e => e.totalLike)
                    }
                ]
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-danger">Top 5 bài viết được yêu thích nhất</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            height={350}
                        />
                    </CardBody>
                </Card>
            </React.Fragment>

        )
    }
}
export default Home
