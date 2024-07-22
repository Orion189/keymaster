import React from 'react';
import styles from './style.module.scss';
import MacKeyboard from '@components/main/MacKeyboard';
import WinKeyboard from '@components/main/WinKeyboard';

const BottomBlock: React.FC = () => {
    const isMac = window.__APP_PLATFORM__ === 'darwin';

    return isMac ? <MacKeyboard /> : <WinKeyboard />;
};

export default BottomBlock;
