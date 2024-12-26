import React from "react";

const Blob = ({
  width = 400,
  height = 400,
  primaryColor = "#8e44ad",
  secondaryColor = "#9b59b6",
  tertiaryColor = "#7d3c98",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        filter: "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4))",
        animation: "blob-morph 10s ease-in-out infinite",
      }}
    >
      <defs>
        <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={tertiaryColor} />
        </linearGradient>
      </defs>
      <path
        fill="url(#blob-gradient)"
        d="M380.5,285.5Q293,371,146.5,285.5Q0,200,146.5,114.5Q293,29,380.5,114.5Q468,200,380.5,285.5Z"
      />
      <style jsx>{`
        @keyframes blob-morph {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(-50%, -50%) scale(1.05) rotate(5deg);
          }
          66% {
            transform: translate(-50%, -50%) scale(0.95) rotate(-5deg);
          }
        }
      `}</style>
    </svg>
  );
};

export default Blob;
