import React from 'react';
import { Link } from 'react-router-dom';

const Test: React.FC = () => (
    <>
        <h1>{'Test Component'}</h1>
        <Link to={'/'}>{'Go Home'}</Link>
    </>
);

export default Test;
