import { useState, useEffect } from 'react';
import CounterContract from "./../artifacts/contracts/Counter.sol/Counter.json";
import { ethers } from "ethers";

const contractAddress = "0xdE1FDB543E7168FAB574075cF00398526b2C9b07";
const abi = CounterContract.abi;

export default function App() {
    const [connectButton, setConnectButton] = useState("Connect");
    const [count, setCount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const initializeContract = async () => {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contractInstance = new ethers.Contract(contractAddress, abi, signer);
                setContract(contractInstance);
            } else {
                console.error("Ethereum object doesn't exist!");
            }
        };

        initializeContract();
    }, []);

    const handleConnect = async () => {
        if (typeof window.ethereum !== 'undefined') {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            setConnectButton("Connected");
        } else {
            setConnectButton("Please install MetaMask");
        }
    };

    const getCount = async () => {
        try {
            const data = await contract.get();
            setCount(data.toString());
        } catch (err) {
            console.log(err);
        }
    };

    const handleInc = async () => {
        try {
            const tx = await contract.inc();
            await tx.wait();
            await getCount();
        } catch (err) {
            console.log(err);
        }
    };

    const handleDec = async () => {
        try {
            const tx = await contract.dec();
            await tx.wait();
            await getCount();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={handleConnect}>{connectButton}</button>
            <button onClick={getCount}>Get Count</button>
            <button onClick={handleInc}>Inc</button>
            <button onClick={handleDec}>Dec</button>
            <hr />
            <h1>Count : {count}</h1>
        </div>
    );
}
