import Head from "next/head";
import NavBar from "components/home/navBar";
import LeftBar from "components/home/leftBar";
import BtnOpenDoor from "@/components/control/btnOpenDoor";
import { useContext, useEffect, useState, useRef } from "react";
import MQTTContext from "@/components/context/MQTTProvider";
import Log from "@/components/control/log";
import { evaluateLogImportance } from "utils/control.utils";
import { parseTime } from "utils/time.utils";
import { useRouter } from "next/router";
import BarChart from "@/components/control/barChart";
import { userAPI } from "pages/api/users/authenAPI";
import styles from "styles/Home.module.scss";
import adminStyle from "styles/admin.module.scss";
import controlStyle from "styles/control.module.scss";
import TextLog from "@/components/control/TextLog";
import { useAppSelector } from 'hooks';

const TYPE_OF_DATA = {
  ALARM: 'dadn.alarm',
  PPL_IN: 'dadn.ppl-in',
  PPL_OUT: 'dadn.ppl-out',
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
  const route = useRouter();
  // const currUserSelection = useAppSelector(state => state.user);
  const [alarmData, setAlarmData] = useState<any>([]);
  const [totalInOut, setTotalInOut] = useState<any>([]);

  // const [emailInput, setEmailInput] = useState("nhan99999@gmail.com");
  // const [dataById, setDataById] = useState<any>([]);

  const [PPLInData, setPPLInData] = useState<any>([]);
  const [PPLOutData, setPPLOutData] = useState<any>([]);
  const MQTTNewData = useContext(MQTTContext);


  useEffect(() => {
    (async () => {
      const rs = await userAPI.getCountInOutDoor();
      setTotalInOut(rs);
    })();
  },[route.pathname])


  // useEffect(() => {
  //   if (emailInput)
  //     (async () => {
  //       const rs = await userAPI.getSignalInOutByEmail({email: emailInput});
  //       const timeArr:string[] = [];
  //       rs.map((item:any)=>{
  //         timeArr.push(item?.createdAt)
  //       })
  //       setDataById(timeArr);
  //     })();
  // },[route.pathname, emailInput])

  useEffect(() => {
    fetch(ADF_URL.ALARM)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          const { date, time } = parseTime(created_at)
          tmp.push({
            created_at,
            date,
            time,
            value,
            levelOfImportance: evaluateLogImportance(value),
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
            value,
          });
        });
        setPPLOutData(tmp);
      });
  }, [route.pathname]);


  useEffect(() => {
    switch (MQTTNewData.feed_key) {
      case TYPE_OF_DATA.ALARM: {
        const tmp: any = [...alarmData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          tmp.push(MQTTNewData)
          setAlarmData(tmp)
        }
        break
      }
      case TYPE_OF_DATA.PPL_IN: {
        const tmp: any = [...PPLInData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          tmp.push(MQTTNewData)
          setPPLInData(tmp)
        }
        break
      }
      case TYPE_OF_DATA.PPL_OUT: {
        const tmp: any = [...PPLOutData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          tmp.push(MQTTNewData)
          setPPLOutData(tmp)
        }
        break
      }
    }
  }, [MQTTNewData, alarmData, PPLInData, PPLOutData])

  return (
    <div className={styles.container}>
      {/* <div>{JSON.stringify(alarmData)}</div> */}
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
              <div className={controlStyle.barChart}>
                <BarChart data={[
                  { date: '7:00', count: totalInOut['7'] || 0 },
                  { date: '8:00', count: totalInOut['8'] || 0 },
                  { date: '9:00', count: totalInOut['9'] || 0 },
                  { date: '10:00', count: totalInOut['10'] || 10 },
                  { date: '11:00', count: totalInOut['11'] || 0 },
                  { date: '12:00', count: totalInOut['12'] || 0 },
                  { date: '13:00', count: totalInOut['13'] || 0 },
                  { date: '14:00', count: totalInOut['14'] || 20 },
                  { date: '15:00', count: totalInOut['15'] || 0 },
                  { date: '16:00', count: totalInOut['16'] || 50 },
                  { date: '17:00', count: totalInOut['17'] || 0 },
                  { date: '18:00', count: totalInOut['18'] || 0 },
                  { date: '19:00', count: totalInOut['19'] || 0 },
                  { date: '20:00', count: totalInOut['20'] || 0 },
                  { date: '21:00', count: totalInOut['21'] || 0 },
                ]} />
              </div>
            </div>

            <div className={adminStyle.row}>
              <Log contents={alarmData} />
              <TextLog />
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export default Admin;
