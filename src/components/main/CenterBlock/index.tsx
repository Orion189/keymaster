import { memo, FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import clsx from 'clsx';
import styles from './style.module.scss';

type CharContProps = {
    char: string;
    isCurChar: boolean;
};

const CharCont: FC<CharContProps> = memo(({ char, isCurChar }) => {
    const getCSS = useMemo(
        () => () => {
            const classes = [styles.charCont];

            if (isCurChar) {
                classes.push(styles.curChar);
            }

            return clsx(classes);
        },
        [isCurChar]
    );

    return <div className={getCSS()}>{char}</div>;
});

const CenterBlock: FC = observer(() => (
    <div className={styles.cont}>
        {store.chars.map((char, index) => (
            <CharCont key={char + index} char={char} isCurChar={store.position === index} />
        ))}
    </div>
));

export default CenterBlock;
