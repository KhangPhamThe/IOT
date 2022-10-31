import styles from 'styles/navBar.module.scss';
import { Input, Button, Avatar, Dropdown } from '@nextui-org/react';
import SearchIcon from 'assets/svg/searchIcon';
import { useRef } from 'react';
import { colorList } from '../../assets/constants';
import NotificationIcon from 'assets/svg/notificationIcon';
import QuestionIcon from 'assets/svg/questionIcon';

const NavBar = () => {
    const color = useRef(colorList[Math.floor(Math.random() * colorList.length)]) as any;

    const hasLogin = true;

    return (
        <div className={styles['navBar-container']}>
            <div className={styles.leftSide}>
                <h2>Dashboard</h2>
                <Input type='search' width='400px' placeholder='Search for component' contentRight={<SearchIcon fill='white' size={16} />} className={styles.searchBar} style={{ visibility: 'visible' }} />
            </div>
            <div className={styles.rightSide}>
                <Button icon={<QuestionIcon fill="#7a7a7a" filled />} style={{backgroundColor: '#252525'}} auto/>
                <Button icon={<NotificationIcon fill="#7a7a7a" filled />} style={{backgroundColor: '#252525'}} auto/>
                <Avatar size='lg' textColor='white' text='Tus dep trai' color={color.current}/>
                <Dropdown>
                    <Dropdown.Button style={{backgroundColor:'black'}}></Dropdown.Button>
                    <Dropdown.Menu>
                        <Dropdown.Item>{hasLogin ? 'Log in' : 'Profile'}</Dropdown.Item>
                        <Dropdown.Item>{hasLogin ? 'Sign up' : 'Log out'}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default NavBar;