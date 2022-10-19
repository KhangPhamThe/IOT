import styles from 'styles/Home.module.scss';

const NavBar = () => {
    return (
        <div className={styles['navBar-container']}>
            <h2>Dashboard</h2>

            <input type="search" className='searchBar' placeholder='Search for component'/>
        </div>
    )
}

export default NavBar;