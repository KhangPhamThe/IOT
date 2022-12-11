import useHasRenderUI from 'common/utils/useHasRenderUI';
import { useEffect, useMemo, useState } from 'react';
import styles from 'styles/control.module.scss';


interface BtnOpenDoorProps {
    size: "phone" | "web";
    state?: number;  // 0 is open, 1 is off
}

const BtnOpenDoor = ({size, state=0}:BtnOpenDoorProps) => {
    const containerStyle = useMemo(()=>{
        return size == "phone" ? styles.openDoorPhone : styles.openDoorWeb;
    },[size])
    
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
        <div className={containerStyle} id='openDoor-container'>
            <h2 className={styles.title}>Điều khiển cửa</h2>
            <div className={styles.btnContainer}>
                <button className={styles.btn}>OPEN</button>
            </div>
        </div>
    )
}

export default BtnOpenDoor