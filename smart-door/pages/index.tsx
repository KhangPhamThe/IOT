import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.scss'
import LeftBar from '../components/home/leftBar'
import { Navbar as Nav, Text } from "@nextui-org/react";
import NavBar from 'components/home/navBar'
import { Provider } from 'react-redux'
import { store } from 'store'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Door Management</title>
        <meta name="description" content="Door" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LeftBar />
        
        <div className={styles.rightSide}>
          <NavBar />
        </div>
      </main>
    </div>      
  )
}

export default Home
