import { Key, LOCALE } from '@/enums';

type LessonsType = {
    [key in LOCALE]?: Key[][];
};

const expertLesson = [
    Key.KeyE,
    Key.KeyT,
    Key.KeyA,
    Key.KeyO,
    Key.KeyN,
    Key.KeyI,
    Key.KeyH,
    Key.KeyS,
    Key.KeyR,
    Key.KeyD,
    Key.KeyL,
    Key.KeyU,
    Key.KeyM,
    Key.KeyW,
    Key.KeyC,
    Key.KeyG,
    Key.KeyF,
    Key.KeyY,
    Key.KeyP,
    Key.KeyB,
    Key.KeyV,
    Key.KeyK,
    Key.Quote,
    Key.KeyJ,
    Key.KeyX,
    Key.KeyQ,
    Key.KeyZ
];

export const lessonsConfig: LessonsType = {
    [LOCALE.EN]: [
        [Key.KeyE, Key.KeyT, Key.KeyA, Key.KeyO],
        [Key.KeyN, Key.KeyI, Key.KeyH, Key.KeyS, Key.KeyR],
        [Key.KeyD, Key.KeyL, Key.KeyU, Key.KeyM],
        [Key.KeyW, Key.KeyC, Key.KeyG, Key.KeyF],
        [Key.KeyY, Key.KeyP, Key.KeyB, Key.KeyV, Key.KeyK],
        [Key.Quote, Key.KeyJ, Key.KeyX, Key.KeyQ, Key.KeyZ],
        expertLesson
    ]
};
