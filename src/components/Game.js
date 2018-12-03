import React from 'react';
import './Game.css';

function Square(props) {

  const winningSquaresStyle = {
    backgroundColor: 'lightpink'
  };

  console.log(props.winningSquares);
  

  return (
    <button key={props.index} className="square" onClick={props.onClick}
    style={props.winningSquares ? winningSquaresStyle : null}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    let winningSquares = this.props.winner && this.props.winner.includes(i) ? true : false;
    return (
    <Square
      key={i} 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      winningSquares = {winningSquares}
      />
    );
  }

  

  render() {
    const numeros = [0,1,2,3,4,5,6,7,8];
    return (
      <div>
          {numeros.map((value, index) => {
            if (index === 2 || index === 5) return <div key={index} className="board-row">{this.renderSquare(index)}</div>
            else return this.renderSquare(index)
          })}
      </div>
    );
  }
}

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
      //retorna el ganador 'X' o 'O'
      //y convertimos la respuesta de la funcion en un objeto
      return {
        winner: squares[a],
        winningSquares: lines[i]
      }
    }
  }
  //retorna null por lo que no se anuncia ningun ganador
  return null;
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      ascendingOrder: true,
    };
  }

  toggleOrder() {
    this.setState({ascendingOrder: !this.state.ascendingOrder})
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        clicked: i
      }]),
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
      
      const desc = move ? `Go to move # ${move} 
      en la posicion (${(step.clicked%3)+1}, ${Math.trunc(step.clicked/3) + 1}) ` : `Go to game start`;
    
      return (
        <div key={move}>
          <button id={this.state.stepNumber === move ? 'bold' : ''} className="btn btn-outline-info" onClick={() => this.jumpTo(move)}>{desc}</button>
        </div>
      );
    });

    if (!this.state.ascendingOrder) {
      moves.sort(function(a,b){
        return b.key - a.key;
      });
    }

    let status;

    if (winner) {
      status = 'Winner: ' + winner.winner;
    } 
    else if (this.state.stepNumber === 9){
      status = 'Draw';
    } 
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    console.log(this.state.stepNumber);

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={winner && winner.winningSquares}
          />
        </div>
        <div className="game-info">
          <h1><div className="borderStatus">{status}</div></h1>
          <button className="btn is-primary" onClick={() => this.toggleOrder()}>Ordenar</button>
          <div>{moves}</div>
        </div>
      </div>
      
    );
  }
}

export default Game;