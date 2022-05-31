import '../styles/globals.css'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import Header from '../components/Header'

function getLibrary(provider) {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className='bg-[#0a0a0a] h-screen overflow-hidden'>
        <Header />
        <Component {...pageProps} />
      </div>
    </Web3ReactProvider>
  )
}

export default MyApp
