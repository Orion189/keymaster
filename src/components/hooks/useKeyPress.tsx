import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { autorun } from 'mobx';
import { Key } from '@/enums';
import store from '@/store';

type KeyParams = {
    isDrawerOpened: boolean;
    chars: string[],
    position: number;
    keyToPress: string;
    mistakePositions: number[];
};

const useKeyPress = () => {
    const [params, setParams] = useState<KeyParams | undefined>(undefined);
    const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        if (!params || store.exersisePosition === -1) {
            return;
        }

        const { isDrawerOpened, chars, position, keyToPress, mistakePositions } = params;
        
        if (isDrawerOpened) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });
        }
        //console.log(event.code, event.key, keyToPress);

        if (event.key !== keyToPress) {
            store.mistakePositions = [...mistakePositions, position];
            store.mistakeAmount += 1;
        }

        if (chars[position + 1]) {
            store.exersisePosition = position + 1;
        } else {
            store.exersisePosition = -1; // TODO: move to the next exercise
        }
    }, [params]);
    const onKeyUpHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        if (!params) {
            return;
        }

        const { isDrawerOpened, curExNum, exercises, lang } = params;
        
        if (isDrawerOpened) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });
        }
    }, [params]);

    useEffect(() => {
        //store.reset();
        autorun(() => {
            setParams({
                isDrawerOpened: store.app.isDrawerOpened,
                chars: store.exersiseChars,
                position: store.exersisePosition,
                keyToPress: store.keyToPress,
                mistakePositions: store.mistakePositions
            });
        });
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
