import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { reaction } from 'mobx';
import { Key } from '@/enums';
import store from '@/store';

const useKeyPress = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        if (isDrawerOpened) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });
        }

        console.log(event.code, event.key);
    }, [isDrawerOpened]);
    const onKeyUpHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        if (isDrawerOpened) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });
        }
    }, [isDrawerOpened]);

    useEffect(() => {
        reaction(
            () => store.app.isDrawerOpened,
            drawerOpened => setIsDrawerOpened(drawerOpened)
        );
    }, []);

    useEffect(() => {
        // @ts-expect-error: broken typings
        document.addEventListener('keydown', onKeyDownHandler);
        // @ts-expect-error: broken typings
        document.addEventListener('keyup', onKeyUpHandler);
    }, [onKeyDownHandler, onKeyUpHandler]);

    useEffect(
        () => () => {
            // @ts-expect-error: broken typings
            document.removeEventListener('keydown', onKeyDownHandler);
            // @ts-expect-error: broken typings
            document.removeEventListener('keyup', onKeyUpHandler);
        },
        [onKeyDownHandler, onKeyUpHandler]
    );

    return null;
};

export default useKeyPress;
