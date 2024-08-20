// Okay so this file is the one I'm building from the ground up. Let's see how this goes.
// Importing the style sheet
import './MyGame.css';
import {useState} from 'react';

/* Five challenges
1) For the current move only, show “You are at move #…” instead of a button.
2) Rewrite Board to use two loops to make the squares instead of hardcoding them.
3) Add a toggle button that lets you sort the moves in either ascending or descending order.
4) When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
5) Display the location for each move in the format (row, col) in the move history list.
*/

// Square component to let us update stuff
// passing value prop, thats what {} means when passing props
function Square({value, onSquareClick}){
    // make a function to handle a click and update the square to change into something
    // Value is the prop's state, we can set it using the use state functionality. 
    // Look into destructuring

    // Every time we click a button, we re-render the button to update its state value
    return(
        <button 
        className="square"
        onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

// Starting with the square function
// Initial version just uses the style of "square" and then it'll just print it out with an x

// App.js 
// index.js
// styles.cc

// Export just lets this function be used outside of the file
// Default defines it as the main function of the file
// function is function.
function Board({xIsNext, squares, onPlay}){
    // Return just returns whatever comes after it.
    // In this case it returns a <button> which is a JSX element. 
    // JSX Elemetns are a combination of JS code and HTML tags that describe what we wanna display.

    // className is a button prop and it tells css how to style the button itself
    // x is the text displayed inside of the button and then anythingafter the </button> just isnt placed into hte button
    // Not hte most complex. Not sure why this is important at all.

    // Note that react components need to return a single JSX element and not multiple adjacent elements.
    // We can use fragments like <> and </> to wrap multiple adjacent elements together and just return that.

    // To keep track of who's going
    //const[xIsNext, setXIsNext] = useState(true); // x is next first

    // We are going to create an array of square states so tehy can communicate with one another
    // and keep ecah other in sync wit hthe parent board itself
    //const[squares, setSquares] = useState(Array(9).fill(null)); // Just sets an array of size 9 full of nulls.
    // Declared as a state variable thanks to useState and squares refers to that state variable
    // pass it down to each square that we render. same for a function

    // let player know whats going on
    const winner = calculateWinner(squares); // Note that nothing gets altered here so calling it is safe.
    let status; 
    if(winner){
        status = "Winner: " + winner;
    }else{
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    // i is the value of the square we want to change
    function handleClick(i){
        // Check if the spot is vacant or not (recall that we set things to null by default)
        if(squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice(); // What does slice do?
        // Makes a copy of something so we can store it for the new set. pretty interesting.
        // Rerenders children components too as soon as we're done with updating stuff.
        nextSquares[i] = xIsNext ? 'X' : 'O';
        //setSquares(nextSquares); // set and rerender 
        //setXIsNext(!xIsNext); // Just invert it
        onPlay(nextSquares);
        // be careful when passing as a prop. If you pass it as a fucntion call, 
        // it'll rerender, which will then invoke it again when rendering, and you get the point
    }

    // JavaScript supports closures which means we can see outside of the scope of an inner function.
    // It's interesting. Shrimple enough. Think normal scoping but for functions as well.

    // REturn three rows of these things

    // Arrow functions: On a click we can render/run the function that comes after teh arrow
    // not sure how or why but screw it 

    // Immutability: ROllback and helps with optimizing renders/rerenders. 
    return(
        <>
        <div className="status">{status}</div>
        <div className="board-row" style={{padding: 5}}>
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row" style={{padding: 5}}>
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row" style={{padding: 5}}>
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        </>
    );
}

// Just calculates if there's a winner. 
// Fairly simple function. Don't worry too much about it 
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // To store the history of the game itself.
  // Thanks to immutability, we can! Yippee!

  export default function Game(){
    // Then we gotta map the history of our moves to display them to our console.
    // Can map using an arrow function that takes an argument and mutates things. kinda neat no?
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;

    const currentSquares = history[currentMove]; // just gest the most recent square setup

    function handlePlay(nextSquares){
        // Todo
        const nextHistory=[...history.slice(0, currentMove+1), nextSquares]
        // make new array with all items in histroy + nextSquares
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length-1);
    };

    function jumpTo(nextMove){
        // TODO
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move === history.length-1){
            description = "You are at move #" + move;
        }
        else if(move > 0){
            description = "Go to move #" + move;
        }else{
            description = "Go to game start";
        }
        return (
            // Note that with lists, react checks previous lists to current lists and checks keys
            // to see if a re render, destruction, or consistent render are necessary.
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return(
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
  }