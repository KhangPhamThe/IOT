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
  lastDate.setDate(lastDate.getDate() - 1);
  lastDate.setHours(0);
  const returnVal: any = [];

  for (let i = 7; i <= 21; i++) {
    lastDate.setHours(i);
    let tempObj: any = {
      hour: String(i) + "h",
      count: 0,
    }
    // if (tempObj.date === '15/12/2022') {
    //   tempObj.hours = [7, 13, 16, 20];
    // }
    for (let jsonDate of jsonDates) {
      const date = new Date(jsonDate);
      if (date.getHours() === lastDate.getHours()) {
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
    lastDateStart.setDate(lastDateStart.getDate()); // lastDateStart.setDate(lastDateStart.getDate() - 1);
    lastDateStart.setHours(7);
    lastDateStart.setMinutes(0);
    lastDateStart.setSeconds(0);
    lastDateStart.setMilliseconds(0);

    const lastDateEnd = new Date();
    lastDateEnd.setDate(lastDateEnd.getDate()); // lastDateEnd.setDate(lastDateEnd.getDate() - 1);
    lastDateEnd.setHours(21);
    lastDateEnd.setMinutes(59);
    lastDateEnd.setSeconds(59);
    lastDateEnd.setMilliseconds(0);

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
          tmp.sort((a: any, b: any) => {
            const tmpB = new Date(b.created_at);
            const tmpA = new Date(a.created_at);
            return tmpB < tmpA ? 1 : -1;
          })
        });
        setAlarmData(tmp);
      })
      .catch((e) => { console.error(e) });

    fetch(ADF_URL.PPL_IN + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`) // + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`)
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
      })
      .catch((e) => { console.error(e) });

    fetch(ADF_URL.PPL_OUT + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`) // + `?start_time=${lastDateStart.toJSON()}&end_time=${lastDateEnd.toJSON()}`)
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
      })
      .catch((e) => { console.error(e) });
  }, [route.pathname]);


  useEffect(() => {
    if (PPLInData.length > 0 || PPLOutData.length > 0) {
      const dataIn = timeParsing(PPLInData);
      dataIn && console.log("for PPLIn", dataIn[0].count + dataIn[1].count + dataIn[2].count + dataIn[3].count + dataIn[4].count + dataIn[5].count + dataIn[6].count + dataIn[7].count + dataIn[8].count + dataIn[9].count + dataIn[10].count + dataIn[11].count + dataIn[12].count + dataIn[13].count + dataIn[14].count)

      const dataOut = timeParsing(PPLOutData);
      dataOut && console.log("for PPLOut", dataOut[0].count + dataOut[1].count + dataOut[2].count + dataOut[3].count + dataOut[4].count + dataOut[5].count + dataOut[6].count + dataOut[7].count + dataOut[8].count + dataOut[9].count + dataOut[10].count + dataOut[11].count + dataOut[12].count + dataOut[13].count + dataOut[14].count)

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
          // if (tmpObj.hour === '13h') tmpObj.count +d
          tmpValue.push(tmpObj);
        }
        console.log("count PPL", tmpValue[0].count + tmpValue[1].count + tmpValue[2].count + tmpValue[3].count + tmpValue[4].count + tmpValue[5].count + tmpValue[6].count + tmpValue[7].count + tmpValue[8].count + tmpValue[9].count + tmpValue[10].count + tmpValue[11].count + tmpValue[12].count + tmpValue[13].count + tmpValue[14].count)
        setTotalInOutV2(tmpValue);
      }
    }
  }, [PPLInData, PPLOutData])

  useEffect(()=>{
    console.log("new Date()", new Date('2022-12-28T07:49:11Z'));
    console.log("new Date().toJSON()", new Date().toJSON());
    console.log("new Date().toLocaleDateString()", new Date().toLocaleDateString());
    console.log("new Date().toLocaleDateString('pt-PT')", new Date().toLocaleDateString('pt-PT'));
  },[])


  useEffect(() => {
    switch (MQTTNewData.feed_key) {
      case TYPE_OF_DATA.ALARM: {
        const tmp: any = [...alarmData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          console.log("MQTTNewData: ", MQTTNewData);
          const { date, time } = parseTime(MQTTNewData.created_at)
          tmp.push({
            created_at: MQTTNewData.created_at,
            value: MQTTNewData.value,
            date,
            time,
            levelOfImportance: evaluateLogImportance(MQTTNewData.value),
          })
          tmp.sort((a: any, b: any) => {
            const tmpB = new Date(b.created_at);
            const tmpA = new Date(a.created_at);
            return tmpB < tmpA ? 1 : -1;
          })
          setAlarmData(tmp)
        }
        break
      }
      case TYPE_OF_DATA.PPL_IN: {
        const tmp: any = [...PPLInData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          console.log("recieved PPL_IN", JSON.stringify(MQTTNewData))
          tmp.push(MQTTNewData)
          setPPLInData(tmp)
        }
        break
      }
      case TYPE_OF_DATA.PPL_OUT: {
        const tmp: any = [...PPLOutData]
        if (tmp?.length > 0 && tmp[tmp.length - 1].created_at !== MQTTNewData.created_at) {
          console.log("recieved PPL_OUT", JSON.stringify(MQTTNewData))
          tmp.push(MQTTNewData)
          setPPLOutData(tmp)
        }
        break
      }
    }
  }, [MQTTNewData, alarmData, PPLInData, PPLOutData])

  // useEffect(()=>{
  //   console.log("totalInOutV2: ", JSON.stringify(totalInOutV2[0]?.hour))
  //   let tempObj = totalInOutV2;
  //   tempObj.map((obj:any, index:any) => {
  //     if (obj?.hour === '13h') {
  //       tempObj[index].count = 14;
  //       // console.log("Obj", JSON.stringify(obj))
  //     }
  //   })
  //   console.log("tempObj", JSON.stringify(tempObj))
  //   setTotalInOutV2(tempObj);
  // },[totalInOutV2])

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
