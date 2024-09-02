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
        get chars(): string[] {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.chars || [];
        },
        set chars(chars: string[]) {
            this.app.exercises[this.settings.lang][this.app.curExNum].chars = chars;
        },
        get position(): number {
            return this.app.exercises[this.settings.lang][this.app.curExNum]?.position || 0;
        },
        set position(position: number) {
            this.app.exercises[this.settings.lang][this.app.curExNum].position = position;
        },
        get keyToPress(): string {
            return (
                this.app.exercises[this.settings.lang][this.app.curExNum]?.chars[
                    this.app.exercises[this.settings.lang][this.app.curExNum]?.position
                ] || ''
            );
        }
    },
    {
        settings: observable,
        app: observable,
        set: action,
        reset: action,
        chars: computed,
        position: computed,
        keyToPress: computed
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
