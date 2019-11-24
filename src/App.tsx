import React, { useCallback, useEffect, useRef, useState } from "react";

const board = Array(23).fill(Array(23).fill(0));

console.log(board);

function generateBlankString(width: number, height: number, xy: XY) {
  let stringValue = "";
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (j === xy.x && i === xy.y) {
        stringValue += "+";
      } else {
        stringValue += " ";
      }
    }
    stringValue += `\n`;
  }
  return stringValue;
}

type DrawingStyle = "none" | "box" | "line";

type XY = {
  x: number;
  y: number;
};

type ButtonBarProps = {
  drawingStyle: DrawingStyle;
  setDrawingStyle(drawingStyle: DrawingStyle): void;
};

type ButtonBarButtonProps = ButtonBarProps & {
  label: string;
  drawingStyle: DrawingStyle;
  isActive: boolean;
  setDrawingStyle(drawingStyle: DrawingStyle): void;
};

type Line = {
  points: XY[] 
}

type Box = {
  topLeft: XY,
  bottomRight: XY,
  content: string
}

function ButtonBarButton({
  setDrawingStyle,
  drawingStyle,
  label,
  isActive
}: ButtonBarButtonProps) {
  const handleClick = useCallback(() => {
    setDrawingStyle(drawingStyle);
  }, [drawingStyle, setDrawingStyle]);

  return (
    <button
      className={isActive ? "active" : "inactive"}
      type="button"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}

function ButtonBar({ drawingStyle, setDrawingStyle }: ButtonBarProps) {
  return (
    <div className="ButtonBar">
      <ButtonBarButton
        setDrawingStyle={setDrawingStyle}
        label="None"
        isActive={drawingStyle === "none"}
        drawingStyle="none"
      />
      <ButtonBarButton
        setDrawingStyle={setDrawingStyle}
        label="Box"
        isActive={drawingStyle === "box"}
        drawingStyle="box"
      />
      <ButtonBarButton
        setDrawingStyle={setDrawingStyle}
        label="Line"
        isActive={drawingStyle === "line"}
        drawingStyle="line"
      />
    </div>
  );
}

const App: React.FC = () => {
  const [width] = useState(100);
  const [height] = useState(50);

  const [drawingStyle, setDrawingStyle] = useState<DrawingStyle>("none");
  const ref = useRef<HTMLElement>(null);

  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(generateBlankString(width, height, xy));

  useEffect(() => {
    setValue(generateBlankString(width, height, xy));
  }, [xy, height, width]);

  return (
    <div className="App">
      <ButtonBar
        drawingStyle={drawingStyle}
        setDrawingStyle={setDrawingStyle}
      />
      <pre>
        <code
          ref={ref}
          onMouseMove={e => {
            if (ref === null || ref.current === null) {
              return;
            }

            const refRect = ref.current.getBoundingClientRect();

            const left = e.clientX - refRect.left;
            const top = e.clientY - refRect.top;

            const newX = Math.floor((width * left) / refRect.width);
            const newY = Math.floor((height * top) / refRect.height);
            setXY({ x: newX, y: newY });
          }}
        >
          {value}
        </code>
      </pre>
    </div>
  );
};

export default App;
