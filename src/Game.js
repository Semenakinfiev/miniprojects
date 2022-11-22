import React from 'react';

function Game({ step, question, changeStep, questions }) {

  const persent = Math.round((step / questions.length) * 100);

    return (
      <>
        <div className="progress">
          <div style={{ width: `${persent}%` }} className="progress__inner"></div>
        </div>
        <h1>{question.title}</h1>
        <ul>
            {
            question.variants.map((text, index) => <li onClick={() => changeStep(index)} key={index}> {text} </li>)
            }
        </ul>
      </>
    );
  }

  export default Game;