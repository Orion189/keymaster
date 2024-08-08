import { LOCALE } from '@/enums';

type LettersType = {
    [key in LOCALE]?: string[][];
};

type SymbolsType = {
    [key in LOCALE]?: string[];
};

export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const letters: LettersType = {
    [LOCALE.EN]: [
        ['e', 't', 'a', 'o'],
        ['n', 'i', 'h', 's', 'r'],
        ['d', 'l', 'u', 'm'],
        ['w', 'c', 'g', 'f'],
        ['y', 'p', 'b', 'v', 'k'],
        ["'", 'j', 'x', 'q', 'z'],
        [
            'e',
            't',
            'a',
            'o',
            'n',
            'i',
            'h',
            's',
            'r',
            'd',
            'l',
            'u',
            'm',
            'w',
            'c',
            'g',
            'f',
            'y',
            'p',
            'b',
            'v',
            'k',
            "'",
            'j',
            'x',
            'q',
            'z'
        ]
    ],
    [LOCALE.RU]: [
        ['й', 'м', 'н', 'щ', 'э'],
        ['я', 'у', 'п', 'г', 'ю', 'ъ'],
        ['ф', 'а', 'и', 'ь', 'ш'],
        ['ц', 'с', 'р', 'о', 'б', 'ж'],
        ['ч', 'к', 'т', 'л', 'з'],
        ['ё', 'ы', 'в', 'е', 'д', 'х'],
        [
            'й',
            'м',
            'н',
            'щ',
            'э',
            'я',
            'у',
            'п',
            'г',
            'ю',
            'ъ',
            'ф',
            'а',
            'и',
            'ь',
            'ш',
            'ц',
            'с',
            'р',
            'о',
            'б',
            'ж',
            'ч',
            'к',
            'т',
            'л',
            'з',
            'ё',
            'ы',
            'в',
            'е',
            'д',
            'х'
        ]
    ],
    [LOCALE.UK]: [
        ['й', 'і', 'м', 'н', 'щ', 'є'],
        ['я', 'у', 'п', 'г', 'ю'],
        ['ф', 'а', 'и', 'ь', 'ш', 'ї'],
        ['ц', 'с', 'р', 'о', 'б', 'ж'],
        ['ч', 'к', 'т', 'л', 'з'],
        ['ґ', 'в', 'е', 'д', 'х', 'ʼ'],
        [
            'й',
            'і',
            'м',
            'н',
            'щ',
            'є',
            'я',
            'у',
            'п',
            'г',
            'ю',
            'ф',
            'а',
            'и',
            'ь',
            'ш',
            'ї',
            'ц',
            'с',
            'р',
            'о',
            'б',
            'ж',
            'ч',
            'к',
            'т',
            'л',
            'з',
            'ґ',
            'в',
            'е',
            'д',
            'х',
            'ʼ'
        ]
    ]
};

export const capitalLetters: LettersType = {
    [LOCALE.EN]: [
        ['E', 'T', 'A', 'O'],
        ['N', 'I', 'H', 'S', 'R'],
        ['D', 'L', 'U', 'M'],
        ['W', 'C', 'G', 'F'],
        ['Y', 'P', 'B', 'V', 'K'],
        ['J', 'X', 'Q', 'Z'],
        [
            'E',
            'T',
            'A',
            'O',
            'N',
            'I',
            'H',
            'S',
            'R',
            'D',
            'L',
            'U',
            'M',
            'W',
            'C',
            'G',
            'F',
            'Y',
            'P',
            'B',
            'V',
            'K',
            'J',
            'X',
            'Q',
            'Z'
        ]
    ],
    [LOCALE.RU]: [
        ['Й', 'М', 'Н', 'Щ', 'Э'],
        ['Я', 'У', 'П', 'Г', 'Ю', 'Ъ'],
        ['Ф', 'А', 'И', 'Ь', 'Ш'],
        ['Ц', 'С', 'Р', 'О', 'Б', 'Ж'],
        ['Ч', 'К', 'Т', 'Л', 'З'],
        ['Ё', 'Ы', 'В', 'Е', 'Д', 'Х'],
        [
            'Й',
            'М',
            'Н',
            'Щ',
            'Э',
            'Я',
            'У',
            'П',
            'Г',
            'Ю',
            'Ъ',
            'Ф',
            'А',
            'И',
            'Ь',
            'Ш',
            'Ц',
            'С',
            'Р',
            'О',
            'Б',
            'Ж',
            'Ч',
            'К',
            'Т',
            'Л',
            'З',
            'Ё',
            'Ы',
            'В',
            'Е',
            'Д',
            'Х'
        ]
    ],
    [LOCALE.UK]: [
        ['Й', 'І', 'М', 'Н', 'Щ', 'Є'],
        ['Я', 'У', 'П', 'Г', 'Ю'],
        ['Ф', 'А', 'И', 'Ь', 'Ш', 'Ї'],
        ['Ц', 'С', 'Р', 'О', 'Б', 'Ж'],
        ['Ч', 'К', 'Т', 'Л', 'З'],
        ['Ґ', 'В', 'Е', 'Д', 'Х'],
        [
            'Й',
            'І',
            'М',
            'Н',
            'Щ',
            'Є',
            'Я',
            'У',
            'П',
            'Г',
            'Ю',
            'Ф',
            'А',
            'И',
            'Ь',
            'Ш',
            'Ї',
            'Ц',
            'С',
            'Р',
            'О',
            'Б',
            'Ж',
            'Ч',
            'К',
            'Т',
            'Л',
            'З',
            'Ґ',
            'В',
            'Е',
            'Д',
            'Х'
        ]
    ]
};

export const symbols: SymbolsType = {
    [LOCALE.EN]: [
        '±',
        '!',
        '@',
        '#',
        '$',
        '%',
        '^',
        '&',
        '*',
        '(',
        ')',
        '_',
        '+',
        '~',
        '<',
        '>',
        '?',
        '"',
        '/',
        '|',
        '\\',
        '[',
        ']',
        '=',
        '-',
        '§',
        '`',
        '~',
        '.',
        ','
    ],
    [LOCALE.RU]: ['!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '\\', '/', '[', '.', ','],
    [LOCALE.UK]: ['\\', '/', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'ʼ', '₴', '.', ',']
};
