import Head from "next/head";
import adminStyle from "styles/admin.module.scss";
import styles from "styles/Home.module.scss";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import { useAppSelector } from 'hooks';
import { validateAvatar } from "utils/users.utils";

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
							<img src={validateAvatar(currUserSelection.current?.avatarURL)} />
						</div>

						<div className={adminStyle.field}>
							<h3>First Name</h3>
							<input aria-label="firstName" value={currUserSelection.current?.firstName ? currUserSelection.current?.firstName : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Last Name</h3>
							<input aria-label="lastName" value={currUserSelection.current?.lastName ? currUserSelection.current?.lastName : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Email</h3>
							<input aria-label="email" value={currUserSelection.current?.email ? currUserSelection.current?.email : ""} disabled />
						</div>

						<div className={adminStyle.field}>
							<h3>Role</h3>
							<input aria-label="role" value={currUserSelection.current?.role ? currUserSelection.current?.role : ""} disabled />
						</div>
					</main>
				</div>
			</main>
		</div>
	)
}

export default Account;