import { useWeb3React } from "@web3-react/core"
import { injected } from "../components/wallet/connectors"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { WHPBVaultContract, WHPBABI } from "../components/contracts/WHPBVault"
import { USDTVaultContract, USDTABI } from "../components/contracts/USDTVault"
import { HPDVaultContract, HPDABI } from "../components/contracts/HPDVault"
import { ERC20 } from "../components/contracts/ERC20"

const Staking = () => {

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const [whpb, setWhpb] = useState(0)
    const [usdt, setUsdt] = useState(0)
    const [hpd, setHpd] = useState(0)

    const [whpbBalance, setWhpbBalance] = useState(0)
    const [usdtBalance, setUsdtBalance] = useState(0)
    const [hpdBalance, setHpdBalance] = useState(0)

    const [whpbStaked, setWhpbStaked] = useState(0)
    const [usdtStaked, setUsdtStaked] = useState(0)
    const [hpdStaked, setHpdStaked] = useState(0)

    async function approveWHPB() {
        
        const WHPB = new library.eth.Contract(ERC20, '0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31')
        await WHPB.methods.approve(WHPBVaultContract, ((BigInt((whpb * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function stakeWHPB() {
        const WHPBVault = new library.eth.Contract(WHPBABI, WHPBVaultContract)
        await WHPBVault.methods.stake(((BigInt((whpb * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function unstakeWHPB() {
        const WHPBVault = new library.eth.Contract(WHPBABI, WHPBVaultContract)
        await WHPBVault.methods.withdraw(((BigInt((whpb * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function approveUSDT() {
        const USDT = new library.eth.Contract(ERC20, '0xd378634119d2f7b3cf3d60e0b0f5e048e74ce3cf')
        await USDT.methods.approve(USDTVaultContract, ((BigInt((usdt * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function stakeUSDT() {
        const USDTVault = new library.eth.Contract(USDTABI, USDTVaultContract)
        await USDTVault.methods.stake(((BigInt((usdt * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function unstakeUSDT() {
        const USDTVault = new library.eth.Contract(USDTABI, USDTVaultContract)
        await USDTVault.methods.withdraw(((BigInt((usdt * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }
    
    async function approveHPD() {
        const HPD = new library.eth.Contract(ERC20, '0x6383f770f1eec68e80ac0c5527be71a11b4d182c')
        await HPD.methods.approve(HPDVaultContract, ((BigInt((hpd * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function stakeHPD() {
        const HPDVault = new library.eth.Contract(HPDABI, HPDVaultContract)
        await HPDVault.methods.stake(((BigInt((hpd * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function unstakeHPD() {
        const HPDVault = new library.eth.Contract(HPDABI, HPDVaultContract)
        await HPDVault.methods.withdraw(((BigInt((hpd * 1000000)) * BigInt(10**18)) / BigInt(1000000))).send({ from: account })
    }

    async function getStakingRewardWHPB() {
        const WHPBVault = new library.eth.Contract(WHPBABI, WHPBVaultContract)
        await WHPBVault.methods.getReward().send({ from: account })
    }

    async function getStakingRewardUSDT() {
        const USDTVault = new library.eth.Contract(USDTABI, USDTVaultContract)
        await USDTVault.methods.getReward().send({ from: account })
    }

    async function getStakingRewardHPD() {
        const HPDVault = new library.eth.Contract(HPDABI, HPDVaultContract)
        await HPDVault.methods.getReward().send({ from: account })
    }
    
    useEffect(() => {
        if(active) {
            const wBalance = async () => {
                const WHPB = new library.eth.Contract(ERC20, '0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31')
                const bal = await WHPB.methods.balanceOf(account).call({ from: account })
                setWhpbBalance(library.utils.fromWei(bal, 'ether'))

                const WHPBVault = new library.eth.Contract(WHPBABI, WHPBVaultContract)
                setWhpbStaked(library.utils.fromWei(await WHPBVault.methods._balances(account).call({ from: account }), 'ether'))

                const USDT = new library.eth.Contract(ERC20, '0xd378634119d2f7b3cf3d60e0b0f5e048e74ce3cf')
                setUsdtBalance(library.utils.fromWei(await USDT.methods.balanceOf(account).call({ from: account }), 'ether'))

                const USDTVault = new library.eth.Contract(USDTABI, USDTVaultContract)
                setUsdtStaked(library.utils.fromWei(await USDTVault.methods._balances(account).call({ from: account }), 'ether'))

                const HPD = new library.eth.Contract(ERC20, '0x6383f770f1eec68e80ac0c5527be71a11b4d182c')
                setHpdBalance(library.utils.fromWei(await HPD.methods.balanceOf(account).call({ from: account }), 'ether'))

                const HPDVault = new library.eth.Contract(HPDABI, HPDVaultContract)
                setHpdStaked(library.utils.fromWei(await HPDVault.methods._balances(account).call({ from: account }), 'ether'))
            }
            wBalance()
        }
    }, [active])

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className='self-center w-3/4 mt-16 text-4xl font-bold text-white'>Staking</h1>
            <div className="flex justify-between w-3/4 mt-4">
                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-16'>
                        <Image src='/whpb.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>WHPB</h1>
                        <h1 className='font-semibold text-white'>My Stake: {whpbStaked} WHPB</h1>
                        <h1 className='font-semibold text-white'>Balance: {whpbBalance} WHPB</h1>
                        <input onChange={(e) => setWhpb(e.target.value)} placeholder="Amount" className="bg-[#131313] rounded-lg mt-2 py-2 px-4 outline-none focus:outline-none text-white w-28 text-center" />
                        <button onClick={approveWHPB} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Approve {whpb} WHPB</button>
                        <button onClick={stakeWHPB} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake {whpb} WHPB</button>
                        <button onClick={unstakeWHPB} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Unstake {whpb} WHPB</button>
                        <button onClick={getStakingRewardWHPB} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Claim Rewards</button>
                    </div>
                </div>

                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-16'>
                        <Image src='/usdt.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>USDT</h1>
                        <h1 className='font-semibold text-white'>My Stake: {usdtStaked} USDT</h1>
                        <h1 className='font-semibold text-white'>Balance: {usdtBalance} USDT</h1>
                        <input onChange={(e) => setUsdt(e.target.value)} placeholder="Amount" className="bg-[#131313] rounded-lg mt-2 py-2 px-4 outline-none focus:outline-none text-white w-28 text-center" />
                        <button onClick={approveUSDT} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Approve {usdt} WHPB</button>
                        <button onClick={stakeUSDT} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake {usdt} WHPB</button>
                        <button onClick={unstakeUSDT} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Unstake {usdt} WHPB</button>
                        <button onClick={getStakingRewardUSDT} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Claim Rewards</button>
                    </div>
                </div>

                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-16'>
                        <Image src='/hpd.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>HPD</h1>
                        <h1 className='font-semibold text-white'>My Stake: {hpdStaked} HPD</h1>
                        <h1 className='font-semibold text-white'>Balance: {hpdBalance} HPD</h1>
                        <input onChange={(e) => setHpd(e.target.value)} placeholder="Amount" className="bg-[#131313] rounded-lg mt-2 py-2 px-4 outline-none focus:outline-none text-white w-28 text-center" />
                        <button onClick={approveHPD} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Approve {hpd} WHPB</button>
                        <button onClick={stakeHPD} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake {hpd} WHPB</button>
                        <button onClick={unstakeHPD} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Unstake {hpd} WHPB</button>
                        <button onClick={getStakingRewardHPD} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Claim Rewards</button>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default Staking
