import "./App.css";
import Select from "react-select";
import { useEffect, useState } from "react";

function App() {
  const [select, setSelected] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [menampilkan, setMenampilkan] = useState(false);

  const getBerry = async () => {
    const berryapi = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berryapi.json();
    let result = value.results.map((data) => {
      return {
        value: data.name,
        label: data.name,
      };
    });
    setSelected(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
    getBerry();
  }, []);

  const handleSubmit = () => {
    setMenampilkan((state) => !state);
  };

  const handleChange = (value) => {
    setSearchData(value);
  };
  return (
    <div className="App">
      <h1>{menampilkan ? searchData : ""}</h1>
      <button onClick={() => handleSubmit()} disabled={!searchData}>
        {menampilkan ? "Hide Button" : "Show Values"}
      </button>
      <br />
      <br />
      <Select options={select} onChange={(e) => handleChange(e.value)}></Select>
    </div>
  );
}

export default App;
