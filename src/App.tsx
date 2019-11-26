import React, { useCallback, useEffect, useRef, useState } from "react";

const board = Array(23).fill(Array(23).fill(0));

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
  startPoint: XY;
  endPoint: XY;
};

type Box = {
  startPoint: XY;
  endPoint: XY;
  content: string;
};

type CurrentlyDrawingItem = {
  line: Line | null;
  box: Box | null;
};

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

  const [isDrawing, setIsDrawing] = useState(false);
  const [currentlyDrawingItem, setCurrentlyDrawingItem] = useState<
    CurrentlyDrawingItem
  >({ line: null, box: null });

  const [drawingStyle, setDrawingStyle] = useState<DrawingStyle>("none");
  const ref = useRef<HTMLElement>(null);

  const [xy, setXY] = useState({ x: 0, y: 0 });
  const [value, setValue] = useState(generateBlankString(width, height, xy));

  useEffect(() => {
    let newValue = generateBlankString(width, height, xy);

    if (currentlyDrawingItem.box !== null) {
      for (
        let x = currentlyDrawingItem.box.startPoint.x;
        x <= currentlyDrawingItem.box.endPoint.x;
        x++
      ) {
        for (
          let y = currentlyDrawingItem.box.startPoint.y;
          y <= currentlyDrawingItem.box.endPoint.y;
          y++
        ) {
          let index = y * width + x;
          // newValue = [
          //   ...newValue.slice(0, index),
          //   "&#9618",
          //   ...newValue.slice(index + 1)
          // ];
        }
      }
    }

    if (currentlyDrawingItem.line !== null) {
    }

    setValue(newValue);
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
          onMouseDown={e => {
            setIsDrawing(true);

            if (ref === null || ref.current === null) {
              return;
            }

            const refRect = ref.current.getBoundingClientRect();

            const left = e.clientX - refRect.left;
            const top = e.clientY - refRect.top;

            const x = Math.floor((width * left) / refRect.width);
            const y = Math.floor((height * top) / refRect.height);

            if (drawingStyle === "box") {
              setCurrentlyDrawingItem({
                box: {
                  content: "",
                  startPoint: { x, y },
                  endPoint: { x, y }
                },
                line: null
              });
            } else if (drawingStyle === "line") {
              setCurrentlyDrawingItem({
                line: {
                  startPoint: { x, y },
                  endPoint: { x, y }
                },
                box: null
              });
            }
          }}
          onMouseUp={() => {
            setIsDrawing(false);
          }}
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

            if (isDrawing) {
              if (drawingStyle === "box" && currentlyDrawingItem.box !== null) {
                currentlyDrawingItem.box.endPoint = { x: newX, y: newY };
              } else if (
                drawingStyle === "line" &&
                currentlyDrawingItem.line !== null
              ) {
                currentlyDrawingItem.line.endPoint = { x: newX, y: newY };
              }
            }
          }}
        >
          {value}
        </code>
      </pre>
    </div>
  );
};

export default App;
