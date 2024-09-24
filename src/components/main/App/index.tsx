import React, { FC } from 'react';
import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from '@/theme/dark';
//import { lightTheme } from './theme/light';
import Home from '@components/main/Home';
import Results from '@components/main/Results';
import RootLayout from '@components/shared/layouts/RootLayout';
import ErrorPage from '@components/pages/error';
import useAppLang from '@components/hooks/useAppLang';
import useExercise from '@components/hooks/useExercise';
import useTypingSpeed from '@components/hooks/useTypingSpeed';

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/results" element={<Results />} errorElement={<ErrorPage />} />
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
