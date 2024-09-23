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
        theme: THEME.LIGHT,
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
        },
        mistakes: {
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
            this.app.exercises[this.settings.lang][exNum].chars = [];
            this.app.exercises[this.settings.lang][exNum].position = 0;
            this.app.exercises[this.settings.lang][exNum].typedSpeed = 0;
            this.app.exercises[this.settings.lang][exNum].charTypedTime = 0;
            this.app.exercises[this.settings.lang][exNum].wordTypedTime = 0;
            this.app.mistakes[this.settings.lang][exNum].amount = 0;
            this.app.mistakes[this.settings.lang][exNum].positions = [];
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
        get mistakePositions(): number[] {
            return this.app.mistakes[this.settings.lang][this.app.curExNum]?.positions || [];
        },
        set mistakePositions(positions: number[]) {
            this.app.mistakes[this.settings.lang][this.app.curExNum].positions = positions;
        },
        get mistakeAmount(): number {
            return this.app.mistakes[this.settings.lang][this.app.curExNum]?.amount || 0;
        },
        set mistakeAmount(amount: number) {
            this.app.mistakes[this.settings.lang][this.app.curExNum].amount = amount;
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

            if (this.exersisePosition === -1) {
                return 100 - Math.trunc(this.mistakeAmount * 100 / 99);
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
        mistakePositions: computed,
        mistakeAmount: computed,
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
