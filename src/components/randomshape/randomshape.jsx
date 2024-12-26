import React from "react";
import "./randomshape.css";

const RandomShape = () => {
  return (
    <>
      <div className="random-shapes">
        {Array.from({ length: 14 }).map((_, index) => {
          const shapeType =
            index % 3 === 0
              ? "circle"
              : index % 3 === 1
              ? "square"
              : "triangle";
          const rotation = Math.floor(Math.random() * 360);
          return (
            <div
              key={index}
              className={`random-shape ${shapeType}`}
              style={{
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
                transform: `rotate(${rotation}deg)`,
              }}
            ></div>
          );
        })}
      </div>
    </>
  );
};

export default RandomShape;
