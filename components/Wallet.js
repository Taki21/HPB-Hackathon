import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connectors";
import { useEffect } from "react";

const Wallet = () => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function connect() {
        try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', true)
        } catch (ex) {
            console.log(ex)
        }
      }
    
    async function disconnect() {
        try {
            deactivate()
            localStorage.setItem('isWalletConnected', false)
        } catch (ex) {
            console.log(ex)
        }
    }

    async function handleConnect() {
        if (active) {
            disconnect()
        } else {
            connect()
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                try {
                    await activate(injected)
                    localStorage.setItem('isWalletConnected', true)
                } catch (ex) {
                    console.log(ex)
                }
            }
        }
        connectWalletOnPageLoad()
    }, [])

    return (
        <>
            <button onClick={handleConnect} className="py-2 text-sm text-white rounded-lg w-36 bg-[#B98F61] hover:bg-[#a27e56] transition-all">{active ? account.substring(0,5)+"..."+account.substring(account.length-4, account.length) : "Connect to Wallet"}</button>
        </>
    )
}

export default Wallet