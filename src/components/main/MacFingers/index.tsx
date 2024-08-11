import { FC, memo } from 'react';
import { FINGER } from '@/enums';
import styles from './style.module.scss';

const MacFingers: FC = memo(() => (
    <div className={styles.cont}>
        <div className={`${styles.finger} ${styles[FINGER.LEFT_LITTLE]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.LEFT_RING]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.LEFT_MIDDLE]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.LEFT_INDEX]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.LEFT_THUMB]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.RIGHT_THUMB]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.RIGHT_INDEX]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.RIGHT_MIDDLE]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.RIGHT_RING]}`}></div>
        <div className={`${styles.finger} ${styles[FINGER.RIGHT_LITTLE]}`}></div>
    </div>
));

export default MacFingers;
