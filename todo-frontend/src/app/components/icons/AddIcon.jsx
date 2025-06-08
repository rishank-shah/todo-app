function AddIcon({ size = 20, color = "white", bgColor = "red" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="11"
        stroke={color}
        strokeWidth="2"
        fill={bgColor}
      />

      <line
        x1="12"
        y1="7"
        x2="12"
        y2="17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="12"
        x2="17"
        y2="12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default AddIcon;
