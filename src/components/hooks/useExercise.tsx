import { useEffect, useCallback } from 'react';
import { letters, numbers, capitalLetters, symbols } from '@/configs/lessons.config';
import { reaction, autorun } from 'mobx';
import { LOCALE } from '@/enums';
import type { ExerciseGeneralType, MistakeGeneralType } from '@/types';
import store from '@/store';
import { arrShuffle } from '@/utils/common.util';

type Exercise = {
    curExNum: number;
    exercises: ExerciseGeneralType;
    mistakes: MistakeGeneralType;
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
            isPunctuationEnabled: boolean
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

            chars.push(...Array.from(' '.repeat(10)));

            chars = arrShuffle(chars).slice(0, STRING_LENGTH).join('').trim().split('');

            return {
                chars,
                position: 0
            };
        },
        []
    );
    const initExercise = useCallback(
        (params: Exercise & ExerciseParams) => {
            const { lang, exercises, mistakes, curExNum, isNumbersEnabled, isUpperCaseEnabled, isPunctuationEnabled } = params;
            const isExersiseEmpty =
                exercises[lang].length === 0 ||
                !exercises[lang][curExNum] ||
                exercises[lang][curExNum].chars.length === 0;

            if (!lang || !letters[lang]) {
                return;
            }

            if (isExersiseEmpty) {
                const exercise = getExercise(
                    lang,
                    curExNum,
                    isNumbersEnabled,
                    isUpperCaseEnabled,
                    isPunctuationEnabled
                );

                if (exercise) {
                    const newExercises = [...exercises[lang]];
                    const newMistakes = [...mistakes[lang]];

                    newExercises[curExNum] = exercise;
                    newMistakes[curExNum] = {
                        positions: [],
                        amount: 0
                    };

                    store.set('app', {
                        ...store.app,
                        exercises: {
                            ...exercises,
                            [lang]: newExercises
                        },
                        mistakes: {
                            ...mistakes,
                            [lang]: newMistakes
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
                },
                mistakes: {
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
                mistakes: store.app.mistakes,
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
