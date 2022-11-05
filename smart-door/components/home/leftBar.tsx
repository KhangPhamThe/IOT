import Image from 'next/image';
import styles from 'styles/leftBar.module.scss';
import logo from 'assets/svg/logo.svg';
import LogInIcon from '@/assets/svg/logInIcon';

const LeftBar = () => {
    return (
        <div className={styles["leftBar-container"]}>
            <div className={styles.logo}>
                <Image src={logo} width="37px" height="31px" />
                <h1>Tên app nè</h1>
            </div>

            <div className={styles.categoryContainer}>
                <div className={styles.categoryItem}>
                    <LogInIcon/>
                    <h3>Dashboard</h3>
                </div>

                <div className={styles.categoryItem}>
                    <LogInIcon/>
                    <h3>Recent</h3>
                </div>
            </div>
        </div>
    )
}

export default LeftBar;