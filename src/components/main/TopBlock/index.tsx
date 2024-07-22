import React from 'react';
import SpeedIcon from '@mui/icons-material/Speed';
import ErrorIcon from '@mui/icons-material/Error';
import PercentIcon from '@mui/icons-material/Percent';
import styles from './style.module.scss';

const TopBlock: React.FC = () => (
    <div className={styles.cont}>
        <div className={styles.paramBlock}>
            <SpeedIcon className={styles.paramIcon} />
            <div className={styles.paramDataCont}>
                <div className={styles.paramDataValue}>0</div>
                <div className={styles.paramDataTitle}>char/min</div>
            </div>
        </div>
        <div className={styles.paramBlock}>
            <PercentIcon className={styles.paramIcon} />
            <div className={styles.paramDataCont}>
                <div className={styles.paramDataValue}>100</div>
                <div className={styles.paramDataTitle}>accuracy</div>
            </div>
        </div>
        <div className={styles.paramBlock}>
            <ErrorIcon className={styles.paramIcon} />
            <div className={styles.paramDataCont}>
                <div className={styles.paramDataValue}>0</div>
                <div className={styles.paramDataTitle}>typos</div>
            </div>
        </div>
    </div>
);

export default TopBlock;
