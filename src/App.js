import "./App.css";
import { PropertyGrid } from "./Components/PropertyGrid/PropertyGrid";
import { InputForm } from "./Components/InputForm/InputForm";
import { AppHeader } from "./Components/Header";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <InputForm />
      <PropertyGrid />
    </div>
  );
}

export default App;
