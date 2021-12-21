import React from "react";
import './Clock.css'

let timer = null;
class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerMin: 25,
      timerSec: "00",
      start: false,
      session: true
    };
    this.handleBreak = this.handleBreak.bind(this);
    this.handleSession = this.handleSession.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleBreak(e) {
    if (e.target.value === "increase") {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    } else if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  handleSession(e) {
    if (e.target.value === "increase") {
      this.setState({
        sessionLength: this.state.sessionLength + 1
      });
      if (this.state.start === false) {
        this.setState({
          timerMin: this.state.sessionLength + 1
        });
      }
    } else if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1
      });

      if (this.state.start === false) {
        this.setState({
          timerMin: this.state.sessionLength - 1
        });
      }
    }
  }

  handleStart() {
    if (this.state.start === false) {
      this.timer = setInterval(() => {
        if (this.state.timerMin > 0 || this.state.timerSec !== "00") {
          if (this.state.timerSec === "00") {
            this.setState({
              timerMin: this.state.timerMin - 1,
              timerSec: 59
            });
          } else {
            this.setState({
              timerSec: this.state.timerSec - 1
            });
            if (this.state.timerSec < 10) {
              this.setState({
                timerSec: "0" + this.state.timerSec
              });
            }
          }
        } else {
          if (this.state.session === true) {
            this.setState({
              timerMin: this.state.breakLength,
              session: false
            });
          } else {
            this.setState({
              timerMin: this.state.sessionLength,
              session: true
            });
          }
        }
      }, 1000);
    } else {
      clearInterval(this.timer);
    }

    this.state.start = !this.state.start;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleReset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerMin: 25,
      timerSec: "00",
      start: false,
      session: true
    });
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <h1>25+5 Clock</h1>
        <div class="container">
          <div id="break-label">
            <p>Break Length</p>

            <div class="break">
              <button
                id="break-increment"
                onClick={this.handleBreak}
                value={"increase"}
              >
                🔺
              </button>
              <p id="break-length">{this.state.breakLength}</p>
              <button
                id="break-decrement"
                onClick={this.handleBreak}
                value={"decrease"}
              >
                🔻
              </button>
            </div>
          </div>

          <div id="session-label">
            <p>Session Length</p>
            <div class="break">
              <button
                id="session-increment"
                onClick={this.handleSession}
                value={"increase"}
              >
                🔺
              </button>
              <p id="session-length">{this.state.sessionLength}</p>
              <button
                id="session-decrement"
                onClick={this.handleSession}
                value={"decrease"}
              >
                🔻
              </button>
            </div>
          </div>
        </div>

        <div id="timer-label">
          {this.state.session && <h3>Session</h3>}
          {!this.state.session && (
            <h3>
              <strong>Break Time</strong>
            </h3>
          )}
          <h2 id="time-left">
            {this.state.timerMin} : {this.state.timerSec}
          </h2>
          <button id="start_stop" onClick={this.handleStart}>
            ⏯
          </button>
          <button id="reset" onClick={this.handleReset}>
            🔁
          </button>
        </div>
      </div>
    );
  }
}

export default Clock;