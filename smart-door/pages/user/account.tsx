import Image from 'next/image';
import userStyle from 'styles/user.module.scss';
import logo from 'assets/svg/logo.svg'
import QuestionIcon from '@/assets/svg/questionIcon';
import BtnOpenDoor from '@/components/control/btnOpenDoor';

const User = () => {
    return (
        <div className={userStyle.container}>
            <div className={userStyle.navBar}>
                <QuestionIcon style={{ margin: 'auto 0' }} />

                <div className={userStyle.logoGr}>
                    <Image src={logo} width="42px" height="35px" />
                    <h1>NIOM</h1>
                </div>

                <QuestionIcon style={{ margin: 'auto 0' }} />
            </div>

            <main className={userStyle.accountContainer} style={{width: '90%'}}>
                <div className={userStyle.ava}>
                    <Image src={logo} />
                </div>

                <h3 className={userStyle.name}>Phạm Thế Khang</h3>I xz
            </main>

            <div className={userStyle.bottomBar}>
                <QuestionIcon style={{ margin: 'auto 0' }} />

                <div className={userStyle.homeBtn}>
                    <Image src={logo} width="42px" height="35px" />
                </div>

                <QuestionIcon style={{ margin: 'auto 0' }} />
            </div>
        </div>
    );
}

export default User