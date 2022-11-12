import React, { Component } from 'react';
import Column from '../charts/Column';
import Sparkline from '../charts/Sparkline';
import TimeSeries from '../charts/TimeSeries'
import moment, { defaultFormat } from 'moment';
import { DateRange } from 'react-date-range';
import loading from '../assets/loading.gif'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
export default class HeroPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      json: [],
      date: [{
        startDate: moment({
          year: 2015, month: 6, day: 1
        }).toDate(),
        endDate: moment({
          year: 2015, month: 6, day: 15
        }).toDate(),
        key: 'selection'
      }],
      loading: true,
      combine1: {},
      combine2: {},
      combine3: [],
      combine4: [],
    }
    this.process1 = this.process1.bind(this);
    this.process2 = this.process2.bind(this);

  }
  async componentDidMount() {
    const res = await fetch('https://raw.githubusercontent.com/niyasrad/RadKulch/main/csvjson.json');
    const json = await res.json();
    this.setState({ json })
    this.setState({
      combine1: this.process1(json),
      combine2: this.process2(json),
      combine3: this.process3(json),
      combine4: this.process4(json),
      loading: false
    })

  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.date !== this.state.date) {
      // Now fetch the new data here.
      const res = await fetch('https://raw.githubusercontent.com/niyasrad/RadKulch/main/csvjson.json');
      const json = await res.json();

      this.setState({ json })
      this.setState({
        combine1: this.process1(json),
        combine2: this.process2(json),
        combine3: this.process3(json),
        combine4: this.process4(json),
        loading: false
      })

    }
  }
  process1(json) {
    let arr1 = {};
    let arr2 = [];
    for (let i of json) {
      var longDateStr = moment(i["arrival_date_day_of_month"] + " " + i["arrival_date_month"] + " " + i["arrival_date_year"], 'D MMMM YYYY').format('MM/DD/YYYY');
      if (longDateStr >= moment(this.state.date[0].startDate).format('MM/DD/YYYY') && longDateStr <= moment(this.state.date[0].endDate).format('MM/DD/YYYY')) {
        if (arr1.hasOwnProperty(longDateStr)) {
          arr1[longDateStr] += parseInt(i["children"]) + parseInt(i["adults"]) + parseInt(i["babies"])
        } else {
          arr1[longDateStr] = parseInt(i["children"]) + parseInt(i["adults"]) + parseInt(i["babies"])
        }
      }
    }
    var obj = {};
    for (let i in arr1) {
      obj.x = i + " GMT";
      obj.y = arr1[i];
      arr2.push(obj);
      obj = {};
    }
    return arr2;
  }
  process2(json) {
    let arr1 = {};
    let arr2 = [];
    for (let i of json) {
      var shortDateStr = i["country"];
      var longDateStr = moment(i["arrival_date_day_of_month"] + " " + i["arrival_date_month"] + " " + i["arrival_date_year"], 'D MMMM YYYY').format('MM/DD/YYYY');
      if (longDateStr >= moment(this.state.date[0].startDate).format('MM/DD/YYYY') && longDateStr <= moment(this.state.date[0].endDate).format('MM/DD/YYYY')) {
        if (arr1.hasOwnProperty(shortDateStr)) {
          arr1[shortDateStr] += parseInt(i["children"]) + parseInt(i["adults"]) + parseInt(i["babies"])
        } else {
          arr1[shortDateStr] = parseInt(i["children"]) + parseInt(i["adults"]) + parseInt(i["babies"])
        }
      }

    }
    var obj = {};
    for (let i in arr1) {
      obj.x = i;
      obj.y = arr1[i];
      arr2.push(obj);
      obj = {};
    }
    return arr2;
  }
  process3(json) {
    let arr1 = {};
    let arr2 = [];
    let sum = 0;
    for (let i of json) {
      var longDateStr = moment(i["arrival_date_day_of_month"] + " " + i["arrival_date_month"] + " " + i["arrival_date_year"], 'D MMMM YYYY').format('MM/DD/YYYY');
      if (longDateStr >= moment(this.state.date[0].startDate).format('MM/DD/YYYY') && longDateStr <= moment(this.state.date[0].endDate).format('MM/DD/YYYY')) {
        if (arr1.hasOwnProperty(longDateStr)) {
          arr1[longDateStr] += i["adults"];
        } else {
          arr1[longDateStr] = i["adults"];
        }
        sum += i["adults"];
      }

    }
    var obj = {};
    for (let i in arr1) {
      obj.x = i;
      obj.y = arr1[i];
      arr2.push(obj);
      obj = {};
    }
    return [sum, arr2, "Adults"];
  }
  process4(json) {
    let arr1 = {};
    let arr2 = [];
    let sum = 0;
    for (let i of json) {
      var longDateStr = moment(i["arrival_date_day_of_month"] + " " + i["arrival_date_month"] + " " + i["arrival_date_year"], 'D MMMM YYYY').format('MM/DD/YYYY');
      if (longDateStr >= moment(this.state.date[0].startDate).format('MM/DD/YYYY') && longDateStr <= moment(this.state.date[0].endDate).format('MM/DD/YYYY')) {
        if (arr1.hasOwnProperty(longDateStr)) {
          arr1[longDateStr] += i["children"];
        } else {
          arr1[longDateStr] = i["children"];
        }
        sum += i["children"];
      }

    }
    var obj = {};
    for (let i in arr1) {
      obj.x = i;
      obj.y = arr1[i];
      arr2.push(obj);
      obj = {};
    }
    return [sum, arr2, "Children"];
  }
  render() {
    console.log(this.state.date);
    return (
      <div className="screen">
        <div className='header'>
        <div className='selector'>
          <DateRange
            editableDateInputs={true}
            onChange={item => {
              console.log(moment(item.selection.startDate).toDate())
              console.log(moment(item.selection.endDate).toDate())
              this.setState({
                date: [{
                  startDate: moment(item.selection.startDate).toDate(),
                  endDate: moment(item.selection.endDate).toDate(),
                  key: 'selection'
                }],
                loading: true
              });
            }

            }
            className="selector"
            showPreview={true}
            minDate={moment({
              year: 2015, month: 6, day: 1
            }).toDate()}
            maxDate={moment({
              year: 2015, month: 7, day: 10
            }).toDate()}
            moveRangeOnFirstSelection={false}
            ranges={this.state.date}
          />
        </div>
        </div>
        
        <div className="grid-wrapper">
          <div className="grid" id='q'>
            {!this.state.loading ? <TimeSeries yas={this.state.combine1} /> : <div className="rep"><img class="loading" src={loading}></img></div>}
          </div>
          <div className="grid" id='w'>
            {!this.state.loading ? <Column yas={this.state.combine2} /> : <div className="rep"><img className="loading" src={loading}></img></div>}
          </div>
          <div className="grid" id='e'>
            {!this.state.loading ? <Sparkline yas={this.state.combine3} /> : <div className="rep"><img className="loading" src={loading}></img></div>}
          </div>
          <div className="grid" id='r'>
            {!this.state.loading ? <Sparkline yas={this.state.combine4} /> : <div className="rep"><img className="loading" src={loading}></img></div>}
          </div>
        </div>
      </div>

    )
  }
}