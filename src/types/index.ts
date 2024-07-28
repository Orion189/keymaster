import { LOCALE, THEME } from '@/enums';

export type SettingsType = {
    lang: LOCALE;
    theme: THEME;
};

export type AppType = {
    isCapsLockEnabled: boolean;
    isDrawerOpened: boolean;
};

export type StoreValuesType = SettingsType | Partial<AppType>;

export type StoreKeysType = 'settings' | 'app';
