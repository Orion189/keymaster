import { useEffect, useCallback } from 'react';
import { letters, numbers, capitalLetters, symbols } from '@/configs/lessons.config';
import { reaction, autorun } from 'mobx';
import { LOCALE } from '@/enums';
import type { ExerciseGeneralType } from '@/types';
import store from '@/store';
import { arrShuffle } from '@/utils/common.util';

type Exercise = {
    curExNum: number;
    exercises: ExerciseGeneralType;
};

type ExerciseParams = {
    lang: LOCALE;
    isNumbersEnabled: boolean;
    isUpperCaseEnabled: boolean;
    isPunctuationEnabled: boolean;
};

const STRING_LENGTH = 100;

const useExercise = () => {
    const getExercise = useCallback(
        (
            lang: LOCALE,
            curExNum: number,
            isNumbersEnabled: boolean,
            isUpperCaseEnabled: boolean,
            isPunctuationEnabled: boolean,
            resultTypedSpeed: number,
            resultMistakeAmount: number
        ) => {
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

            chars = arrShuffle(chars);

            let step = Math.trunc(Math.random() * 5 + 1);

            for (let i = 0; i < chars.length; i += step) {
                step = Math.trunc(Math.random() * 4 + 1);
            
                if (chars[i - 1] !== ' ' && chars[i + 1] !== ' ') {
                    chars.splice(i, 1, ' ');
                }
            }

            chars = chars.slice(0, STRING_LENGTH).join('').trim().split('');

            return {
                chars,
                position: 0,
                charTypedTime: 0,
                wordTypedTime: 0,
                typedSpeed: 0,
                typedSpeeds: [],
                mistakeAmount: 0,
                mistakePositions: [],
                resultTypedSpeed,
                resultMistakeAmount
            };
        },
        []
    );
    const initExercise = useCallback(
        (params: Exercise & ExerciseParams) => {
            const { lang, exercises, curExNum, isNumbersEnabled, isUpperCaseEnabled, isPunctuationEnabled } = params;
            const isExersiseEmpty =
                exercises[lang].length === 0 ||
                !exercises[lang][curExNum] ||
                exercises[lang][curExNum].chars.length === 0;

            if (!lang || !letters[lang]) {
                return;
            }

            if (isExersiseEmpty) {
                const resultTypedSpeed = exercises[lang][curExNum]?.resultTypedSpeed || 0;
                const resultMistakeAmount = exercises[lang][curExNum]?.resultMistakeAmount || 0;
                const exercise = getExercise(
                    lang,
                    curExNum,
                    isNumbersEnabled,
                    isUpperCaseEnabled,
                    isPunctuationEnabled,
                    resultTypedSpeed,
                    resultMistakeAmount
                );

                if (exercise) {
                    const newExercises = [...exercises[lang]];

                    newExercises[curExNum] = exercise;

                    store.set('app', {
                        ...store.app,
                        exercises: {
                            ...exercises,
                            [lang]: newExercises
                        }
                    });
                }
            }
        },
        [getExercise]
    );
    const handleExerciseParamsChange = useCallback((params: ExerciseParams, prevParams: ExerciseParams) => {
        const { lang, isNumbersEnabled, isUpperCaseEnabled, isPunctuationEnabled } = params;
        const isParamsChanged =
            lang !== prevParams.lang ||
            isNumbersEnabled !== prevParams.isNumbersEnabled ||
            isUpperCaseEnabled !== prevParams.isUpperCaseEnabled ||
            isPunctuationEnabled !== prevParams.isPunctuationEnabled;

        if (!lang || !letters[lang]) {
            return;
        }

        if (isParamsChanged) {
            store.set('app', {
                ...store.app,
                exercises: {
                    [LOCALE.EN]: [],
                    [LOCALE.UK]: [],
                    [LOCALE.RU]: []
                }
            });
        }
    }, []);

    useEffect(() => {
        autorun(() => {
            initExercise({
                lang: store.settings.lang,
                curExNum: store.app.curExNum,
                exercises: store.app.exercises,
                isNumbersEnabled: store.settings.isNumbersEnabled,
                isUpperCaseEnabled: store.settings.isUpperCaseEnabled,
                isPunctuationEnabled: store.settings.isPunctuationEnabled
            });
        });

        reaction(
            () => ({
                lang: store.settings.lang,
                isNumbersEnabled: store.settings.isNumbersEnabled,
                isUpperCaseEnabled: store.settings.isUpperCaseEnabled,
                isPunctuationEnabled: store.settings.isPunctuationEnabled
            }),
            (params, prevParams) => handleExerciseParamsChange(params, prevParams)
        );
    }, [initExercise, handleExerciseParamsChange]);

    return null;
};

export default useExercise;
