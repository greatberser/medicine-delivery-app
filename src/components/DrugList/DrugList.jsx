import { useState, useEffect } from 'react';
import css from './DrugList.module.css'
export const DrugList = ({ drugs, onAddToCart }) => {
    const baseImgUrl = 'http://';
    const defaultImg = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

    const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

    const [cart, setCart] = useState(initialCart);

    const isProductInCart = (id) => cart.some((item) => item.id === id);

    const handleToggleCart = (drug) => {
        const isInCart = cart.some((item) => item.id === drug.id);

        if (isInCart) {
            setCart((prevCart) => prevCart.filter((item) => item.id !== drug.id));
            onAddToCart({ ...drug, amount: -1 });
        } else {
            setCart((prevCart) => [...prevCart, { ...drug, amount: 1 }]);
            onAddToCart({ ...drug, amount: 1 });
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <ul className={css.drugList}>
            {Array.isArray(drugs) && drugs.length > 0 && drugs.map(({ id, poster_path, name, price }) => (
                <li key={id} className={css.drugItem}>
                    <img
                        src={poster_path ? `${baseImgUrl}${poster_path}` : defaultImg}
                        alt={name}
                        className={css.drugImg}
                    />

                    <div className={css.wrapper}>
                        <p className={css.drugTitle}>{name}</p>
                        <button 
                            type="button" 
                            onClick={() => handleToggleCart({ id, name, price })}
                            className={css.btnAddToCart}
                        >
                            {isProductInCart(id) ? 'Remove from Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};
