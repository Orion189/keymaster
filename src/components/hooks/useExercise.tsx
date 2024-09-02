import { useEffect, useCallback } from 'react';
import { letters, numbers, capitalLetters, symbols } from '@/configs/lessons.config';
import { reaction } from 'mobx';
import { LOCALE } from '@/enums';
import type { ExerciseGeneralType } from '@/types';
import store from '@/store';
import { arrShuffle } from '@/utils/common.util';

type ExerciseParams = {
    lang: LOCALE;
    curExNum: number;
    exercises: ExerciseGeneralType;
    isNumbersEnabled: boolean;
    isUpperCaseEnabled: boolean;
    isPunctuationEnabled: boolean;
};

const STRING_LENGTH = 80;

const useExercise = () => {
    const getExercise = useCallback(
        (lang: LOCALE, curExNum: number, isNumbersEnabled: boolean, isUpperCaseEnabled: boolean, isPunctuationEnabled: boolean) => {
            let chars = [];
            const lettersConfig = letters[lang][curExNum];
            const capitalLettersConfig = capitalLetters[lang][curExNum];
            const symbolsConfig = symbols[lang];
            const numbersConfig = numbers;

            if (!lettersConfig || !capitalLettersConfig || !symbolsConfig || !numbersConfig) {
                return;
            }

            chars = lettersConfig.join('').repeat(25).split('');

            if (isUpperCaseEnabled) {
                chars.push(...capitalLettersConfig.join('').repeat(6).split(''));
            }

            if (isNumbersEnabled) {
                chars.push(...numbersConfig.join('').repeat(6).split(''));
            }

            if (isPunctuationEnabled) {
                chars.push(...symbolsConfig);
            }

            chars.push(...Array.from(' '.repeat(10)));

            chars = arrShuffle(chars).slice(0, STRING_LENGTH).join('').trim().split('');

            return {
                chars,
                position: 0
            };
        },
        []
    );
    const setExercise = useCallback((params: ExerciseParams, prevParams: ExerciseParams) => {
        const { lang, exercises, curExNum, isNumbersEnabled, isUpperCaseEnabled, isPunctuationEnabled } = params;
        const isTogglesChanged =
            isNumbersEnabled !== prevParams.isNumbersEnabled ||
            isUpperCaseEnabled !== prevParams.isUpperCaseEnabled ||
            isPunctuationEnabled !== prevParams.isPunctuationEnabled;

        if (!letters[lang] || !lang) {
            return;
        }

        if (!Array.isArray(exercises[lang])) {
            exercises[lang] = [];
        }

        if (!exercises[lang][curExNum] || isTogglesChanged) {
            const exercise = getExercise(
                lang,
                curExNum,
                isNumbersEnabled,
                isUpperCaseEnabled,
                isPunctuationEnabled
            );

            if (exercise) {
                exercises[lang][curExNum] = exercise;
    
                store.set('app', { ...store.app, exercises });
            }
        }
    }, [getExercise]);

    useEffect(() => {
        reaction(
            () => ({
                lang: store.settings.lang,
                curExNum: store.app.curExNum,
                exercises: store.app.exercises,
                isNumbersEnabled: store.settings.isNumbersEnabled,
                isUpperCaseEnabled: store.settings.isUpperCaseEnabled,
                isPunctuationEnabled: store.settings.isPunctuationEnabled
            }),
            (params, prevParams) => setExercise(params, prevParams)
        );
    }, [setExercise]);

    return null;
};

export default useExercise;
