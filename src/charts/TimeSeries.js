import React, { Component } from "react";
import Chart from "react-apexcharts";

class TimeSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Bookings',
                data: []
            }],
            options: {
                chart: {
                    type: 'area',
                    stacked: false,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: 'Daily Bookings',
                    align: 'left'
                },
                colors: ['#000000'],
                xaxis: {
                    type: 'datetime',
                    format: 'dd/MM',
                },

                fill: {
                    colors: ['#000000'],
                    opacity: 0.3,
                },
            }
        }

    }
    componentDidMount() {
        this.setState({
            series: [{
                name: 'Bookings',
                data: this.props.yas
            }]
        })
}
render(){
    return (
        <Chart options={this.state.options} series={this.state.series} height="100%" width="100%" />
    )
}
}
export default TimeSeries;