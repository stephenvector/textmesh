import React from "react";
import { BoxProvider } from "./BoxContext";
import Whiteboard from "./Whiteboard";
import BoxesList from "./BoxesList";

const App: React.FC = () => {
  return (
    <BoxProvider>
      <Whiteboard />
      <BoxesList />
    </BoxProvider>
  );
};

export default App;
