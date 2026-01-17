import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import router from './router';
import store from './redux/store';
import './index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <HelmetProvider>
            <RouterProvider router={router} />
        </HelmetProvider>
    </Provider>
);