import { LOCALE, THEME, TYPING_SPEED } from '@/enums';

export type SettingsType = {
    lang: LOCALE;
    theme: THEME;
    typingSpeed: TYPING_SPEED
};

export type AppType = {
    isCapsLockEnabled: boolean;
    isDrawerOpened: boolean;
};

export type StoreValuesType = SettingsType | Partial<AppType>;

export type StoreKeysType = 'settings' | 'app';
