import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import userStyle from 'styles/user.module.scss';
import logo from 'assets/svg/logo.svg'
import QuestionIcon2 from '@/assets/svg/questionIcon2';
import MenuIcon from '@/assets/svg/menuIcon';
import HomeIcon from '@/assets/svg/homeIcon';
import SettingIcon from '@/assets/svg/settingIcon';
import AccountIcon from '@/assets/svg/account';
import { useAppSelector, useAppDispatch } from 'hooks';
import { validateAvatar } from 'utils/users.utils';
import { onLogout } from "reducer/user/userSlice";
import LogOutIcon from '@/assets/svg/logOutIcon';


const User = () => {
    const currUserSelection = useAppSelector(state => state.user);
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


            <main className={userStyle.accountContainer} style={{ width: '90%' }}>
                <div className={userStyle.ava}>
                    <img src={validateAvatar(currUserSelection.current?.avatarURL)} />
                </div>

                <div className={userStyle.field}>
                    <h3>First Name</h3>
                    <input aria-label='firstName' value={currUserSelection.current?.firstName ? currUserSelection.current?.firstName : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Last Name</h3>
                    <input aria-label='lastName' value={currUserSelection.current?.lastName ? currUserSelection.current?.lastName : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Email</h3>
                    <input aria-label='email' value={currUserSelection.current?.email ? currUserSelection.current?.email : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Role</h3>
                    <input aria-label='role' value={currUserSelection.current?.role ? currUserSelection.current?.role : ""} disabled />
                </div>

            </main>


            <div className={userStyle.bottomBar}>
                <Link href='/user/account'>
                    <AccountIcon style={{ margin: 'auto 0' }} className={userStyle.btn}/>
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