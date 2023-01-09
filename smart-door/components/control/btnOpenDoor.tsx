import useHasRenderUI from 'common/utils/useHasRenderUI';
import { useAppSelector } from 'hooks';
import { userAPI } from 'pages/api/users/authenAPI';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from 'styles/control.module.scss';
import MQTTContext from '../context/MQTTProvider';

const TYPE_OF_DATA = {
    ALLOW: 'dadn.allow',
    ALARM: 'dadn.alarm',
}

const ADF_URL = {
    ALLOW: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.ALLOW}/data`,
};

const ADF_MQTT_URL = {
    ALLOW: `KhangPhamThe/feeds/${TYPE_OF_DATA.ALLOW}`,
    ALARM: `KhangPhamThe/feeds/${TYPE_OF_DATA.ALARM}`,
}
interface BtnOpenDoorProps {
    size: "phone" | "web",
    props?: any,
    style?: React.CSSProperties,
    className?: string,
}

const BtnOpenDoor = ({ size, ...props }: BtnOpenDoorProps) => {

    const [isDoorOpen, setIsDoorOpen] = useState(false)
    const currentUser = useAppSelector(state => state.user)
    const MQTTNewData = useContext<any>(MQTTContext)

    const containerStyle = useMemo(() => {
        return size == "phone" ? styles.openDoorPhone : styles.openDoorWeb;
    }, [size])


    useEffect(() => {
        fetch(`${ADF_URL.ALLOW}`)
            .then((rs) => {
                return rs.json();
            })
            .then((json) => {
                const { value } = json[0];
                console.log("value", value, value === "1");
                if (value === "1") {     // ON
                    setIsDoorOpen(true)
                }
                else {
                    setIsDoorOpen(false)
                }
            })
            .catch((e) => { console.error(e) })
    }, [])

    useEffect(() => {
        if (MQTTNewData.feed_key == TYPE_OF_DATA.ALLOW) {
            if (MQTTNewData.value == "1") {   // ON
                setIsDoorOpen(true)
            } else {
                setIsDoorOpen(false)
            }
        }
    }, [MQTTNewData])

    const handleOpenDoor = async () => {
        let isOpening = false
        await fetch(`${ADF_URL.ALLOW}`)
            .then((rs) => {
                return rs.json();
            })
            .then((json) => {
                const { value } = json[0];    //const { value } = json[json.length - 1];
                console.log("value", value, value === "1");
                if (value === "1") {     // ON
                    isOpening = true
                } else {
                    isOpening = false
                }
            })
            .catch((e) => { console.error(e) })

        if (!isOpening) {
            MQTTNewData?.client?.publish(ADF_MQTT_URL.ALLOW, JSON.stringify({
                value: "1"  // ON
            }))
            // const date = new Date();
            // if (date.getHours() >= 9) {
            //     MQTTNewData?.client?.publish(ADF_MQTT_URL.ALARM, JSON.stringify({
            //         value: `${currentUser.current?.email} goes to work late !!`  // ON
            //     }))
            // }
            console.log("has publish 1 to allow", MQTTNewData?.client?.publish);
            await userAPI.createNewSignalInOutDoor({
                email: currentUser?.current?.email || ''
            })
        }
    }

    return (
        <div className={containerStyle} id='openDoor-container' {...props}>
            <h2 className={styles.title}>Door controller</h2>
            <div className={styles.btnContainer}>
                <button onClick={handleOpenDoor} className={isDoorOpen ? styles.btnDisable : styles.btn} disabled={isDoorOpen}>{isDoorOpen ? "OPENING" : "OPEN"}</button>
            </div>
        </div>
    )
}

export default BtnOpenDoor