import { memo, FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { BarChart } from '@mui/x-charts/BarChart';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { letters } from '@/configs/lessons.config';
import { useTheme } from '@mui/material/styles';
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
    const labels = Array.from(Array(data.length), (_, i) => `Ex. ${i + 1}`);

    return (
        <div className={styles.chartCont}>
            <BarChart
                dataset={data}
                yAxis={[
                    {
                        id: 'speed',
                        label: 'Typed Speed',
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
                        label: 'Avg. Typed Speed',
                        color: theme.palette.info.main
                    },
                    {
                        dataKey: 'mistakeAmount',
                        stack: 'assets',
                        label: 'Mistake Amount',
                        color: theme.palette.error.main
                    }
                ]}
                width={800}
                height={600}
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
