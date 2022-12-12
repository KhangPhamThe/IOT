import Head from "next/head";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import styles from "styles/Home.module.scss";
import BtnOpenDoor from "@/components/control/btnOpenDoor";
import { useEffect, useState } from "react";

const ADF_URL = {
	ALARM:  "https://io.adafruit.com/api/v2/KhangPhamThe/feeds/dadn.alarm/data",
	PPL_IN: "https://io.adafruit.com/api/v2/KhangPhamThe/feeds/dadn.ppl-in/data",
	PPL_OUT: "https://io.adafruit.com/api/v2/KhangPhamThe/feeds/dadn.ppl-out/data",	
}

const Admin = () => {
  const [alarmData, setAlarmData] = useState([]);
  const [PPLInData, setPPLInData] = useState([]);
  const [PPLOutData, setPPLOutData] = useState([]);
	useEffect(() => {
		fetch(ADF_URL.ALARM)
		.then((rs) =>  {
			return rs.json()
		})
		.then((json) => {
			setAlarmData(json || [])
		})

		fetch(ADF_URL.PPL_IN)
		.then((rs) =>  {
			return rs.json()
		})
		.then((json) => {
			setPPLInData(json || [])
		})

		fetch(ADF_URL.PPL_IN)
		.then((rs) =>  {
			return rs.json()
		})
		.then((json) => {
			setPPLOutData(json || [])
		})
	}, [])
	
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

          <BtnOpenDoor size="web" style={{}} />
        </div>
      </main>
    </div>
  );
};

export default Admin;
