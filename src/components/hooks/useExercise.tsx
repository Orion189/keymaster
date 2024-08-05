import { useEffect, useCallback } from 'react';
import { lessonsConfig } from '@/configs/lessons.config';
import { reaction } from 'mobx';
import { LOCALE } from '@/enums';
import type { ExerciseGeneralType } from '@/types';
import store from '@/store';

type ExerciseParams = {
    lang: LOCALE;
    curExNum: number | null;
    exercises: ExerciseGeneralType;
    isNumbersEnabled: boolean;
    isUpperCaseEnabled: boolean;
    isPunctuationEnabled: boolean;
};

const STRING_LENGTH = 75;

const useExercise = () => {
    const getExercise = useCallback(
        (config: string[], isNumbersEnabled: boolean, isUpperCaseEnabled: boolean, isPunctuationEnabled: boolean) => {
            let chars = [];
            let updatedConfig = [...config];

            if (isNumbersEnabled) {
                updatedConfig.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
            }

            if (isPunctuationEnabled) {
                updatedConfig.push(',', ';', ':', '?', '!', '-');
            }

            updatedConfig = updatedConfig.reduce((acc: string[], elem, ind) => {
                acc.push(elem);

                if (ind % 2 === 0) {
                    acc.push(' ');
                }

                return acc;
            }, []);

            for (let i = 0; i < STRING_LENGTH; i += 1) {
                chars.push(updatedConfig[Math.floor(Math.random() * updatedConfig.length)]);
            }

            if (isUpperCaseEnabled) {
                chars = chars.map((char, index) =>
                    config.includes(char) && (index % 2) + 1 === Math.floor(Math.random() * 2) + 1
                        ? char.toUpperCase()
                        : char
                );
            }

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

        if (!lessonsConfig[lang] || curExNum === null || !lang) {
            return;
        }

        if (!Array.isArray(exercises[lang])) {
            exercises[lang] = [];
        }

        if (!exercises[lang][curExNum] || isTogglesChanged) {
            const exercise = getExercise(
                lessonsConfig[lang][curExNum],
                isNumbersEnabled,
                isUpperCaseEnabled,
                isPunctuationEnabled
            );

            exercises[lang][curExNum] = exercise;

            store.set('app', { ...store.app, exercises });
        }
    }, []);

    useEffect(() => {//store.reset();
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
    }, []);

    return null;
};

export default useExercise;
