import "./App.css";

function App() {
  return (
    <div style={{ width: "300px", padding: "20px", textAlign: "center" }}>
      <h1>SustAIn</h1>
      <button
        onClick={() => {
          alert("SustAIn is running!");
        }}
      >
        Test Popup
      </button>
    </div>
  );
}

export default App;
