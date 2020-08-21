import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import Button from "@bit/reactstrap.reactstrap.button";

import "./index.css";
import "./style.sass";

class Example extends React.Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
        />

        <Button>左側</Button>
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// class Squarsse extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: null,
//     };
//   }
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "✖" : "○";
    // square[i] = "X";

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
  debugobject(i) {
    return <debug>{JSON.stringify(this.state)}</debug>;
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner" + winner;
    } else {
      status = "Next Player" + (this.state.xIsNext ? "✖" : "○");
    }

    // const status = "Next player:" + (this.state.xIsNext ? "✖" : "○");
    return (
      <div>
        {/* <div>{this.debugobject()}</div> */}
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <Example />
        <div
          style={{
            width: 400,
          }}
        ></div>
      </div>
    );
  }
}

function tick(params) {
  const nowtime = (
    <div>
      <h1>こんにちは世界</h1>
      <p>
        今は
        <span>{moment().format("YYYY-MM-DD HH:mm:ss")}</span> だよ
      </p>
      <p contenteditable="true"> カキクケコ</p>
    </div>
  );
  ReactDOM.render(nowtime, document.getElementById("nowtimes"));
}
setInterval(() => {
  tick();
}, 10);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
