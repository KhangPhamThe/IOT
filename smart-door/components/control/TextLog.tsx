import { useAppSelector } from "hooks"
import { useRouter } from "next/router"
import { userAPI } from "pages/api/users/authenAPI"
import React, { useRef, useEffect, useState } from "react"
import controlStyle from 'styles/control.module.scss'



const Point = ({ index, type, hour, position, nextHour }: any) => {
    const finalPosition = position || String((hour - 7) * 35) + "px";
    const finalWidth = String((nextHour - hour)*35) + "px";

    if (!position && (hour < 7 || hour > 21)) return <></>;

    if (type === "in" || index % 2 === 0) return (
        <div className={controlStyle.point} style={{ left: finalPosition }}>
            {nextHour <= 21 && <div className={controlStyle.bar} style={{left: '8px', width: finalWidth}}></div>}
        </div>
    )
    else return (
        <div className={controlStyle.arrowRight} style={{ left: finalPosition }}></div>
    )
}


const timeParsing = (jsonDates: string[]) => {
    const today = new Date();
    const returnVal: any = [];

    for (let i = 0; i < 7; i++) {
        const curDate = new Date();
        curDate.setDate(today.getDate() - i);
        let tempObj: any = {
            date: curDate.toLocaleDateString('pt-PT'),
            hours: [],
        }
        if (tempObj.date === '15/12/2022') {
            tempObj.hours = [7, 13, 16, 20];
        }
        for (let jsonDate of jsonDates) {
            const date = new Date(jsonDate);
            if (date.toLocaleDateString() === curDate.toLocaleDateString()) {
                tempObj.hours.push(date.getHours())
            }
        }
        returnVal.push(tempObj);
    }

    console.log("returnVal: ", returnVal);
    return returnVal
}

const TextLog = () => {
    const currUserSelection = useAppSelector(state => state.user);
    const route = useRouter();
    const emailRef = useRef<any>(null);
    const [data, setData] = useState<any>([]);
    const [finalData, setFinalData] = useState<any>(null);

    const handleOnClick = () => {
        if (emailRef.current.value)
            (async () => {
                const rs = await userAPI.getSignalInOutByEmail({ email: emailRef.current.value });
                const timeArr: string[] = [];
                rs.map((item: any) => {
                    timeArr.push(item?.createdAt)
                })
                setData(timeArr);
            })();
    }

    useEffect(() => {
        (async () => {
            const rs = await userAPI.getSignalInOutByEmail({ email: currUserSelection.current?.email || "" });
            const timeArr: string[] = [];
            rs.map((item: any) => {
                timeArr.push(item?.createdAt)
            })
            setData(timeArr);
        })();
    }, [route.pathname])

    useEffect(() => {
        setFinalData(timeParsing(data));
    }, [data])

    // timeParsing(data);

    return (
        <div className={controlStyle.TextLogContainer}>
            <div className={controlStyle.inputField}>
                <input ref={emailRef} />
                <button onClick={handleOnClick}>send</button>
            </div>

            <div className={controlStyle.gr + " " + controlStyle.header}>
                <div className={controlStyle.left + " " + controlStyle.title}>
                    <p>Day</p>
                </div>
                <div className={controlStyle.right} style={{ height: '100%' }}>
                    <div className={controlStyle.timeTitle}>
                        <p style={{ left: '-2px' }}>7h</p>
                        <p style={{ left: '68px' }}>9h</p>
                        <p style={{ left: '134px' }}>11h</p>
                        <p style={{ left: '204px' }}>13h</p>
                        <p style={{ left: '274px' }}>15h</p>
                        <p style={{ left: '344px' }}>17h</p>
                        <p style={{ left: '414px' }}>19h</p>
                        <p style={{ left: '484px' }}>21h</p>
                    </div>

                </div>
            </div>

            <div className={controlStyle.scrollable}>

                {finalData !== null && finalData.map((data: any, pIndex: any) => (
                    <div className={controlStyle.gr} key={pIndex}>
                        <div className={controlStyle.left}>
                            <p>{data.date}</p>
                        </div>
                        <div className={controlStyle.right}>
                            <div className={controlStyle.timeGr}>
                                {data.hours.map((hour: any, index: any) => (
                                    <Point index={index} hour={hour} nextHour={data.hours[index+1]}/>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}


            </div>

        </div>

    )
}

export default TextLog