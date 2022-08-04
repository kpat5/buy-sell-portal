//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
contract buySell{

    struct invoice{
        uint id;
        string[] sellPan;
        uint256 totAmount;
        uint256 dateStamp;
        paymentStatus status;
        
    }

    event dataStored(string buyerPan,uint256 amount,uint256 timestamp);
    event buyerDetails(invoice[] buyDetails);

    enum paymentStatus{
        NOT_PAID,IN_PROGRESS,PAID
    }

    mapping(string=>invoice[]) private Invoices;

    function storeData(string calldata buyerPan,string[] calldata sellerPans,uint256 amount) external{
        invoice[] storage newInvoice=Invoices[buyerPan];
        invoice memory singleInvoice;
        singleInvoice.sellPan=new string[](sellerPans.length);
        if(newInvoice.length==0){
            singleInvoice.id=1;
        }
        else{
            singleInvoice.id=newInvoice.length+1;
        }
        for(uint i=0;i<sellerPans.length;i++)
        {
            singleInvoice.sellPan[i]=sellerPans[i];
        }       
        singleInvoice.sellPan=sellerPans;
        uint256 time=block.timestamp;
        singleInvoice.totAmount=amount;
        singleInvoice.dateStamp=time;
        singleInvoice.status=paymentStatus.NOT_PAID;
        emit dataStored(buyerPan,amount,time);
        newInvoice.push(singleInvoice);
    }

    function setTransacToProgress(string calldata buyerPan,uint256 id) external{
        require(Invoices[buyerPan][id].status==paymentStatus.NOT_PAID,"The transaction is already in progress or has been paid");
        Invoices[buyerPan][id].status=paymentStatus.IN_PROGRESS;
    }

    function setTransacToPaid(string calldata buyerPan,uint256 id) external{
        require((Invoices[buyerPan][id].status==paymentStatus.NOT_PAID)||(Invoices[buyerPan][id].status==paymentStatus.IN_PROGRESS),"The transaction has been paid already");
        Invoices[buyerPan][id].status=paymentStatus.PAID;
    }

    function getInfo(string calldata buyerPan) external returns(invoice[] memory)
    {
        require(Invoices[buyerPan].length!=0,"The buyer doesn't exist");
        emit buyerDetails(Invoices[buyerPan]);
        return Invoices[buyerPan];
    }
}