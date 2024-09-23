import { FC, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import store from '@/store';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { letters } from '@/configs/lessons.config';
import styles from './style.module.scss';

type ExerciseProps = {
    lesson: string[];
    index: number;
    isLast: boolean;
};

type RefreshBtnProps = {
    exNum: number;
};

const RefreshBtn: FC<RefreshBtnProps> = ({ exNum }) => {
    const onClickHandler = useCallback(() => store.resetExersise(exNum), [exNum]);

    return (
        <Button variant="outlined" color="secondary" onClick={onClickHandler}>
            <RefreshIcon />
        </Button>
    );
};

const Exercise: FC<ExerciseProps> = observer(({ lesson, index, isLast }) => {
    const { t } = useTranslation();
    const getLessonTitle = useCallback((lesson: string[]) => lesson.join(' ').toLocaleLowerCase(), []);
    const onClickExerciseHandler = useCallback(() => {
        if (index !== store.app.curExNum) {
            store.set('app', { ...store.app, curExNum: index });
            store.charTypedTime = 0;
            store.wordTypedTime = 0;
            store.typedSpeed = 0;
        }
    }, [index]);

    return (
        <ListItem disablePadding secondaryAction={<RefreshBtn exNum={index} />}>
            <ListItemButton selected={store.app.curExNum === index} onClick={onClickExerciseHandler}>
                {isLast ? (
                    <ListItemText
                        primary={t('components.shared.Exercises.lastLesson.title')}
                        secondary={t('components.shared.Exercises.lastLesson.subTitle')}
                    />
                ) : (
                    <ListItemText
                        primary={t('components.shared.Exercises.lesson.title', { index: index + 1 })}
                        secondary={getLessonTitle(lesson)}
                    />
                )}
            </ListItemButton>
        </ListItem>
    );
});

const Exercises: FC = observer(() => {
    const lessons = letters[store.settings.lang];

    return (
        <Box className={styles.cont}>
            <List className={styles.list}>
                {lessons.map((lesson, index) => (
                    <Exercise
                        key={lesson.toString()}
                        lesson={lesson}
                        index={index}
                        isLast={index === lessons.length - 1}
                    />
                ))}
            </List>
        </Box>
    );
});

export default Exercises;
