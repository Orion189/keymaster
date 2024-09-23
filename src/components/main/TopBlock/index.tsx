import { FC } from 'react';
import SpeedIcon from '@mui/icons-material/Speed';
import ErrorIcon from '@mui/icons-material/Error';
import PercentIcon from '@mui/icons-material/Percent';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import styles from './style.module.scss';

const TopBlock: FC = observer(() => {
    const { t } = useTranslation();

    return (
        <div className={styles.cont}>
            <div className={styles.paramBlock}>
                <SpeedIcon className={styles.paramIcon} />
                <div className={styles.paramDataCont}>
                    <div className={styles.paramDataValue}>{store.typedSpeed}</div>
                    <div className={styles.paramDataTitle}>{t(`components.main.TopBlock.titles.typingSpeed.${store.settings.typingSpeed}`)}</div>
                </div>
            </div>
            <div className={styles.paramBlock}>
                <PercentIcon className={styles.paramIcon} />
                <div className={styles.paramDataCont}>
                    <div className={styles.paramDataValue}>{store.accurancy}</div>
                    <div className={styles.paramDataTitle}>{t('components.main.TopBlock.titles.accuracy')}</div>
                </div>
            </div>
            <div className={styles.paramBlock}>
                <ErrorIcon className={styles.paramIcon} />
                <div className={styles.paramDataCont}>
                    <div className={styles.paramDataValue}>{store.mistakeAmount}</div>
                    <div className={styles.paramDataTitle}>{t('components.main.TopBlock.titles.typos')}</div>
                </div>
            </div>
        </div>
    );
});

export default TopBlock;
