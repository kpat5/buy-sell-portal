import { EthProvider } from "./contexts/EthContext";

import "./App.css";
import CreateInvoice from "./components/createInvoice";

function App() {
  return (
    <EthProvider>
      <div className="container">
        <CreateInvoice />
      </div>
    </EthProvider>
  );
}

export default App;
