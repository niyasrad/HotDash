import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Column extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Inflation',
                data: []
            }],
            options: {
                chart: {
                    type: 'bar',
                },
                color: ["#000000"],
                plotOptions: {
                    bar: {
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: false,
                    formatter: function (val) {
                        return val + "%";
                    },
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#000000"]
                    }
                },
                fill: {
                    colors: ['#000000'],
                    opacity: 0.3,
                },
                xaxis: {
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return val + "%";
                        }
                    }

                },
                title: {
                    text: 'Monthly Inflation in Argentina, 2002',
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#000'
                    }
                }
            }
        }
    }
    componentDidMount() {
        this.setState({
            series: [{
                name: 'people',
                data: this.props.yas
            }]
        })
    }
    render() {
        return (
            <Chart options={this.state.options} series={this.state.series} height='100%' width='100%' type='bar'/>
        );
    }
}

export default Column;