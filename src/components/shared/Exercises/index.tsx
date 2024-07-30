import { FC, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import store from '@/store';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { lessonsConfig } from './lessons.config';
import { Key } from '@/enums';
import styles from './style.module.scss';

type ExerciseProps = {
    lesson: Key[];
    index: number;
    isLast: boolean;
};

const Exercise: FC<ExerciseProps> = observer(({ lesson, index, isLast }) => {
    const { t } = useTranslation();
    const getLessonTitle = useCallback(
        (lesson: Key[]) =>
            lesson
                .map((key) => t(`common.keyboard.keys.${key}`))
                .join(' ')
                .toLocaleLowerCase(),
        [t]
    );
    const onClickExerciseHandler = useCallback(() => {
        store.set('app', { ...store.app, curLesson: index });
    }, [index]);

    return (
        <ListItem
            disablePadding
            secondaryAction={
                <Typography variant="subtitle1" align="center">
                    0%
                </Typography>
            }
        >
            <ListItemButton selected={store.app.curLesson === index} onClick={onClickExerciseHandler}>
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
    const lessons = lessonsConfig[store.settings.lang];

    return (
        <Box className={styles.cont}>
            <List className={styles.list}>
                {lessons?.map((lesson, index) => (
                    <Exercise
                        key={lesson.toString()}
                        lesson={lesson}
                        index={index}
                        isLast={index === lessons?.length - 1}
                    />
                ))}
            </List>
        </Box>
    );
});

export default Exercises;
