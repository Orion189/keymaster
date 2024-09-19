import React, { FC } from 'react';
import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '@/theme/dark';
//import { lightTheme } from './theme/light';
import Home from '@components/main/Home';
import Second from '@components/main/Second';
import Root from '@components/shared/layouts/Root';
import Test from '@components/main/Test';
import ErrorPage from '@components/pages/error';
import useAppLang from '@components/hooks/useAppLang';
import useExercise from '@components/hooks/useExercise';
import useTypingSpeed from '@components/hooks/useTypingSpeed';

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                <Route index element={<Home />} />
                <Route path="second" element={<Second />} />
            </Route>
            <Route path="/test" element={<Test />} errorElement={<ErrorPage />} />
        </>
    )
);

const App: FC = () => {
    useAppLang();
    useExercise();
    useTypingSpeed();

    return (
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </StyledEngineProvider>
        </React.StrictMode>
    );
};

export default App;
