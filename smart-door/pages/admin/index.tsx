import Head from "next/head";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import styles from "styles/Home.module.scss";
import adminStyle from "styles/admin.module.scss";
import BtnOpenDoor from "@/components/control/btnOpenDoor";
import { useContext, useEffect, useState } from "react";
import MQTTContext from "@/components/context/MQTTProvider";
import Log from "@/components/control/log";

const TYPE_OF_DATA = {
	ALARM: 'dadn.alarm',
	PPL_IN: 'dadn.ppl-in',
	PPL_OUT:'dadn.ppl-out',
}

const ADF_URL = {
  ALARM: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.ALARM}/data`,
  PPL_IN: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.PPL_IN}/data`,
  PPL_OUT:
    `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.PPL_OUT}/data`,
};

// interface IAlarmData {
//   created_at: string;
//   value: string;
// }

const Admin = () => {
  const [alarmData, setAlarmData] = useState([]);
  const [PPLInData, setPPLInData] = useState([]);
  const [PPLOutData, setPPLOutData] = useState([]);
	const MQTTNewData = useContext(MQTTContext)
  useEffect(() => {
    fetch(ADF_URL.ALARM)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          tmp.push({
            created_at,
            // feed_key,
            value,
          });
        });
        setAlarmData(tmp);
      })

    fetch(ADF_URL.PPL_IN)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          tmp.push({
            created_at,
            // feed_key,
            value,
          });
        });
        setPPLInData(tmp);
      });

    fetch(ADF_URL.PPL_OUT)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          tmp.push({
            created_at,
            // feed_key,
            value,
          });
        });
        setPPLOutData(tmp);
      });
  }, []);

	useEffect(() => {
		switch (MQTTNewData.feed_key) {
			case TYPE_OF_DATA.ALARM: {
				const tmp : any = [...alarmData]
				if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at)  {
					tmp.push(MQTTNewData)
					setAlarmData(tmp)
				}
				break
			}
			case TYPE_OF_DATA.PPL_IN: {
				const tmp : any = [...PPLInData]
				if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at)  {
					tmp.push(MQTTNewData)
					setPPLInData(tmp)
				}
				break				
			}
			case TYPE_OF_DATA.PPL_OUT: {
				const tmp : any = [...PPLOutData]
				if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at)  {
					tmp.push(MQTTNewData)
					setPPLOutData(tmp)
				}
				break
			}
		}
	}, [MQTTNewData, alarmData, PPLInData, PPLOutData])

  return (
    <div className={styles.container}>
			<div>{JSON.stringify(alarmData)}</div>
			{/* <div>{JSON.stringify(PPLInData)}</div> */}
			{/* <div>{JSON.stringify(PPLOutData)}</div> */}
      <Head>
        <title>Door Management - Admin</title>
        <meta name="description" content="Door" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

			<main className={styles.main}>
				<LeftBar />

				<div className={styles.rightSide}>
					<NavBar />

					<main className={adminStyle.mainContent}>
						<div className={adminStyle.row}>
							<BtnOpenDoor size="web" style={{}} />
							<div className={adminStyle.box}>Box</div>
						</div>

						<div className={adminStyle.row}>
							<Log contents={[
                {
                  created_at: '11/12/2022',
                  text: 'A đi sớm',
                  levelOfImportance: 'medium',
                }, 
                {
                  created_at: '10/12/2022',
                  text: 'B đi trễ',
                  levelOfImportance: 'high',
                }
              ]} />
							<div className={adminStyle.box}>Box</div>
						</div>
					</main>
				</div>
			</main>
		</div>
	);
};

export default Admin;
