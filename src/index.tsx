import React from 'react';
import { createRoot } from 'react-dom/client';
import { createHashRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme } from './theme/dark';
//import { lightTheme } from './theme/light';
import App from './components/main/App';
import Second from './components/main/Second';
import Root from './components/shared/layouts/Root';
import Test from './components/main/Test';
import ErrorPage from './components/pages/error';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createHashRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                <Route index element={<App />} />
                <Route path="second" element={<Second />} />
            </Route>
            <Route path="/test" element={<Test />} errorElement={<ErrorPage />} />
        </>
    )
);

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);
