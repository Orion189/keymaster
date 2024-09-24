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
    charTypedTime: number;
    wordTypedTime: number;
    typedSpeed: number;
    typedSpeeds: number[];
    mistakeAmount: number;
    mistakePositions: number[];
    resultTypedSpeed?: number;
    resultMistakeAmount?: number;
};

export type AppType = {
    isCapsLockEnabled: boolean;
    isDrawerOpened: boolean;
    curExNum: number;
    exercises: ExerciseGeneralType
};

export type StoreValuesType = SettingsType | Partial<AppType>;

export type StoreKeysType = 'settings' | 'app';
