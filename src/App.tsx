// @ts-nocheck
import { useState, useEffect } from 'react'
import './App.css'
import Web3 from 'web3';
import { contractABI, contractAddress } from './constants/contract';


function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [recieverAccount, setRecieverAccount] = useState("");
  const [sendValue, setSendValue] = useState("");
  const [airdropAccount, setAirdropAccount] = useState("");
  const [airdropValue, setAirdropValue] = useState("");
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(async () => {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            setContract(contractInstance);
            console.log(contractInstance);

            const accounts = await web3Instance.eth.getAccounts();
            setAccount(accounts[0]);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        alert('Please install an another Ethereum wallet.');
      }

    }
    connectWallet();
  }, [])

  const handleSend = async () => {
    if (window.ethereum) {
      try {
        const val = sendValue + "000000000000000000";
        const res = await contract.methods.transfer(recieverAccount, val).send({ from: account })
        console.log(res);
      } catch (err) {
        console.log("error while sending money: ", err);
      }
    } else {
      alert('Please connect an Ethereum wallet.');
    }
  }
  const handleAirDrop = async () => {
    if (window.ethereum) {
      try {
        if (airdropValue > 10) {
          alert("Can't airdrop more than 10 tokens!!");
          return;
        }
        console.log(airdropAccount);
        const val = airdropValue + "000000000000000000";
        const incSupply = await contract.methods.airDrop(airdropAccount, val).send({ from: account });
        console.log("Inc supply : ", incSupply);
      } catch (err) {
        console.log("error while sending money: ", err);
      }
    } else {
      alert('Please connect an Ethereum wallet.');
    }
  }


  return (
    <>
      <div className='page'>
        <div className='wallet-address-section'>
          Wallet Address : {account}
        </div>
        <div className='heading'>Transfer Tokens to someone</div>
        <div>
          <div className='transfer-address'>
            Transfer to :
            <span>
              <input
                onChange={(e) => setRecieverAccount(e.target.value)}
                type='text'
                className='transfer-address-input'
                value={recieverAccount}
                placeholder='Enter reciever account'
              />
            </span>
          </div>
          <div className='amount-transfer'>
            Amount to transfer :
            <span>
              <input
                className='amount-transfer-input'
                onChange={(e) => {
                  const val = e.target.value;
                  setSendValue(val)
                }}
                type='text'
                value={sendValue}
                placeholder='Enter account to send'
              />
            </span>
          </div>
          <div
            className='send-token'
            onClick={() => { handleSend() }}
          >
            <div
              className='send-token-button'
            >
              Send
            </div>
          </div>
        </div>
        <div className='heading'>Air Drop Tokens</div>
        <div>
          <div className='transfer-address'>
            AirDrop to :
            <span>
              <input
                onChange={(e) => setAirdropAccount(e.target.value)}
                type='text'
                className='transfer-address-input'
                value={airdropAccount}
                placeholder='Enter reciever account'
              />
            </span>
          </div>
          <div className='amount-transfer'>
            Amount to air drop :
            <span>
              <input
                className='amount-transfer-input'
                onChange={(e) => {
                  const val = e.target.value;
                  setAirdropValue(val)
                }}
                type='text'
                value={airdropValue}
                placeholder='Enter account to send'
              />
            </span>
          </div>
          <div
            className='send-token'
            onClick={() => { handleAirDrop() }}
          >
            <div
              className='send-token-button'
            >
              Air Drop
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
