import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import css from './SharedLayout.module.css';

export default function SharedLayout() {
    const location = useLocation();

    return (
        <div>
            <header className={css.header}>
                <nav className={css.navMenu}>
                    <NavLink to={'/'} exact='true' className={`${css.navLink} ${location.pathname === '/' ? css.activeNavLink : ''}`}>
                        Shop
                    </NavLink>

                    <div className={css.verticalLine}></div>

                    <NavLink to={'/cart'} className={`${css.navLink} ${location.pathname === '/cart' ? css.activeNavLink : ''}`}>
                        Shopping Cart
                    </NavLink>
                </nav>
            </header>

            <main>
                <Suspense fallback={<div>LOADING</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
}
