import React from 'react';
import { Link } from 'react-router-dom';
import SpeedIcon from '@mui/icons-material/Speed';
import ErrorIcon from '@mui/icons-material/Error';
import PercentIcon from '@mui/icons-material/Percent';
import styles from './style.module.scss';

const App: React.FC = () => (
    <div className={styles.cont}>
        <div className={styles.topBlock}>
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
        <div className={styles.centerBlock}>
            dhfg sdfhghj sdjfh djsfg dhhh kaadfs dfhb sbd sdhf hsdf shdgfh sjdhfjg sgdf sdjf hgsdfhj hjsdf lkjsdklfj lkssdlj lsdkfk sdfkj lksdfj
        </div>
        <div className={styles.bottomBlock}>{'App Component'}</div>
    </div>
);
// <Link to={'/second'}>{'Go Second'}</Link>
export default App;
