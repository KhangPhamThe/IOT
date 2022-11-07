import styles from 'styles/leftBar.module.scss';
import generalStyles from 'styles/general.module.scss';
import { useMemo } from 'react';

interface CategoryItemProps {
    icon: React.ReactNode;
    title: string;
    active?: boolean;
    unavailable?: boolean;
    style?: React.CSSProperties;
}

const CategoryItem = ({icon, title, style, active=false, unavailable}:CategoryItemProps) => {
    const finalClassName = useMemo(() => {
        let returnedClass = styles.categoryItem;
        if (active) returnedClass += ` ${generalStyles.whiteText}`;
        if (unavailable) returnedClass += ` ${generalStyles.blockCursor}`;
        return returnedClass;
    },[active, unavailable]);

    return (
        <div className={finalClassName} style={style}>
            {icon}
            <h3>{title}</h3>

            {/* Active cursor */}
            {active && <div className={styles.activeCursor}></div>}
        </div>
    )
}

export default CategoryItem;