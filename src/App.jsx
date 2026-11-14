import { useState } from "react";
import DropDown from "./components/Dropdown";
import Result from "./components/Result";

function App() {
  const [selectedLang, setSelectedLang] = useState("");
  return (
    <div className="container">
      <h1>GitHub Repository Finder</h1>
      <DropDown selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
      <Result selectedLang={selectedLang} />
    </div>
  );
}

export default App;
