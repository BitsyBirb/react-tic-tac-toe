//Point of this is just to learn and practice a bit more aobut react.
// Guide: https://react.dev/learn/tutorial-tic-tac-toe

// Will review "Describing the UI" and take notes after
// Documentation: https://react.dev/learn/describing-the-ui

// Setup: Gives starting point to follow tutorial

// Overview: Teaches fundamentals of react including:
//  Components, props, and state.

//  Completing the game: Teaches fundamental design concepts and procedures.

// Adding time travel: Teaches more about states im guessing. React stuff

// I like to use semicolons as part of the styling. Whatever.

// This thing will be used in App.js if I'm not mistaken. 
import {useState} from 'react'; 

function Square{{CSSMathValue, onSquareClick}}{
    return(
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}