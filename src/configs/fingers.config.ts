import { Key, FINGER } from '@/enums';

type FingersType = {
    [key in FINGER]: Key[];
};

export const fingersConfig: FingersType = {
    [FINGER.LEFT_LITTLE]: [Key.IntlBackslash, Key.Digit1, Key.KeyQ, Key.KeyA, Key.KeyZ, Key.Backquote, Key.ShiftLeft],
    [FINGER.LEFT_RING]: [Key.Digit2, Key.KeyW, Key.KeyS, Key.KeyX],
    [FINGER.LEFT_MIDDLE]: [Key.Digit3, Key.KeyE, Key.KeyD, Key.KeyC],
    [FINGER.LEFT_INDEX]: [Key.Digit4, Key.Digit5, Key.KeyR, Key.KeyT, Key.KeyF, Key.KeyG, Key.KeyV, Key.KeyB],
    [FINGER.LEFT_THUMB]: [Key.Space],
    [FINGER.RIGHT_THUMB]: [Key.Space],
    [FINGER.RIGHT_INDEX]: [Key.Digit6, Key.Digit7, Key.KeyY, Key.KeyU, Key.KeyH, Key.KeyJ, Key.KeyN, Key.KeyM],
    [FINGER.RIGHT_MIDDLE]: [Key.Digit8, Key.KeyI, Key.KeyK, Key.Comma],
    [FINGER.RIGHT_RING]: [Key.Digit9, Key.KeyO, Key.KeyL, Key.Period],
    [FINGER.RIGHT_LITTLE]: [
        Key.Digit0,
        Key.Minus,
        Key.Equal,
        Key.KeyP,
        Key.BracketLeft,
        Key.BracketRight,
        Key.Semicolon,
        Key.Quote,
        Key.Backslash,
        Key.Slash,
        Key.ShiftRight
    ]
};
