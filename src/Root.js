import React from 'react';

import Counter from './Counter';
import Counter2 from './Counter2';
// import $ from "jquery";

var $ = require('jquery');
var clima = "http://api.openweathermap.org/data/2.5/forecast?q=Mexico%20City,MX&appid=241fc796645b95e7f50bca33021580d2&lang=ES&units=metric";


// function Root() {
//     return React.createElement(
//         'h1',
//         null,
//         'Root component'//,
//         //React.createElement(
//         //    Counter
//         // )
//     );
// }

// const Root = () => {
//     return React.createElement(
//         'h1',
//         null,
//         'Root component'//,
//         //React.createElement(
//         //    Counter
//         // )
//     );
// }

/* const Dummy = React.createClass({
  componentDidMount() {
    alert('didMount');
  },
  render(){
    return(
      <div>Componente al vuelo</div>
    );
  }
}); */

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      aux: 0
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState((previousState) => {
      return {
        time: new Date(),
        aux: previousState.aux + 1
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.time.toLocaleTimeString()}.</h2>
        <h2>Seconds while you open the page {this.state.aux}</h2>
      </div>
    );
  }
}

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoaded: false,
      city: null,
      data: []
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log("tick!");

    $.getJSON(clima, (d) => {
      this.setState({
          isLoaded: true,
          city: d.city.name,
          data: d.list
      })
    })
  }

  render() {
    const { isLoaded, data, city } = this.state;

    if (isLoaded) {
      var x = Object.values(data).map((type) => {
        console.log(type)
        return <div>
                  <h4>Date: {type.dt_txt} Temperature: {type.main.temp} &deg;C will be {type.weather[0].main}</h4>
               </div>
      })
      return (
        <div>
          <h2>City: {city}</h2>
          <p>{x}</p>
        </div>
      );
    } else {
      return(
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }
  }

}

function Root() {
    return (
        <section>
            <h1>Root component</h1>
            <Counter />
            <Counter2 />
            <Clock />
            <Weather />
        </section>
    );
}

export default Root;
