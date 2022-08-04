import React from "react";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth";
import { toast } from "react-toastify/dist/react-toastify";

export default function GetData() {
  const [buyerPan, setBuyerPan] = useState("");
  const [showDetails, setDetails] = useState();
  const {
    state: { contract, accounts },
  } = useEth();
  var obj;
  var st;
  const handleStatBut = async (props) => {
    try {
      const res = await contract.methods
        .setTransacToPaid(buyerPan, props)
        .send({ from: accounts[0] });
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleSubmit = async () => {
    try {
      const res = await contract.methods
        .getInfo(buyerPan)
        .send({ from: accounts[0] });

      obj = res.events.buyerDetails.returnValues.buyDetails;
      setDetails(
        obj?.map((arr) => {
          var s = arr.status;
          if (s == 0) {
            st = "Not Paid";
          } else if (s == 1) {
            st = "Payment is in progress";
          } else if (s == 2) {
            st = "Paid";
          }
          return (
            <>
              <div className="details">
                <h1 className="heading">Invoice {arr.id}</h1>
                <div className="data">
                  <h2>Seller's PAN/s:</h2>
                  {arr.sellPan.map((pan) => {
                    return <h3>{pan}</h3>;
                  })}
                  <h2>Amount:</h2>
                  <h3>{arr.totAmount}</h3>
                  <h2>Date:</h2>
                  <h3>
                    {new Date(arr.dateStamp * 1000).toLocaleDateString("en-US")}
                  </h3>
                  <h2>Payment Status:</h2>
                  <h3>{st}</h3>
                </div>
                {/* <div>
                {stat != "PAID" ? (
                  <button onClick={handleStatBut(arr.id)}>Set to Paid</button>
                ) : (
                  <></>
                )}
              </div> */}
              </div>
            </>
          );
        })
      );
      //   console.log(obj[0].id);
      toast.success("Invoice Created");
    } catch (err) {
      console.log("error", err);
      toast.error("Error");
    }
  };

  //   console.log(res);
  //   const showDetails ()=> {
  //     const obj = await res.events.buyerDetails.returnValues.buyDetails;
  //     console.log(obj);
  //     for (var i = 0; i < obj.length; i++) {
  //       return (
  //         <div>
  //           <h2>Invoice {i + 1}</h2>
  //         </div>
  //       );
  //     }
  //   };

  return (
    <div className="createInvoice">
      <h1>Enter Buyer's PAN to get details</h1>
      <input
        type="text"
        placeholder="Buyer's PAN"
        className="input"
        onChange={(e) => setBuyerPan(e.target.value)}
      />
      <button onClick={handleSubmit} className="button">
        Get data
      </button>

      {showDetails}
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
