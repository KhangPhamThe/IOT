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
  PPL_IN: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.PPL_IN}/data`, //?start_time=2022-12-20+22:33:22+UTC
  PPL_OUT: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.PPL_OUT}/data`, //?start_time=2022-12-21T07:58:50Z
};


const timeParsing = (jsonDates: string[]) => {
  if (jsonDates.length === 0) return false;

  // const today = new Date();
  const lastDate = new Date();
  lastDate.setUTCDate(lastDate.getUTCDate() - 1);
  lastDate.setUTCHours(0);
  const returnVal: any = [];

  for (let i = 7; i <= 21; i++) {
    lastDate.setUTCHours(i);
    let tempObj: any = {
      hour: String(i) + "h",
      count: 0,
    }
    // if (tempObj.date === '15/12/2022') {
    //   tempObj.hours = [7, 13, 16, 20];
    // }
    for (let jsonDate of jsonDates) {
      const date = new Date(jsonDate);
      if (date.getUTCHours() === lastDate.getUTCHours()) {
        tempObj.count += 1;
      }
    }
    returnVal.push(tempObj);
  }

  // console.log("returnVal123: ", returnVal);
  return returnVal
}

const Admin = () => {
  const route = useRouter();
  const [alarmData, setAlarmData] = useState<any>([]);
  const [totalInOut, setTotalInOut] = useState<any>([]);

  const [PPLInData, setPPLInData] = useState<any>([]);
  const [PPLOutData, setPPLOutData] = useState<any>([]);
  const [totalInOutV2, setTotalInOutV2] = useState<any>([]);
  const MQTTNewData = useContext(MQTTContext);


  useEffect(() => {
    (async () => {
      const rs = await userAPI.getCountInOutDoor();
      setTotalInOut(rs);
    })();
  }, [route.pathname])


  useEffect(() => {
    const lastDateStart = new Date();
    lastDateStart.setUTCDate(lastDateStart.getUTCDate() - 1);
    lastDateStart.setUTCHours(7);
    lastDateStart.setUTCMinutes(0);
    lastDateStart.setUTCSeconds(0);
    lastDateStart.setUTCMilliseconds(0);

    const lastDateEnd = new Date();
    lastDateEnd.setUTCDate(lastDateEnd.getUTCDate() - 1);
    lastDateEnd.setUTCHours(21);
    lastDateEnd.setUTCMinutes(59);
    lastDateEnd.setUTCSeconds(59);
    lastDateEnd.setUTCMilliseconds(0);

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

    fetch(ADF_URL.PPL_IN + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          // tmp.push({
          //   created_at,
          //   value,
          // });
          tmp.push(created_at);
        });
        setPPLInData(tmp);
      });

    fetch(ADF_URL.PPL_OUT + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`)
      .then((rs) => {
        return rs.json();
      })
      .then((json) => {
        const tmp: any = [];
        json?.map((item: any) => {
          const { created_at, feed_key, value } = item;
          // tmp.push({
          //   created_at,
          //   value,
          // });
          tmp.push(created_at);
        });
        setPPLOutData(tmp);
      });
  }, [route.pathname]);


  useEffect(() => {
    if (PPLInData.length > 0 || PPLOutData.length > 0) {
      const dataIn = timeParsing(PPLInData);
      console.log("for PPLIn", dataIn)
      const dataOut = timeParsing(PPLOutData);
      console.log("for PPLOut", dataOut)

      if (!dataOut) setTotalInOutV2(dataIn);
      else if (!dataIn) setTotalInOutV2(dataOut);
      else {
        const tmpValue: any = [];
        for (let i=0;i<15;i++) {
          const tmpObj = {
            hour: String(i+7) + "h",
            count: 0,
          }
          tmpObj.count = dataIn[i].count + dataOut[i].count;
          tmpValue.push(tmpObj);
        }
        console.log("tmpValue: ", tmpValue);
        setTotalInOutV2(tmpValue);
      }
    }
  }, [PPLInData, PPLOutData])


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

  useEffect(()=>{
    console.log("totalInOutV2: ", JSON.stringify(totalInOutV2[0]?.hour))
  },[totalInOutV2])

  return (
    <div className={styles.container}>
      {/* <div>{JSON.stringify(alarmData)}</div> */}
      <div>{JSON.stringify(PPLInData)}</div>
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
                <BarChart data={totalInOutV2} />
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
