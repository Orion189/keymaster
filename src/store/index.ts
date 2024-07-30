import { SettingsType, AppType, StoreValuesType } from '@/types';
import { LOCALE, THEME, TYPING_SPEED } from '@/enums';
import { makeObservable, observable, action } from 'mobx';
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
        isUpperCaseEnabled: true,
        isNumbersEnabled: true,
        isPunctuationEnabled: true
    },
    app: {
        isCapsLockEnabled: false,
        isDrawerOpened: false,
        curLesson: 0
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
        }
    },
    {
        settings: observable,
        app: observable,
        set: action,
        reset: action
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
