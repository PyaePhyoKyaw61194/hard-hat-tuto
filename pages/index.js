import { useState } from 'react'
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
    return (
        <div>
            <button onClick={handleConnect}>{connectButton}</button>
        </div>
    )
}