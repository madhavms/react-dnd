import DragNDrop from "./components/DragNDrop";
import "./App.css";

const data = [
  { title: "Group 1", items: ["1", "2", "3"] },
  { title: "Group 2", items: ["4", "5"] },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data}/>
      </header>
    </div>
  );
}

export default App;
