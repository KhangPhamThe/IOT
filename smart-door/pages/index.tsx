import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.scss'
import LeftBar from '../components/home/leftBar'
import { Navbar as Nav, Text } from "@nextui-org/react";
import NavBar from '../components/home/navBar'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <LeftBar />
        
        <div className={styles.rightSide}>
          <NavBar />
        </div>

        <Nav variant="sticky" isBordered>
          <Nav.Brand>
            abc test
          </Nav.Brand>
        </Nav>
      </main>
    </div>
  )
}

export default Home
