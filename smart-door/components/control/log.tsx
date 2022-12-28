import { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from 'styles/control.module.scss';

interface Icontent {
    date: string,
    time: string,
    value: string,
    levelOfImportance?: 'high' | 'medium' | 'low',
    created_at: string,
}

interface LogProps {
    contents: Icontent[],
    props?: any,
    style?: React.CSSProperties,
    className?: string,
}

const MAX_LOG_SIZE = 100;

const Log = ({ contents, ...props }: LogProps) => {
    const lastElement = useRef<any>(null);

    const textStyle = useCallback((levelOfImportance: string | undefined) => {
        switch (levelOfImportance) {
            case 'high':
                return styles.high + ' ' + styles.text
            case 'medium':
                return styles.medium + ' ' + styles.text
            case 'low':
                return styles.low + ' ' + styles.text
            default:
                return styles.text
        }
    }, [])

    useEffect(()=>{
        if (lastElement.current) lastElement.current.scrollIntoView({ behavior: 'smooth' });
    },[contents])

    return (
        <div className={styles.logContainer} {...props}>
            <div className={styles.title}>Noticeable Log</div>
            <div className={styles.buffer}>
                {contents.map((content, index) => {
                    if (index === contents.length - 1) return (
                        <p className={textStyle(content.levelOfImportance)} key={index} ref={lastElement}>
                            {`${content.date} [${content.time}]: ${content.value}`}
                        </p>
                    )
                    else if (index < MAX_LOG_SIZE - 1) return (
                        <p className={textStyle(content.levelOfImportance)} key={index}>
                            {`${content.date} [${content.time}]: ${content.value}`}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Log;