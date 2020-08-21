import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import Buttonssss from "@bit/reactstrap.reactstrap.button";

import ButtonToolbar from '@bit/react-bootstrap.react-bootstrap.button-toolbar';
import Button_Button from '@bit/react-bootstrap.react-bootstrap.button';
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

import "./index.css";
import "./style.sass";

class ReloadButton extends React.Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
        />

        <Buttonssss
          onClick={() => {
            window.location = "./";
          }}
        >
          リロード
        </Buttonssss>
        <ButtonToolbar>
				<Button_Button variant="primary" size="lg" active>
					Primary button
          </Button_Button>
				<Button_Button variant="secondary" size="lg" active style={{ marginLeft: 5 }}>
					Button
          </Button_Button>
			</ButtonToolbar>
      </div>
    );
  }
}


function Square(props) {
  return (
    <button variant="primary" size="lg" active className="square" onClick={props.onClick}>
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
  debugobject(i) {
    return <debug>{JSON.stringify(this.state)}</debug>;
  }
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const status = "Next player:" + (this.state.xIsNext ? "✖" : "○");
    return (
      <div>
        {/* <div>{this.debugobject()}</div> */}
        {/* <div className="status">{status}</div> */}
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
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <Button_Button class="m-4" variant="primary" size="md" active onClick={() => this.jumpTo(move)}>{desc}</Button_Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>

          <ol>{moves}</ol>
        </div>
        <ReloadButton />

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

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
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
