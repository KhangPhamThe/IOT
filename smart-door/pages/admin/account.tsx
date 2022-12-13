import Head from "next/head";
import adminStyle from "styles/admin.module.scss";
import styles from "styles/Home.module.scss";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import { useAppSelector } from 'hooks';

const Account = () => {
	const currUserSelection = useAppSelector(state => state.user);

	return (
		<div className={styles.container}>
			<Head>
				<title>Door Management - Admin</title>
				<meta name="description" content="Door" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<LeftBar />

				<div className={styles.rightSide}>
					<NavBar />

					<main className={adminStyle.mainAccountContent}>
						<div className={adminStyle.ava}>
							<img src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t1.18169-9/27858226_2002217240039299_3532918632429742634_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=djLKM2VBJWQAX9oqQA0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AfAcNerg8QvUUQVU8cmz4ygPrQwAMkSaiLsXDjWzveht4w&oe=63BCE77C" />
						</div>

						<div className={adminStyle.field}>
							<h3>First Name</h3>
							<input value={currUserSelection.current?.firstName ? currUserSelection.current?.firstName : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Last Name</h3>
							<input value={currUserSelection.current?.lastName ? currUserSelection.current?.lastName : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Email</h3>
							<input value={currUserSelection.current?.email ? currUserSelection.current?.email : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Role</h3>
							<input value={currUserSelection.current?.role ? currUserSelection.current?.role : ""} disabled />
						</div>
					</main>
				</div>
			</main>
		</div>
	)
}

export default Account;