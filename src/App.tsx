import { useState } from "react";
import "./App.css";
import Layout from "./Layout";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-full ">
      <Layout />
    </div>
  );
};

export default App;
