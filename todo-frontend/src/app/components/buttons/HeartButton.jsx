import { useState } from "react";
import HeartIcon from "../icons/HeartIcon";

const HeartButton = ({ onClick, filled }) => {
  const [hovered, setHovered] = useState(false);

  const style = {
    display: "inline-block",
    background: "none",
    border: "none",
    padding: "0.5rem",
    cursor: "pointer",
    transition: "transform 0.2s ease",
    transform: hovered ? "scale(1.3) rotate(15deg)" : "scale(1)",
  };

  return (
    <button
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <HeartIcon filled={filled} />
    </button>
  );
};

export default HeartButton;
