import Image from 'next/image';
import { useRouter } from 'next/router';
import userStyle from 'styles/user.module.scss';
import logo from 'assets/svg/logo.svg'
import QuestionIcon2 from '@/assets/svg/questionIcon2';
import BtnOpenDoor from '@/components/control/btnOpenDoor';
import MenuIcon from '@/assets/svg/menuIcon';
import HomeIcon from '@/assets/svg/homeIcon';
import SettingIcon from '@/assets/svg/settingIcon';
import DownloadIcon from '@/assets/svg/downloadIcon';
import { Input } from '@nextui-org/react';
import SearchIcon from '@/assets/svg/searchIcon';
import styles from "styles/navBar.module.scss";
import AccountIcon from '@/assets/svg/account';

const User = () => {
    const route = useRouter();
    return (
        <div className={userStyle.container}>
            <div className={userStyle.navBar}>
                <MenuIcon style={{ margin: 'auto 0' }} />

                <div className={userStyle.logoGr}>
                    <Image src={logo} width="42px" height="35px" />
                    <h1>IOM Cop</h1>
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
                <AccountIcon style={{ margin: 'auto 0' }} className={userStyle.btn} onClick={()=>{route.push('/user/account')}} />

                <div className={userStyle.homeBtn} onClick={()=>{route.push('/user')}}>
                    <HomeIcon />
                </div>

                <SettingIcon style={{ margin: 'auto 0' }} className={userStyle.btn} />
            </div>
        </div>
    );
}

export default User