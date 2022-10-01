const Web3=require("web3");
const abi=require("./abi.json");
const web3 = new Web3('https://api.s0.ps.hmny.io');
const express = require('express');
const ethers=require("ethers");
const app = express();
const cors=require("cors");
const port = 4200||process.env.PORT;
app.use(cors({
origin:"*",
}));
SC_ADDRESS="0xdAca95f03C79a091120b4eb0F5d52CB025b4544c";

const wallet = ethers.Wallet.fromMnemonic("burst burden skate laugh lens must grab short income worry legal dress");
const ucpism = new web3.eth.Contract(abi, SC_ADDRESS);
ucpism.methods.idexist("pranjal@ucpi").call(function (err, res) {
    if (err) {
      console.log("An error occured", err);
      return
    }
    console.log("The balance is: ", res);
  });
app.get("/createid",async(req,res)=>{
var id=req.query.id;
var address=req.query.address;
var sign=req.query.sign;
var walletname=req.query.walletname;
var sellprice=req.query.price;
var erc20="0x2f6C225aF5026d36362ef092d9FD44D4cF08dbb0";
var tx=ucpism.methods
  .createid(id,"ucpi",address,walletname,sign,sellprice);
 const gas=await tx.estimateGas({from:erc20});
  const signT=await web3.eth.accounts.signTransaction({
  to:SC_ADDRESS,
  data:tx.encodeABI(),
  gas
  },
  wallet.privateKey);
const rec=await web3.eth.sendSignedTransaction(signT.rawTransaction).then(data=>{
  console.log(data)
  return res.send(data);
}
);

})
app.listen(port);