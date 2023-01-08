import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userStyle from 'styles/user.module.scss';
import logo from 'assets/svg/logo.svg'
import QuestionIcon2 from '@/assets/svg/questionIcon2';
import BtnOpenDoor from '@/components/control/btnOpenDoor';
import MenuIcon from '@/assets/svg/menuIcon';
import HomeIcon from '@/assets/svg/homeIcon';
import SettingIcon from '@/assets/svg/settingIcon';
import { Input } from '@nextui-org/react';
import SearchIcon from '@/assets/svg/searchIcon';
import styles from "styles/navBar.module.scss";
import AccountIcon from '@/assets/svg/account';
import { useAppDispatch } from "hooks";
import { onLogout } from "reducer/user/userSlice";
import LogOutIcon from '@/assets/svg/logOutIcon';

const User = () => {
    const route = useRouter();
    const dispatch = useAppDispatch()
    const handleLogout = () => {
        dispatch(onLogout())
    }

    return (
        <div className={userStyle.container}>
            <Head>
                <title>Door Management - User</title>
                <meta name="description" content="Door" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={userStyle.navBar}>
                <MenuIcon style={{ margin: 'auto 0' }} />

                <div className={userStyle.logoGr}>
                    <Image src={logo} width="42px" height="35px" />
                    <h1>IOM</h1>
                </div>

                <QuestionIcon2 style={{ margin: 'auto 0' }} />
            </div>


            <div className={userStyle.searchBarContainer}>
                <Input
                    type="search"
                    // width="400px"
                    placeholder="Search for component"
                    contentRight={<SearchIcon fill="#7A7A7A" size={16} />}
                    className={styles.searchBar + " " + userStyle.searchBar}
                    style={{ visibility: "visible" }}
                />
            </div>

            <div className={userStyle.pathLink}>
                <a className={userStyle.link}>
                    <h2>Dashboard</h2>
                </a>
                <p>&gt;</p>
                <a className={userStyle.link}>
                    <h2>Main Hall</h2>
                </a>
            </div>

            <main style={{ marginTop: '10px' }}>
                <BtnOpenDoor size='phone' />
            </main>

            <div className={userStyle.bottomBar}>
                <Link href='/user/account'>
                    <AccountIcon style={{ margin: 'auto 0' }} className={userStyle.btn} />
                </Link>
                {/* <AccountIcon style={{ margin: 'auto 0' }} className={userStyle.btn} onClick={() => { route.push('/user/account') }} /> */}

                <Link href='/user'>
                    <div className={userStyle.homeBtn}>
                        <HomeIcon />
                    </div>
                </Link>

                <LogOutIcon style={{ margin: 'auto 0' }} className={userStyle.btn} onClick={handleLogout} />
            </div>
        </div>
    );
}

export default User