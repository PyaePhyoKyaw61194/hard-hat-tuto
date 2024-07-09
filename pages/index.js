import { useState } from 'react'
import CounterContract from "./../artifacts/contracts/Counter.sol/Counter.json";
import { ethers } from "ethers";

const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const abi = CounterContract.abi;

export default function App() {
    const [connectButton, setConnectButton] = useState("Connect")

    const handleConnect = async () => {

        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectButton("Connected")
        } else {
            setConnectButton("Please install MetaMask")
        }
    }

    const getCount = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);

            try {
                const data = await contract.get();
                console.log("data: ", data.toNumber());
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div>
            <button onClick={handleConnect}>{connectButton}</button>
            <button onClick={getCount}>Get Count</button>

        </div>
    )
}