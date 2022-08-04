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
            placeholder="option"
            // value={optionsList[inputName - 1]}
            pan={inputName}
            onChange={handleUserInputChange}
          />
        </div>
      </div>
    );
  });

  return (
    <div>
      <div>
        <h1>Create Invoice</h1>
        <input
          type="text"
          placeholder="Buyer's PAN"
          onChange={(e) => setBuyerPan(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of sellers"
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
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Create Invoice</button>
    </div>
  );
}
