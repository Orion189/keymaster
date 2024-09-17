import { memo, FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import clsx from 'clsx';
import styles from './style.module.scss';

type CharContProps = {
    char: string;
    isCurChar: boolean;
    isMistake: boolean;
};

const CharCont: FC<CharContProps> = memo(({ char, isCurChar, isMistake }) => {
    const getCSS = useMemo(
        () => () => {
            const classes = [styles.charCont];

            if (isCurChar) {
                classes.push(styles.curChar);
            }

            if (isMistake) {
                classes.push(styles.mistake);
            }

            return clsx(classes);
        },
        [isCurChar, isMistake]
    );

    return <div className={getCSS()}>{char}</div>;
});

const CenterBlock: FC = observer(() => (
    <div className={styles.cont}>
        {store.exersiseChars.map((char, index) => (
            <CharCont key={char + index} char={char} isCurChar={store.exersisePosition === index} isMistake={store.mistakePositions.includes(index)} />
        ))}
    </div>
));

export default CenterBlock;
