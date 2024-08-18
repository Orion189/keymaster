import { FC, memo, useMemo } from 'react';
import { FINGER } from '@/enums';
import clsx from 'clsx';
import styles from './style.module.scss';

type MacFingersProps = {
    fingersToHighLight: string[];
};

const MacFingers: FC<MacFingersProps> = memo(({ fingersToHighLight }) => {
    const getCSS = useMemo(
        () => (item: FINGER) => {
            const classes = [styles.finger, styles[item]];

            if (fingersToHighLight.includes(item)) {
                classes.push(styles.active);
            }

            return clsx(classes);
        },
        [fingersToHighLight]
    );

    return (
        <div className={styles.cont}>
            <div className={getCSS(FINGER.LEFT_LITTLE)}></div>
            <div className={getCSS(FINGER.LEFT_RING)}></div>
            <div className={getCSS(FINGER.LEFT_MIDDLE)}></div>
            <div className={getCSS(FINGER.LEFT_INDEX)}></div>
            <div className={getCSS(FINGER.LEFT_THUMB)}></div>
            <div className={getCSS(FINGER.RIGHT_THUMB)}></div>
            <div className={getCSS(FINGER.RIGHT_INDEX)}></div>
            <div className={getCSS(FINGER.RIGHT_MIDDLE)}></div>
            <div className={getCSS(FINGER.RIGHT_RING)}></div>
            <div className={getCSS(FINGER.RIGHT_LITTLE)}></div>
        </div>
    );
});

export default MacFingers;
