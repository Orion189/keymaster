import React, { KeyboardEvent, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import TopBlock from '@components/main/TopBlock';
import CenterBlock from '@components/main/CenterBlock';
import BottomBlock from '@components/main/BottomBlock';
import styles from './style.module.scss';

const App: React.FC = () => {
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        console.log(event.code, event.key);
        console.log('isCapsLockEnabled:', isCapsLockEnabled);
    }, []);

    return (
        <div className={styles.cont} onKeyDown={onKeyDown} autoFocus tabIndex={0}>
            <TopBlock />
            <CenterBlock />
            <BottomBlock />
        </div>
    );
};

// <Link to={'/second'}>{'Go Second'}</Link>
export default App;
