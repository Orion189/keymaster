import store from '@/store';
import { reaction } from 'mobx';
import { useEffect, useCallback, useRef } from 'react';

type TypedTimeParams = {
    charTypedTime: number;
};

const useTypingSpeed = () => {
    const paramsRef = useRef<TypedTimeParams | undefined>(undefined);
    const intervalRef = useRef<number | undefined>(undefined);
    const calculateSpeed = useCallback(() => {
        if (paramsRef.current) {
            const delta = ((new Date().getTime() - new Date(paramsRef.current.charTypedTime).getTime()) / 1000);
            const charTypedSpeed = Math.trunc(60 / delta);

            store.charTypedSpeed = charTypedSpeed;
        }
    }, [paramsRef]);
    const handleCharTypedTimeChange = useCallback((newParams: TypedTimeParams) => {
        paramsRef.current = newParams;

        window.clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(calculateSpeed, 500);
    }, [calculateSpeed]);

    useEffect(() => {
        reaction(
            () => ({
                charTypedTime: store.charTypedTime
            }),
            (newParams) => handleCharTypedTimeChange(newParams)
        );
    }, []);

    return null;
};

export default useTypingSpeed;
