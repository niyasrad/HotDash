import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Sparkline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: []
            }],
            options: {
                chart: {
                    type: 'area',
                    sparkline: {
                        enabled: true
                    },
                },
                stroke: {
                    curve: 'straight'
                },
                yaxis: {
                    min: 0
                },
                colors: ['#000000'],
                title: {
                    text: this.props.yas[0],
                    offsetX: 0,
                    style: {
                        fontSize: '24px',
                    }
                },
                subtitle: {
                    text: this.props.yas[2],
                    offsetX: 0,
                    style: {
                        fontSize: '14px',
                    }
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
                data: this.props.yas[1]
            }]
        })
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} height='100%' width='100%' />
        );
    }
}

export default Sparkline;