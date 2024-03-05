import { lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router';
import SharedLayout from "./SharedLayout/SharedLayout";

const Shop = lazy(() => import('../pages/Shop/Shop'));
const Cart = lazy(() => import('../pages/Cart/Cart'));

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<Shop />} />
                    <Route path="cart" element={<Cart />} />

                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;