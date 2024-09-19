import store from '@/store';
import { reaction } from 'mobx';
import { useEffect, useCallback, useRef } from 'react';

type TypedTimeParams = {
    charTypedTime: number;
};

const useTypingSpeed = () => {
    const paramsRef = useRef<TypedTimeParams | undefined>(undefined);
    const timeoutRef = useRef<number | undefined>(undefined);
    const checkSpeed = useCallback(() => {
        if (paramsRef.current) {
            const delta = ((new Date().getTime() - new Date(paramsRef.current.charTypedTime).getTime()) / 1000);
            const charTypedSpeed = Math.trunc(60 / delta);

            if (charTypedSpeed < 1000) {
                store.charTypedSpeed = charTypedSpeed;
            }
        }
 
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(checkSpeed, 1000);
    }, [paramsRef]);

    const handleCharTypedTimeChange = useCallback((newParams: TypedTimeParams, prevParams: TypedTimeParams) => {
        paramsRef.current = newParams;

        if (prevParams.charTypedTime === 0) {
            checkSpeed();
        }

        if (newParams.charTypedTime === 0) {
            window.clearTimeout(timeoutRef.current);
        }
    }, [checkSpeed]);

    useEffect(() => {
        reaction(
            () => ({
                charTypedTime: store.charTypedTime
            }),
            (newParams, prevParams) => handleCharTypedTimeChange(newParams, prevParams)
        );
    }, []);

    return null;
};

export default useTypingSpeed;
