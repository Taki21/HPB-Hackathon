import Wallet from './Wallet'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {

    return (
        <>
            <div className="flex flex-row items-center justify-around w-full py-4">
                <div className='flex w-36'>
                    <Image src="/324.png" width={`32px`} height={`32px`} />
                    <h1 className="pl-2 text-2xl font-thin tracking-wide text-white">Starbits</h1>
                </div>
                <div className="flex text-white">
                    <Link href='../'>
                        <a>
                            <h1 className="font-thin hover:text-[#B98F61] transition-all">Home</h1>
                        </a>
                    </Link>

                    <Link href='../staking'>
                        <a>
                            <h1 className="mx-8 font-thin hover:text-[#B98F61] transition-all">Staking</h1>
                        </a>
                    </Link>

                    <Link href='../vaults'>
                        <a>
                            <h1 className="font-thin hover:text-[#B98F61] transition-all">Vaults</h1>
                        </a>
                    </Link>

                </div>
                <Wallet />
            </div>
        </>
    )
}

export default Header