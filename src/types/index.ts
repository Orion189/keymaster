import { LOCALE, THEME, TYPING_SPEED } from '@/enums';

export type SettingsType = {
    lang: LOCALE;
    theme: THEME;
    typingSpeed: TYPING_SPEED,
    isShowKeyHintEnabled: boolean,
    isShowHandsHintEnabled: boolean,
    isErrorSoundHintEnabled: boolean,
    isUpperCaseEnabled: boolean,
    isNumbersEnabled: boolean,
    isPunctuationEnabled: boolean
};

export type ExerciseGeneralType = {
    [key in LOCALE]: ExerciseType[]
};

export type ExerciseType = {
    chars: string[];
    position: number;
};

export type MistakeGeneralType = {
    [key in LOCALE]: MistakeType[]
};

export type MistakeType = {
    positions: number[];
    amount: number;
};

export type AppType = {
    isCapsLockEnabled: boolean;
    isDrawerOpened: boolean;
    curExNum: number;
    exercises: ExerciseGeneralType,
    mistakes: MistakeGeneralType
};

export type StoreValuesType = SettingsType | Partial<AppType>;

export type StoreKeysType = 'settings' | 'app';
