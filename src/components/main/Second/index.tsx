import { useState, FC } from 'react';
import { Link } from 'react-router-dom';

const Second: FC = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <Link to={'/test'}>{'Go Test'}</Link>
        </>
    );
};

export default Second;
