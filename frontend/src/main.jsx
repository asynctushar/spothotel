import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
