import { useState, useEffect } from "react";

function DropDown() {
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          "https://staticdata.dev/v1/programming-languages.json",
        );
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        console.error("Error fetching languages:", err);
      }
    };
    fetchLanguages();
  }, []);
  return (
    <>
      <select
        name="languages"
        id="languages"
        style={{
          width: "100%",
          padding: "10px",
          border: "2px solid #000",
          borderRadius: "10px",
        }}
      >
        {languages.map((lang, key) => (
          <option value={lang.name} key={key}>
            {lang.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropDown;
