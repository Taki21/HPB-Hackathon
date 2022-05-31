import Head from 'next/head'
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../components/wallet/connectors'
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import Link from 'next/link'
import { ERC20 } from '../components/contracts/ERC20'
import { WHPBVaultContract, WHPBABI } from '../components/contracts/WHPBVault'
import { USDTVaultContract, USDTABI } from '../components/contracts/USDTVault'
import { HPDVaultContract, HPDABI } from '../components/contracts/HPDVault'

const Home = () => {
  const [balance, setBalance] = useState(0)
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  const [sbBal, setSbBal] = useState(0)
  const [rewards, setRewards] = useState(0)

  const [whpbStaked, setWhpbStaked] = useState(0)
  const [usdtStaked, setUsdtStaked] = useState(0)
  const [hpdStaked, setHpdStaked] = useState(0)

  const [whpbSupply, setWhpbSupply] = useState(0)
  const [usdtSupply, setUsdtSupply] = useState(0)
  const [hpdSupply, setHpdSupply] = useState(0)

  // load eth balance on page load
  useEffect(() => {
    if(active) {
      const loadBalance = async () => {
        const balance = library.utils.fromWei(await library.eth.getBalance(account), 'ether')
        const sbBalance = new library.eth.Contract(ERC20, '0x8a9f435be70cb97acaede3e4ac82cf60d971df67')
        const sRw = new library.eth.Contract(WHPBABI, WHPBVaultContract)
        const whpbS = new library.eth.Contract(ERC20, '0xbe05ac1fb417c9ea435b37a9cecd39bc70359d31')
        setWhpbSupply(library.utils.fromWei(await whpbS.methods.balanceOf(WHPBVaultContract).call({from: account})), 'ether')
        setWhpbStaked(library.utils.fromWei(await sRw.methods._balances(account).call({ from: account }), 'ether'))
        setRewards(await sRw.methods.earned(account).call({ from: account }))
        setSbBal(await sbBalance.methods.balanceOf(account).call({ from: account }))
        setBalance(balance)

        const usdtSup = new library.eth.Contract(ERC20, '0xd378634119d2f7b3cf3d60e0b0f5e048e74ce3cf')
        setUsdtSupply(library.utils.fromWei(await usdtSup.methods.balanceOf(USDTVaultContract).call({ from: account }), 'ether'))

        const usdtS = new library.eth.Contract(USDTABI, USDTVaultContract)
        setUsdtStaked(library.utils.fromWei(await usdtS.methods._balances(account).call({ from: account }), 'ether'))

        const hpdSup = new library.eth.Contract(ERC20, '0x6383f770f1eec68e80ac0c5527be71a11b4d182c')
        setHpdSupply(library.utils.fromWei(await hpdSup.methods.balanceOf(HPDVaultContract).call({ from: account }), 'ether'))

        const hpdS = new library.eth.Contract(HPDABI, HPDVaultContract)
        setHpdStaked(library.utils.fromWei(await hpdS.methods._balances(account).call({ from: account }), 'ether'))
      }
      loadBalance()
    }
  }, [active])

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Starbits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center flex-1 w-full px-20 text-center">

        <div className='flex flex-col justify-start w-5/6'>
          <h1 className='self-start mt-16 text-4xl font-bold text-white'>Dashboard</h1>
          <div className='flex justify-between mt-4'>

            <div className='flex flex-col w-2/5'>
              
              <div className='bg-[#0d0d0d] p-8 rounded-xl flex flex-col'>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <Image src='/hpb.png' width={32} height={32}/>
                    <h1 className='self-start pl-2 text-2xl font-bold text-white'>HPB</h1>
                  </div>
                  <h1 className='pt-1 pl-2 font-medium text-white'>{balance} HPB</h1>
                </div>
              </div>

              <div className='bg-[#0d0d0d] p-8 rounded-xl flex flex-col mt-4'>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <Image src='/324.png' width={32} height={32}/>
                    <h1 className='self-start pl-2 text-2xl font-bold text-white'>Starbits</h1>
                  </div>
                  <h1 className='pt-1 pl-2 font-medium text-white'>{sbBal} STAR</h1>
                </div>
              </div>

              <div className='bg-[#0d0d0d] p-8 rounded-xl flex flex-col mt-4'>
                <div className='flex justify-between'>
                  <div className='flex'>
                    <Image src='/325.png' width={32} height={32}/>
                    <h1 className='self-start pl-2 text-2xl font-bold text-white'>Staking Rewards</h1>
                  </div>
                  <h1 className='pt-1 pl-2 font-medium text-white'>{rewards} STAR</h1>
                </div>
              </div>
            </div>

            <div className='bg-[#0d0d0d] p-8 w-7/12 rounded-lg flex flex-col'>
              <h1 className='text-2xl font-bold text-white'>Staked Assets</h1>
              
              <div className='flex justify-around mt-4'>
                <div className='flex flex-col'>
                  <Image src='/whpb.svg' width={48} height={48}/>
                  <h1 className='mt-2 text-2xl font-bold text-white'>WHPB</h1>
                  <h1 className='font-semibold text-white'>My Stake: {whpbStaked} WHPB</h1>
                  <h1 className='font-semibold text-white'>Total Staked: {whpbSupply} WHPB</h1>
                  <Link href='/staking'>
                    <a>
                      <h1 className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake WHPB</h1>
                    </a>
                  </Link>
                </div>

                <div className='flex flex-col'>
                  <Image src='/usdt.svg' width={48} height={48}/>
                  <h1 className='mt-2 text-2xl font-bold text-white'>USDT</h1>
                  <h1 className='font-semibold text-white'>My Stake: {usdtStaked} USDT</h1>
                  <h1 className='font-semibold text-white'>Total Staked: {usdtSupply} USDT</h1>
                  <Link href='/staking'>
                    <a>
                      <h1 className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake USDT</h1>
                    </a>
                  </Link>
                </div>

                <div className='flex flex-col'>
                  <Image src='/hpd.svg' width={48} height={48}/>
                  <h1 className='mt-2 text-2xl font-bold text-white'>HPD</h1>
                  <h1 className='font-semibold text-white'>My Stake: {hpdStaked} HPD</h1>
                  <h1 className='font-semibold text-white'>Total Staked: {hpdSupply} HPD</h1>
                  <Link href='/staking'>
                    <a>
                      <h1 className='p-2 bg-[#B98F61] rounded-lg text-white font-semibold hover:bg-[#a27e56] transition-all mt-3'>Stake HPD</h1>
                    </a>
                  </Link>
                </div>
                
              </div>

            </div>

          </div>
        </div>

        {/*<button onClick={getStringSus} className="w-56 py-2 mt-20 mb-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-800">Call Contract</button>
        <h1>Sus: {sus}</h1>
        <button onClick={setStringSus} className="w-56 py-2 mt-20 mb-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-800">Modify Contract</button>
        <button onClick={deposit} className="w-56 py-2 mt-20 mb-4 text-lg font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-800">Stake 100 BLUE Token</button>
        */}
      </main>

      <footer className="flex items-center justify-center w-full">

      </footer>
    </div>
  )

}

export default Home
