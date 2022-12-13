import { useCallback } from 'react';
import styles from 'styles/control.module.scss';

interface Icontent {
    created_at: string | Date,
    text: string,
    levelOfImportance?: 'high' | 'medium' | 'low',
}

interface LogProps {
    contents: Icontent[],
    props?: any,
    style?: React.CSSProperties,
    className?: string,
}

const Log = ({contents}:LogProps) => {
    const textStyle = useCallback((levelOfImportance: string)=>{
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
    },[])
    
    return (
        <div className={styles.logContainer}>
            <div className={styles.title}>Noticeable Log</div>
            <div className={styles.buffer}>
                {contents.map((content, index) => (
                    <p className={textStyle(content.levelOfImportance)} key={index}>
                        {`${content.created_at}: ${content.text}`}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Log;