import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/leftBar.module.scss';
import logo from 'assets/svg/logo.svg';
import CategoryItem from './categoryItem';
import SupportIcon from 'assets/svg/supportIcon';
import RegisterIcon from 'assets/svg/registerIcon';
import DashboardIcon from 'assets/svg/dashboardIcon';
import BookmarkIcon from 'assets/svg/bookmarkIcon';
import AccountIcon from 'assets/svg/account';
import SettingIcon from 'assets/svg/settingIcon';
import { useCallback } from 'react';

const LeftBar = () => {
    const route = useRouter();
    const isActive = useCallback((curTitle: string)=>{
        switch (route.pathname) {
            case '/':
                return curTitle === 'Dashboard';
            case '/admin':
                return curTitle === 'Dashboard';
            case '/admin/account':
                return curTitle === 'Account';
            case '/admin/register':
                return curTitle === 'Register';
            default:
                return false;
        }
    },[route.pathname])

    return (
        <div className={styles["leftBar-container"]}>
            <div className={styles.logo}>
                <Image src={logo} width="42px" height="35px" />
                <h1>IOM</h1>
            </div>

            <div className={styles.categoryContainer}>
                <CategoryItem icon={<DashboardIcon />} title="Dashboard" active={isActive("Dashboard")} url="/admin" />
                <CategoryItem icon={<AccountIcon />} title="Account" active={isActive("Account")} url="/admin/account" />
                <CategoryItem icon={<RegisterIcon/>} title="Register" active={isActive("Register")} url="/admin/register" />
                <CategoryItem icon={<BookmarkIcon/>} title="Bookmark" unavailable/>
                <CategoryItem icon={<SupportIcon/>} title="Support" unavailable/>
                <CategoryItem icon={<SettingIcon/>} title="Setting" unavailable />
            </div>
        </div>
    )
}

export default LeftBar;