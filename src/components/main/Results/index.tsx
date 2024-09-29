import { memo, FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BarChart } from '@mui/x-charts/BarChart';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { letters } from '@/configs/lessons.config';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import store from '@/store';
import styles from './style.module.scss';

type ChartDataItemProps = {
    typedSpeed: number;
    mistakeAmount: number;
};

type ChartProps = {
    data: ChartDataItemProps[];
};

const BackBtn = memo(() => (
    <Link to="/">
        <IconButton tabIndex={-1} className={styles.backBtn}>
            <ArrowBackIcon fontSize="large" />
        </IconButton>
    </Link>
));

const Chart: FC<ChartProps> = memo(({ data }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const labels = Array.from(Array(data.length), (_, i) => `${t('components.main.Results.axies.x')} ${i + 1}`);
    const width = window.screen.availWidth > 1800 ? 1024 : 800;
    const height = window.screen.availHeight > 1100 ? 768 : 600;

    return (
        <div className={styles.chartCont}>
            <BarChart
                dataset={data}
                yAxis={[
                    {
                        id: 'speed',
                        label: t('components.main.Results.axies.y'),
                        dataKey: 'typedSpeed'
                    }
                ]}
                xAxis={[
                    {
                        id: 'exercices',
                        data: labels,
                        scaleType: 'band'
                    }
                ]}
                series={[
                    {
                        dataKey: 'typedSpeed',
                        stack: 'assets',
                        label: t('components.main.Results.series.typedSpeed'),
                        color: theme.palette.info.main
                    },
                    {
                        dataKey: 'mistakeAmount',
                        stack: 'assets',
                        label: t('components.main.Results.series.mistakeAmount'),
                        color: theme.palette.error.main
                    }
                ]}
                width={width}
                height={height}
            />
        </div>
    );
});

const Results: FC = observer(() => {
    const lessonsLength = letters[store.settings.lang].length;
    const exercises = store.app.exercises[store.settings.lang];
    const data = useMemo(() => {
        const chartData = [];

        for (let i = 0; i < lessonsLength; i++) {
            chartData[i] = {
                typedSpeed: exercises[i]?.resultTypedSpeed || 0,
                mistakeAmount: exercises[i]?.resultMistakeAmount || 0
            };
        }

        return chartData;
    }, [lessonsLength, exercises]);

    return (
        <div className={styles.cont}>
            <BackBtn />
            <Chart data={data} />
        </div>
    );
});

export default Results;
