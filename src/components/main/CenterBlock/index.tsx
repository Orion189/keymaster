import React from 'react';
import { observer } from 'mobx-react-lite';
import store from '@/store';
import styles from './style.module.scss';

const CenterBlock: React.FC = observer(() => {
    return store.app.curExNum !== null ? (
        <div className={styles.cont}>
            {store.app.exercises[store.settings.lang]?.[store.app.curExNum].chars.join('')}
        </div>
    ) : null;
});

export default CenterBlock;
