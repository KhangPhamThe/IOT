import Head from 'next/head'
import NavBar from 'components/home/navBar'
import LeftBar from 'components/home/leftBar'
import styles from 'styles/Home.module.scss'
import BtnOpenDoor from '@/components/control/btnOpenDoor';

const Admin = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Door Management - Admin</title>
                <meta name="description" content="Door" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <LeftBar />

                <div className={styles.rightSide}>
                    <NavBar />

                    <BtnOpenDoor size='web' style={{}} />
                </div>
            </main>

        </div>
    )
}

export default Admin