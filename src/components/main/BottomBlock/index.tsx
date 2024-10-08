import { memo, FC } from 'react';
import MacKeyboard from '@components/main/MacKeyboard';
import WinKeyboard from '@components/main/WinKeyboard';
import styles from './style.module.scss';

const BottomBlock: FC = memo(() => {
    const isMac = window.__APP_PLATFORM__ === 'darwin';

    return <div className={styles.cont}>{isMac ? <MacKeyboard /> : <WinKeyboard />}</div>;
});

export default BottomBlock;
