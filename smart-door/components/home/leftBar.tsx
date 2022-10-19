import Image from 'next/image';
import styles from 'styles/Home.module.scss';
import logo from 'assets/svg/logo.svg';

const LeftBar = () => {
    return (
        <div className={styles["leftBar-container"]}>
            <div className={styles.logo}>
                <Image src={logo} width="37px" height="31px" />
                <h1>Tên app nè</h1>
            </div>
        </div>
    )
}

export default LeftBar;