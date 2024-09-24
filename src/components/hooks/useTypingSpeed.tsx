import store from '@/store';
import { reaction } from 'mobx';
import { TYPING_SPEED } from '@/enums';
import { useEffect, useCallback, useRef } from 'react';

type TypedTimeParams = {
    charTypedTime: number;
    wordTypedTime: number;
    typingSpeed: TYPING_SPEED;
};

const useTypingSpeed = () => {
    const paramsRef = useRef<TypedTimeParams | undefined>(undefined);
    const intervalRef = useRef<number | undefined>(undefined);
    const calculateSpeed = useCallback(() => {
        if (paramsRef.current) {
            const { typingSpeed, charTypedTime, wordTypedTime } = paramsRef.current;

            switch (typingSpeed) {
                case TYPING_SPEED.CHARACTERS: {
                    const delta = ((new Date().getTime() - new Date(charTypedTime).getTime()) / 1000);
                    const charTypedSpeed = Math.trunc(60 / delta);

                    store.typedSpeed = charTypedSpeed;
                    
                    if (charTypedSpeed !== 0) {
                        store.typedSpeeds = [...store.typedSpeeds, charTypedSpeed];
                    }
                
                    break;
                }
                case TYPING_SPEED.WORDS: {
                    const delta = ((new Date().getTime() - new Date(wordTypedTime).getTime()) / 1000);
                    const wordTypedSpeed = Math.trunc(60 / delta);

                    store.typedSpeed = wordTypedSpeed;

                    if (wordTypedSpeed !== 0) {
                        store.typedSpeeds = [...store.typedSpeeds, wordTypedSpeed];
                    }
                
                    break;
                }
            }   
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
                charTypedTime: store.charTypedTime,
                wordTypedTime: store.wordTypedTime,
                typingSpeed: store.settings.typingSpeed
            }),
            (newParams) => handleCharTypedTimeChange(newParams)
        );
    }, []);

    return null;
};

export default useTypingSpeed;
