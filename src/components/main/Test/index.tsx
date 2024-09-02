import { memo, FC } from 'react';
import { Link } from 'react-router-dom';

const Test: FC = memo(() => (
    <>
        <h1>{'Test Component'}</h1>
        <Link to={'/'}>{'Go Home'}</Link>
    </>
));

export default Test;
