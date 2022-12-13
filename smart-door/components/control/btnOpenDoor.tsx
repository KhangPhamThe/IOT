import { useEffect, useMemo, useState } from 'react';
import styles from 'styles/control.module.scss';


interface BtnOpenDoorProps {
    size: "phone" | "web",
    props?: any,
    style?: React.CSSProperties,
    className?: string,
}

const BtnOpenDoor = ({size, ...props}:BtnOpenDoorProps) => {
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
        <div className={containerStyle} id='openDoor-container' {...props}>
            <h2 className={styles.title}>Door controller</h2>
            <div className={styles.btnContainer}>
                <button className={styles.btn}>OPEN</button>
            </div>
        </div>
    )
}

export default BtnOpenDoor