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
import { useAppSelector } from 'hooks';


const User = () => {
    const currUserSelection = useAppSelector(state => state.user);

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
                    <h1>IOM Cop</h1>
                </div>

                <QuestionIcon2 style={{ margin: 'auto 0' }} />
            </div>


            <main className={userStyle.accountContainer} style={{ width: '90%' }}>
                <div className={userStyle.ava}>
                    <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-9/27858226_2002217240039299_3532918632429742634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=djLKM2VBJWQAX9oqQA0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAcNerg8QvUUQVU8cmz4ygPrQwAMkSaiLsXDjWzveht4w&oe=63BCE77C" />
                </div>

                <div className={userStyle.field}>
                    <h3>First Name</h3>
                    <input value={currUserSelection.current?.firstName ? currUserSelection.current?.firstName : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Last Name</h3>
                    <input value={currUserSelection.current?.lastName ? currUserSelection.current?.lastName : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Email</h3>
                    <input value={currUserSelection.current?.email ? currUserSelection.current?.email : ""} disabled />
                </div>

                <div className={userStyle.field}>
                    <h3>Role</h3>
                    <input value={currUserSelection.current?.role ? currUserSelection.current?.role : ""} disabled />
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

                <Link href="/admin">
                    <SettingIcon style={{ margin: 'auto 0' }} className={userStyle.btn} />
                </Link>
            </div>
        </div>
    );
}

export default User