import React from 'react';

const Answer = ({answer}: {answer: any}) => {
    return (
        <div className="mt-2 mb-4 font-medium">
        <span className="font-bold underline">Answer:</span>{" "}
        {typeof answer === "boolean" ? (answer ? "Yes" : "No") : answer}
      </div>
    );
};

export default Answer;