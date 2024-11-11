import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useReadContract, useWriteContract } from 'wagmi'


// Contract Address (change it for deployed contract address)
const contractAddress = '0x6CB2d36c5247B0D005981baAce0980AEBAc5C85C'

const Home: NextPage = () => {
  // const [inputValue, setInputValue] = useState<number>(0); 
  // const [storedValue, setStoredValue] = useState<number | null>(null);
  // const { data: hash, writeContract, isSuccess, isPending, isError } = useWriteContract()
  // const {
  //   data: retrievedValue,
  //   error: errorRetrieve,
  //   isPending: isPendingRetrieve,
  // } = useReadContract({
  //   address: contractAddress,
  //   abi: contractABI,
  //   functionName: 'retrieve',
  //   args: [],
  //   chainId: 31,
  // })

  // const handleRetrieve = async () => {
  //   if (retrievedValue) {
  //     setStoredValue(Number(retrievedValue));
  //   }
  // };
  // const hadleWriteContract = async () => {
  //   console.log('recording new value: ', inputValue);
  //   writeContract({
  //     address: contractAddress,
  //     abi: contractABI,
  //     functionName: 'store',
  //     args: [inputValue],
  //   })
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crowd Funding App Backed by Bitcoin</title>
        <meta
          content="A crowd funding application backed by bitcoin; deployed to the Rootstock network"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

       

        <section className={styles.card}>
         
          
        </section>

        
      </main>

      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
};

export default Home
