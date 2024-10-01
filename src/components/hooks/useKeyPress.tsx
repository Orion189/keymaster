import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { autorun } from 'mobx';
import { Key } from '@/enums';
import store from '@/store';

type KeyParams = {
    isDrawerOpened: boolean;
    chars: string[],
    position: number;
    curExNum: number;
    keyToPress: string;
    mistakePositions: number[];
};

const WORD_CHAR_COUNT = 5;

const useKeyPress = () => {
    const [params, setParams] = useState<KeyParams | undefined>(undefined);
    const onKeyDownHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');
        const keysToNotTrack = [Key.Escape, Key.ShiftLeft, Key.Tab, Key.ControlLeft, Key.AltLeft, Key.MetaLeft, Key.AltRight, Key.MetaRight, Key.ShiftRight];

        if (!params) {
            return;
        }

        const { isDrawerOpened, chars, position, keyToPress, mistakePositions, curExNum } = params;
        
        if (isDrawerOpened || keysToNotTrack.includes(event.code as Key)) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });

            return;
        }

        if (event.code === Key.Enter) {
            store.resetExersise(curExNum);

            return;
        }

        if (event.code === Key.Backspace && chars[position - 1]) {
            const nextPos = position - 1;

            store.exersisePosition = nextPos;

            if (store.mistakePositions.includes(nextPos)) {
                store.mistakePositions = store.mistakePositions.filter(mistakePosition => mistakePosition !== nextPos);
                store.mistakeAmount -= 1;
            }

            return;
        }

        if (event.key === keyToPress) {
            store.charTypedTime = Date.now();

            if (position % WORD_CHAR_COUNT === 0) {
                store.wordTypedTime = Date.now();
            }
        } else {
            store.mistakePositions = [...mistakePositions, position];
            store.mistakeAmount += 1;
        }

        if (chars[position + 1]) {
            store.exersisePosition = position + 1;
        } else {
            const typedSpeedsSum = store.typedSpeeds.reduce((partialSum, value) => partialSum + value, 0);

            store.resultTypedSpeed = Math.trunc(typedSpeedsSum / store.typedSpeeds.length);
            store.resultMistakeAmount = store.mistakeAmount;

            store.resetExersise(curExNum);
        }
    }, [params]);
    const onKeyUpHandler = useCallback((event: KeyboardEvent) => {
        const isCapsLockEnabled = event?.getModifierState('CapsLock');

        if (!params) {
            return;
        }

        const { isDrawerOpened } = params;
        
        if (isDrawerOpened) {
            return;
        }

        if (event.code === Key.CapsLock) {
            store.set('app', { ...store.app, isCapsLockEnabled });
        }
    }, [params]);

    useEffect(() => {
        autorun(() => {
            setParams({
                isDrawerOpened: store.app.isDrawerOpened,
                chars: store.exersiseChars,
                position: store.exersisePosition,
                keyToPress: store.keyToPress,
                mistakePositions: store.mistakePositions,
                curExNum: store.app.curExNum
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
