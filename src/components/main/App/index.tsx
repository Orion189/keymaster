import React, { KeyboardEvent, useCallback, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import TopBlock from '@components/main/TopBlock';
import CenterBlock from '@components/main/CenterBlock';
import BottomBlock from '@components/main/BottomBlock';
import store from '@/store';
import styles from './style.module.scss';

const App: React.FC = () => {
    const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        console.log(event.code, event.key);
        console.log('isCapsLockEnabled:', isCapsLockEnabled);

        store.set('app', { ...store.app, isCapsLockEnabled });
    }, []);
    const onKeyUpHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        store.set('app', { ...store.app, isCapsLockEnabled });
    }, []);

    useEffect(() => {
        // @ts-expect-error: broken typings
        document.addEventListener('keydown', onKeyDownHandler);
        // @ts-expect-error: broken typings
        document.addEventListener('keyup', onKeyUpHandler);
    }, []);

    useEffect(
        () => () => {
            // @ts-expect-error: broken typings
            document.removeEventListener('keydown', onKeyDownHandler);
            // @ts-expect-error: broken typings
            document.removeEventListener('keyup', onKeyUpHandler);
        },
        []
    );

    return (
        <div className={styles.cont}>
            <TopBlock />
            <CenterBlock />
            <BottomBlock />
        </div>
    );
};

// <Link to={'/second'}>{'Go Second'}</Link>
export default App;
