import Link from 'next/link'
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core'
import { WHPBVaultContract, WHPBABI } from '../components/contracts/WHPBVault'
import { USDTVaultContract, USDTABI } from '../components/contracts/USDTVault'
import { HPDVaultContract, HPDABI } from '../components/contracts/HPDVault'
import { useEffect, useState } from 'react'
import { ERC20 } from '../components/contracts/ERC20'

const Vault = () => {

    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const [whpbSupply, setWhpbSupply] = useState(0)
    const [usdtSupply, setUsdtSupply] = useState(0)
    const [hpdSupply, setHpdSupply] = useState(0)

    const borrowerContract = '0x4AbC0de3c30247F81a187B0cb43F4529b5E916b5'
    const wrappedHPB = '0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31'
    const USDT = '0xd378634119d2f7b3cf3d60e0b0f5e048e74ce3cf'
    const HPD = '0x6383f770f1eec68e80ac0c5527be71a11b4d182c'

    async function whpbLoan() {
        const loanContract = new library.eth.Contract(WHPBABI, WHPBVaultContract)
        const whpbS = new library.eth.Contract(ERC20, wrappedHPB)
        const max = await whpbS.methods.balanceOf(WHPBVaultContract).call({from: account})
        await loanContract.methods.flashLoan(borrowerContract, wrappedHPB, max, '0x00').send({ from: account })
    }

    async function usdtLoan() {
        const loanContract = new library.eth.Contract(USDTABI, USDTVaultContract)
        const usdtS = new library.eth.Contract(ERC20, USDT)
        const max = await usdtS.methods.balanceOf(USDTVaultContract).call({from: account})
        await loanContract.methods.flashLoan(borrowerContract, USDT, max, '0x00').send({ from: account })
    }

    async function hpdLoan() {
        const loanContract = new library.eth.Contract(HPDABI, HPDVaultContract)
        const hpdS = new library.eth.Contract(ERC20, HPD)
        const max = await hpdS.methods.balanceOf(HPDVaultContract).call({from: account})
        await loanContract.methods.flashLoan(borrowerContract, HPD, max, '0x00').send({ from: account })
    }

    useEffect(() => {
        if(active) {
            const loadSupply = async () => {
                const whpbS = new library.eth.Contract(ERC20, wrappedHPB)
                setWhpbSupply(library.utils.fromWei(await whpbS.methods.balanceOf(WHPBVaultContract).call({from: account})), 'ether')

                const usdtS = new library.eth.Contract(ERC20, USDT)
                setUsdtSupply(library.utils.fromWei(await usdtS.methods.balanceOf(USDTVaultContract).call({from: account})), 'ether')

                const hpdS = new library.eth.Contract(ERC20, HPD)
                setHpdSupply(library.utils.fromWei(await hpdS.methods.balanceOf(HPDVaultContract).call({from: account})), 'ether')
            }
            loadSupply()
        }
    }, [active])

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className='self-center w-3/4 mt-16 text-4xl font-bold text-white'>Flashloan Vaults</h1>
            <div className="flex justify-between w-3/4 mt-4">
                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-12'>
                        <Image src='/whpb.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>WHPB</h1>
                        <h1 className='font-semibold text-white'>Supply: {whpbSupply} WHPB</h1>
                        <h1 className='text-xs font-semibold text-white '>0x736cADf217645CDAaf5f3dC63D197e79e2978e3C</h1>
                        <button onClick={whpbLoan} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Test Flashloan</button>
                    </div>
                </div>

                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-12'>
                        <Image src='/usdt.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>USDT</h1>
                        <h1 className='font-semibold text-white'>Supply: {usdtSupply} USDT</h1>
                        <h1 className='text-xs font-semibold text-white'>0xe199D6e36B7918ACf14A932167e864BAe57EcF1d</h1>
                        <button onClick={usdtLoan} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Test Flashloan</button>
                    </div>
                </div>

                <div className="w-1/4 bg-[#0d0d0d] rounded-xl">
                    <div className='flex flex-col items-center my-12'>
                        <Image src='/hpd.svg' width={48} height={48}/>
                        <h1 className='mt-2 text-2xl font-bold text-white'>HPD</h1>
                        <h1 className='font-semibold text-white'>Supply: {hpdSupply} HPD</h1>
                        <h1 className='text-xs font-semibold text-white'>0x5C2f5A244171b25ac5757Cc012FAd088eE19ed2c</h1>
                        <button onClick={hpdLoan} className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Test Flashloan</button>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default Vault