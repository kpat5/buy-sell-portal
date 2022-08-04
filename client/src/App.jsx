import { EthProvider } from "./contexts/EthContext";

import "./App.css";
import CreateInvoice from "./components/CreateInvoice";
import GetData from "./components/GetData";

function App() {
  return (
    <EthProvider>
      <div className="container">
        <CreateInvoice />
        <GetData />
      </div>
    </EthProvider>
  );
}

export default App;
