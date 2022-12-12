import Image from 'next/image';
import styles from 'styles/leftBar.module.scss';
import logo from 'assets/svg/logo.svg';
import CategoryItem from './categoryItem';
import SupportIcon from 'assets/svg/supportIcon';
import RecentIcon from 'assets/svg/recentIcon';
import DashboardIcon from 'assets/svg/dashboardIcon';
import BookmarkIcon from 'assets/svg/bookmarkIcon';
import DownloadIcon from 'assets/svg/downloadIcon';
import SettingIcon from 'assets/svg/settingIcon';

const LeftBar = () => {
    return (
        <div className={styles["leftBar-container"]}>
            <div className={styles.logo}>
                <Image src={logo} width="42px" height="35px" />
                <h1>IOM Cop</h1>
            </div>

            <div className={styles.categoryContainer}>
                <CategoryItem icon={<DashboardIcon />} title="Dashboard" active/>
                <CategoryItem icon={<RecentIcon />} title="Recent" unavailable/>
                <CategoryItem icon={<BookmarkIcon/>} title="Bookmark" unavailable/>
                <CategoryItem icon={<DownloadIcon/>} title="Downloaded" unavailable/>
                <CategoryItem icon={<SupportIcon/>} title="Support" unavailable/>
                <CategoryItem icon={<SettingIcon/>} title="Setting" url="/user" />
            </div>
        </div>
    )
}

export default LeftBar;