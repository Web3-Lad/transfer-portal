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
  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(async () => {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);

            const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
            setContract(contractInstance);

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


  return (
    <>
      <div className='page'>
        <div className='wallet-address-section'>
          Wallet Address : {account}
        </div>
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
            onClick={() => { handleSend(); console.log("Hi") }}
          >
            <div
              className='send-token-button'
            >
              Send
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
