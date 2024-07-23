import React, { FC } from 'react';
import { Key } from '@/enums';
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';

type RowProps = {
    items: Key[];
};

const rowItems1 = [
    Key.Backquote,
    Key.Digit1,
    Key.Digit2,
    Key.Digit3,
    Key.Digit4,
    Key.Digit5,
    Key.Digit6,
    Key.Digit7,
    Key.Digit8,
    Key.Digit9,
    Key.Digit0,
    Key.Minus,
    Key.Equal,
    Key.Backspace
];

const rowItems2 = [
    Key.Tab,
    Key.KeyQ,
    Key.KeyW,
    Key.KeyE,
    Key.KeyR,
    Key.KeyT,
    Key.KeyY,
    Key.KeyU,
    Key.KeyI,
    Key.KeyO,
    Key.KeyP,
    Key.BracketLeft,
    Key.BracketRight,
    Key.Backslash
];

const rowItems3 = [
    Key.CapsLock,
    Key.KeyA,
    Key.KeyS,
    Key.KeyD,
    Key.KeyF,
    Key.KeyG,
    Key.KeyH,
    Key.KeyJ,
    Key.KeyK,
    Key.KeyL,
    Key.Semicolon,
    Key.Quote,
    Key.Enter
];

const rowItems4 = [
    Key.ShiftLeft,
    Key.KeyZ,
    Key.KeyX,
    Key.KeyC,
    Key.KeyV,
    Key.KeyB,
    Key.KeyN,
    Key.KeyM,
    Key.Comma,
    Key.Period,
    Key.Slash,
    Key.ShiftRight
];

const rowItems5 = [
    Key.Fn,
    Key.ControlLeft,
    Key.AltLeft,
    Key.MetaLeft,
    Key.Space,
    Key.MetaRight,
    Key.AltRight,
    Key.ArrowLeft,
    Key.ArrowUp,
    Key.ArrowRight
];

const Row: FC<RowProps> = ({ items }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.row}>
            {items.map((item: Key) => (
                <div key={item} className={`${styles.Default} ${styles[item]}`}>
                    {item === Key.ArrowUp ? (
                        <>
                            <div className={styles.btnArrowUp}>{t(`components.main.MacKeyboard.keys.${item}`)}</div>
                            <div className={styles.btnArrowDown}>{t('components.main.MacKeyboard.keys.ArrowDown')}</div>
                        </>
                    ) : (
                        <div>{t(`components.main.MacKeyboard.keys.${item}`)}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

const MacKeyboard: React.FC = () => {
    return (
        <div className={styles.cont}>
            {[rowItems1, rowItems2, rowItems3, rowItems4, rowItems5].map((rowItems) => (
                <Row key={rowItems.toString()} items={rowItems} />
            ))}
        </div>
    );
};

export default MacKeyboard;
