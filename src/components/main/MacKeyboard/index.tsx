import { FC, memo, useMemo } from 'react';
import { Key } from '@/enums';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { arrUnique } from '@/utils/common.util';
import MacFingers from '@/components/main/MacFingers';
import { highlightsConfig, makeBoldExceptionKeys } from '@/configs/highlights.config';
import { fingersConfig } from '@/configs/fingers.config';
import clsx from 'clsx';
import styles from './style.module.scss';

type RowProps = {
    items: Key[];
    isCapsLockEnabled: boolean;
    keysToHighlight: string[];
    keysToMakeBold: string[];
};

type KeyProps = {
    item: Key;
    isCapsLockEnabled: boolean;
    keysToHighlight: string[];
    keysToMakeBold: string[];
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

const KeyItem: FC<KeyProps> = memo(({ item, isCapsLockEnabled, keysToHighlight, keysToMakeBold }) => {
    const { t } = useTranslation();
    const getCSS = useMemo(
        () => (item: Key) => {
            const classes = [styles.Default];

            if (styles[item]) {
                classes.push(styles[item]);
            }

            if (item === Key.CapsLock && isCapsLockEnabled) {
                classes.push(styles.capsLockEnabled);
            }

            if (keysToHighlight.includes(item)) {
                classes.push(styles.animatedBg);
            }

            if (keysToMakeBold.includes(item) && !makeBoldExceptionKeys.includes(item)) {
                classes.push(styles.bold);
            }

            return clsx(classes);
        },
        [isCapsLockEnabled, keysToHighlight, keysToMakeBold]
    );

    return (
        <div key={item} className={getCSS(item)}>
            {item === Key.ArrowUp ? (
                <>
                    <div className={styles.btnArrowUp}>{t(`common.keyboard.keys.${item}`)}</div>
                    <div className={styles.btnArrowDown}>{t('common.keyboard.keys.ArrowDown')}</div>
                </>
            ) : (
                <div>{t(`common.keyboard.keys.${item}`)}</div>
            )}
        </div>
    );
});

const Row: FC<RowProps> = memo(({ items, isCapsLockEnabled, keysToHighlight, keysToMakeBold }) => (
    <div className={styles.row}>
        {items.map((item: Key) => (
            <KeyItem
                key={item}
                item={item}
                isCapsLockEnabled={isCapsLockEnabled}
                keysToHighlight={keysToHighlight}
                keysToMakeBold={keysToMakeBold}
            />
        ))}
    </div>
));

const MacKeyboard: FC = observer(() => {
    const isCapsLockEnabled = store.app.isCapsLockEnabled;
    const isShowKeyHintEnabled = store.settings.isShowKeyHintEnabled;
    const isShowHandsHintEnabled = store.settings.isShowHandsHintEnabled;
    const curChar = store.chars[store.position];
    const highlightsConf = highlightsConfig[store.settings.lang];
    const getKeysToHighlight = useMemo(
        () => () => {
            const entries = Object.entries<string[]>(highlightsConf);
            const keys = [];

            if (!isShowKeyHintEnabled) {
                return [];
            }

            for (const [key, value] of entries) {
                if (value.includes(curChar)) {
                    keys.push(key);
                }
            }

            return keys;
        },
        [curChar, highlightsConf, isShowKeyHintEnabled]
    );
    const getKeysToMakeBold = useMemo(
        () => () => {
            const entries = Object.entries<string[]>(highlightsConf);
            const keys: string[] = [];

            arrUnique(store.chars).forEach((uniqueChar) => {
                for (const [key, value] of entries) {
                    if (value.includes(uniqueChar)) {
                        keys.push(key);
                    }
                }
            });

            return arrUnique(keys);
        },
        [highlightsConf]
    );
    const getFingersToHighlight = useMemo(
        () => () => {
            const keysToHighlight = getKeysToHighlight();
            const entries = Object.entries<string[]>(fingersConfig);
            const fingers = [];

            for (const [key, value] of entries) {
                const intersectedArray = value.filter((value) => keysToHighlight.includes(value));

                if (intersectedArray.length) {
                    fingers.push(key);
                }
            }

            return fingers;
        },
        [getKeysToHighlight]
    );

    return (
        <div className={styles.cont}>
            <div className={styles.keysCont}>
                {[rowItems1, rowItems2, rowItems3, rowItems4, rowItems5].map((rowItems) => (
                    <Row
                        key={rowItems.toString()}
                        items={rowItems}
                        isCapsLockEnabled={isCapsLockEnabled}
                        keysToHighlight={getKeysToHighlight()}
                        keysToMakeBold={getKeysToMakeBold()}
                    />
                ))}
            </div>
            {isShowHandsHintEnabled ? <MacFingers fingersToHighLight={getFingersToHighlight()} /> : null}
        </div>
    );
});

export default MacKeyboard;
