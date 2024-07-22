import React from 'react';
import styles from './style.module.scss';

const WinKeyboard: React.FC = () => (
    <div className={styles.cont}>
        <div className={styles.row}>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDelete}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.btnTab}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.btnCapsLock}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnEnter}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.btnShift}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnShift}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnCmd}></div>
            <div className={styles.btnSpace}></div>
            <div className={styles.btnCmd}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
            <div className={styles.btnDefault}></div>
        </div>
    </div>
);

export default WinKeyboard;
