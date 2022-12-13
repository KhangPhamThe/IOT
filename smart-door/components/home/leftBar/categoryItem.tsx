import styles from 'styles/leftBar.module.scss';
import generalStyles from 'styles/general.module.scss';
import { useMemo } from 'react';
import Link from 'next/link';

interface CategoryItemProps {
    icon: React.ReactNode;
    title: string;
    active?: boolean;
    setActive?: () => void;
    unavailable?: boolean;
    url?: string;
    style?: React.CSSProperties;
}

const CategoryItem = ({ icon, title, style, active = false, unavailable, url, setActive }: CategoryItemProps) => {
    const finalClassName = useMemo(() => {
        let returnedClass = styles.categoryItem;
        if (active) returnedClass += ` ${generalStyles.whiteText}`;
        if (unavailable) returnedClass += ` ${generalStyles.blockCursor}`;
        return returnedClass;
    }, [active, unavailable]);

    if (url) return (
        <Link href={url}>
            <div className={finalClassName} style={style}>
                {icon}
                <h3>{title}</h3>

                {/* Active cursor */}
                {active && <div className={styles.activeCursor}></div>}
            </div>
        </Link>
    )

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