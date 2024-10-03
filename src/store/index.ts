import { SettingsType, AppType, StoreValuesType } from '@/types';
import { LOCALE, THEME, TYPING_SPEED } from '@/enums';
import { makeObservable, observable, action, computed } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';

const isDevMode = import.meta.env.DEV;

export const defaultState: {
    settings: SettingsType;
    app: AppType;
} = {
    settings: {
        lang: LOCALE.EN,
        theme: THEME.DARK,
        typingSpeed: TYPING_SPEED.CHARACTERS,
        isShowKeyHintEnabled: true,
        isShowHandsHintEnabled: true,
        isErrorSoundHintEnabled: true,
        isUpperCaseEnabled: false,
        isNumbersEnabled: false,
        isPunctuationEnabled: false
    },
    app: {
        isCapsLockEnabled: false,
        isDrawerOpened: false,
        curExNum: 0,
        exercises: {
            [LOCALE.EN]: [],
            [LOCALE.UK]: [],
            [LOCALE.RU]: []
        }
    }
};

const store = makeObservable(
    {
        ...defaultState,
        set(key: keyof typeof defaultState, value: StoreValuesType) {
            Object.assign(this, {
                [key]: value
            });
        },
        reset(key?: keyof typeof defaultState) {
            if (key) {
                Object.assign(this, {
                    [key]: defaultState[key]
                });
            } else {
                Object.assign(this, defaultState);
            }
        },
        resetExersise(exNum: number) {
            const newExercises = [...this.app.exercises[this.settings.lang]];

            newExercises[exNum] = {
                ...this.app.exercises[this.settings.lang][exNum],
                chars: []
            };

            this.set('app', {
                ...this.app,
                exercises: {
                    ...this.app.exercises,
                    [this.settings.lang]: newExercises
                }
            });
        },
        get exersiseChars(): string[] {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.chars || [];
        },
        set exersiseChars(chars: string[]) {
            this.app.exercises[this.settings.lang][this.app.curExNum].chars = chars;
        },
        get exersisePosition(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.position || 0;
        },
        set exersisePosition(position: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].position = position;
        },
        get charTypedTime(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.charTypedTime || 0;
        },
        set charTypedTime(charTypedTime: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].charTypedTime = charTypedTime;
        },
        get wordTypedTime(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.wordTypedTime || 0;
        },
        set wordTypedTime(wordTypedTime: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].wordTypedTime = wordTypedTime;
        },
        get typedSpeed(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.typedSpeed || 0;
        },
        set typedSpeed(typedSpeed: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].typedSpeed = typedSpeed;
        },
        get typedSpeeds(): number[] {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.typedSpeeds || [];
        },
        set typedSpeeds(typedSpeeds: number[]) {
            this.app.exercises[this.settings.lang][this.app.curExNum].typedSpeeds = typedSpeeds;
        },
        get mistakePositions(): number[] {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.mistakePositions || [];
        },
        set mistakePositions(positions: number[]) {
            this.app.exercises[this.settings.lang][this.app.curExNum].mistakePositions = positions;
        },
        get mistakeAmount(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.mistakeAmount || 0;
        },
        set mistakeAmount(amount: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].mistakeAmount = amount;
        },
        get resultTypedSpeed(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.resultTypedSpeed || 0;
        },
        set resultTypedSpeed(resultTypedSpeed: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].resultTypedSpeed = resultTypedSpeed;
        },
        get resultMistakeAmount(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.resultMistakeAmount || 0;
        },
        set resultMistakeAmount(resultMistakeAmount: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].resultMistakeAmount = resultMistakeAmount;
        },
        get keyToPress(): string {
            return (
                this.app.exercises[this.settings.lang][this.app.curExNum]?.chars[
                    this.app.exercises[this.settings.lang][this.app.curExNum]?.position
                ] || ''
            );
        },
        get accurancy(): number {
            if (this.exersisePosition === 0 || this.mistakeAmount === 0) {
                return 100;
            }
      
            return 100 - Math.trunc(this.mistakeAmount * 100 / this.exersisePosition);
        }
    },
    {
        settings: observable,
        app: observable,
        set: action,
        reset: action,
        resetExersise: action,
        exersiseChars: computed,
        exersisePosition: computed,
        charTypedTime: computed,
        wordTypedTime: computed,
        typedSpeed: computed,
        typedSpeeds: computed,
        mistakePositions: computed,
        mistakeAmount: computed,
        resultTypedSpeed: computed,
        resultMistakeAmount: computed,
        keyToPress: computed,
        accurancy: computed
    },
    { autoBind: true }
);

if (isDevMode) {
    stopPersisting(store);
}

makePersistable(
    store,
    {
        storage: window.localStorage,
        name: 'KeyMasterStore',
        properties: ['settings', 'app'],
        debugMode: isDevMode
    } /*, { delay: 200 }*/
);

export default store;
