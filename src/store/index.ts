import { SettingsType, AppType, StoreValuesType } from '@/types';
import { LOCALE, THEME } from '@/enums';
import { makeObservable, observable, action } from 'mobx';
import { makePersistable, stopPersisting } from 'mobx-persist-store';

const isDevMode = import.meta.env.DEV;

export const defaultState: {
    settings: SettingsType;
    app: AppType;
} = {
    settings: {
        lang: LOCALE.EN,
        theme: THEME.LIGHT
    },
    app: {
        isCapsLockEnabled: false,
        isDrawerOpened: false
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
