import { useState } from "react";
import "./styles.css";

const data = {
  prompt: "",
  temperature: 0.5,
  max_tokens: 64,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0
};

var newOne = true;

const t = async (e, setData, Data) => {
  e.preventDefault();
  var text = document.getElementById("Text").value;
  document.getElementById("Text").value = "";
  data.prompt = text;
  let response = await fetch(
    "https://api.openai.com/v1/engines/text-curie-001/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_SECRET}`
      },
      body: JSON.stringify(data)
    }
  )
    .then((res) => res.json())
    .then((res) => res.choices[0].text)
    .catch((err) => err.json());
  newOne = !newOne;
  setData([{ Prompt: text, Response: response }, ...Data]);
};
export default function App() {
  const [data, SetData] = useState([]);
  return (
    <div id="whole">
      <form onSubmit={(e) => t(e, SetData, data)}>
        <h1>Fun with AI</h1>
        <span>Enter prompt</span>
        <br />
        <textarea id="Text" />
        <br />
        <input id="submit" type="submit" value="Submit" />
      </form>
      <h2 style={{ width: "80%" }}>Response</h2>
      {data.map((each, index) => (
        <div className="item" key={newOne + index}>
          <span>Prompt:</span>
          <div className="content">{each.Prompt}</div>
          <span>Response:</span>
          <div className="content">{each.Response}</div>
        </div>
      ))}
    </div>
  );
}
