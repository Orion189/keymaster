import { memo, FC } from 'react';
import TopBlock from '@components/main/TopBlock';
import CenterBlock from '@components/main/CenterBlock';
import BottomBlock from '@components/main/BottomBlock';
import useKeyPress from '@components/hooks/useKeyPress';
import styles from './style.module.scss';

const Home: FC = memo(() => {
    useKeyPress();
 
    return (
        <div className={styles.cont}>
            <TopBlock />
            <CenterBlock />
            <BottomBlock />
        </div>
    );
});

export default Home;
