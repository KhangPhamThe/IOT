import useHasRenderUI from 'common/utils/useHasRenderUI';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from 'styles/control.module.scss';
import MQTTContext from '../context/MQTTProvider';

const TYPE_OF_DATA = {
	ALLOW: 'dadn.allow',	
}

const ADF_URL = {
    ALLOW: `https://io.adafruit.com/api/v2/KhangPhamThe/feeds/${TYPE_OF_DATA.ALLOW}/data`,
};

const ADF_MQTT_URL = {
    ALLOW: `KhangPhamThe/feeds/${TYPE_OF_DATA.ALLOW}`,    
}
interface BtnOpenDoorProps {
    size: "phone" | "web",
    props?: any,
    style?: React.CSSProperties,
    className?: string,
}

const BtnOpenDoor = ({size, ...props}:BtnOpenDoorProps) => {

    const [isDoorOpen, setIsDoorOpen] = useState(false)
    const MQTTNewData = useContext<any>(MQTTContext)

    const containerStyle = useMemo(()=>{
        return size == "phone" ? styles.openDoorPhone : styles.openDoorWeb;
    },[size])
    

    useEffect(() =>  {
        fetch(`${ADF_URL.ALLOW}`)
            .then((rs) => {
            return rs.json();
            })
            .then((json) => {
                const {  value } = json[json.length - 1];
                if (value === "ON")  {
                    setIsDoorOpen(true)
                }
                else {
                    setIsDoorOpen(false)
                }
        })        
    }, [])

    useEffect(() => {
        if (MQTTNewData.feed_key == TYPE_OF_DATA.ALLOW) {
            if (MQTTNewData.value == "ON") {
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
                const {  value } = json[json.length - 1];
                if (value === "ON")  {
                    isOpening = true                    
                } else {
                    isOpening = false
                }
        })

        if (!isOpening) {
            MQTTNewData?.client?.publish(ADF_MQTT_URL.ALLOW, JSON.stringify({
                value: "ON"
            }))
        }
    }        

    // const [height, setHeight] = useState('1px');
    // const hasRenderUI = useHasRenderUI('openDoor-container');

    // useEffect(()=>{
    //     const w = hasRenderUI?.style?.width || '0';
    //     console.log("w: ",hasRenderUI?.style.width)
    //     console.log("w", w)
    //     setHeight(w + 'px');
    // },[hasRenderUI])

    // useEffect(()=>{
    //     console.log(height)
    // },[height])

    return (
        <div className={containerStyle} id='openDoor-container' {...props}>
            <h2 className={styles.title}>Door controller</h2>
            <div className={styles.btnContainer}>
                <button onClick={handleOpenDoor} className={styles.btn}>{isDoorOpen ? "OPEN" : "CLOSING"}</button>
            </div>
        </div>
    )
}

export default BtnOpenDoor