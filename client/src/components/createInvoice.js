import React from "react";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { toast } from "react-toastify/dist/react-toastify";

export default function CreateInvoice() {
  const [buyerPan, setBuyerPan] = useState("");
  const [amount, setAmount] = useState(0);
  const [numOfSellers, setNumofSellers] = useState(0);
  const [sellerList, setSellerList] = useState(
    Array.from(new Array(numOfSellers)).map((_) => "")
  );
  let arr = [];
  for (let i = 0; i < numOfSellers; i++) {
    arr.push(i);
  }
  let initialState = {};

  arr.forEach((element) => {
    initialState[element] = "";
  });

  const [input, setInput] = useState(initialState);
  let inputName = 0;

  const {
    state: { contract, accounts },
  } = useEth();

  const handleSubmit = async () => {
    try {
      console.log(sellerList);
      const res = await contract.methods
        .storeData(buyerPan, sellerList, amount)
        .send({ from: accounts[0] });
      console.log(res);
      toast.success("Invoice Created");
    } catch (err) {
      console.log("error", err);
      toast.error("Error in Creating Proposal !!");
    }
  };

  const handleUserInputChange = (e) => {
    const name = e.target.name;
    const newValue = e.target.value;

    let newSellerList = sellerList;
    newSellerList[name - 1] = newValue;
    setInput({ [name]: newValue });
    setSellerList(newSellerList);
  };
  const OptionInput = arr.map((number) => {
    inputName++;

    return (
      <div>
        <div>
          <p>Seller {number + 1} </p>
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="option"
            name={inputName}
            onChange={handleUserInputChange}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="createInvoice">
      <h1>Create Invoice</h1>
      <div>
        <input
          type="text"
          placeholder="Buyer's PAN"
          className="input"
          onChange={(e) => setBuyerPan(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Number of sellers"
          className="input"
          onChange={(e) => {
            setNumofSellers(e.target.value);
            // OptionInput();
          }}
        />
      </div>

      {OptionInput}
      <input
        type="text"
        pattern="[0-9]*"
        placeholder="Amount"
        className="input"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={handleSubmit} className="button">
        Create Invoice
      </button>
      <hr
        style={{
          height: "1px",
          backgroundColor: "black",
          margin: "10px",
          width: "100%",
        }}
      />
    </div>
  );
}
