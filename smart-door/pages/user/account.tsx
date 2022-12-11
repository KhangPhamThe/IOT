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
import { userAPI } from 'pages/api/users/authenAPI';

const User = () => {
    const route = useRouter();
    // async () => {
    //     const res = await userAPI.getUserProfile();
    //     console.log(res);
    // };

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


            <main className={userStyle.accountContainer} style={{width: '90%'}}>
                <div className={userStyle.ava}>
                    <img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-9/27858226_2002217240039299_3532918632429742634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=djLKM2VBJWQAX9oqQA0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAcNerg8QvUUQVU8cmz4ygPrQwAMkSaiLsXDjWzveht4w&oe=63BCE77C" />
                </div>

                <div className={userStyle.field}>
                    <h3>First Name</h3>
                    <input value="Khang" disabled/>
                </div>

                <div className={userStyle.field}>
                    <h3>Last Name</h3>
                    <input value="Phạm Thế" disabled/>
                </div>

                <div className={userStyle.field}>
                    <h3>Email</h3>
                    <input value="khang.pham271200@hcmut.edu.vn" disabled/>
                </div>
                
                <div className={userStyle.field}>
                    <h3>Role</h3>
                    <input value="Admin/Employee" disabled/>
                </div>

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