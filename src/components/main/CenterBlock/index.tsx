import { memo, FC, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import { useTheme } from '@mui/material/styles';
import styles from './style.module.scss';

type CharContProps = {
    char: string;
    isCurChar: boolean;
    isMistake: boolean;
};

const CharCont: FC<CharContProps> = memo(({ char, isCurChar, isMistake }) => {
    const theme = useTheme();
    const {
        text: { primary: textPrimary },
        background: { default: backgroundDefault },
        primary: { main: primaryMain, contrastText: primaryContrastText },
        error: { light: errorLight, contrastText: errorContrastText }
    } = theme.palette;
    const getStyles = useMemo(() => () => {
        let styles = { color: textPrimary, backgroundColor: backgroundDefault };

        if (isCurChar) {
            styles = {
                ...styles,
                ...({ backgroundColor: primaryMain, color: primaryContrastText })
            };
        }

        if (isMistake) {
            styles = {
                ...styles,
                ...({ backgroundColor: errorLight, color: errorContrastText })
            };
        }

        return styles;
    }, [isCurChar, isMistake, textPrimary, backgroundDefault, primaryMain, primaryContrastText, errorLight, errorContrastText]);

    return <div className={styles.charCont} style={getStyles()}>{char}</div>;
});

const CenterBlock: FC = observer(() => (
    <div className={styles.cont}>
        {store.exersiseChars.map((char, index) => (
            <CharCont
                key={char + index}
                char={char}
                isCurChar={store.exersisePosition === index}
                isMistake={store.mistakePositions.includes(index)}
            />
        ))}
    </div>
));

export default CenterBlock;
