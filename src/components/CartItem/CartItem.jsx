import { useState } from 'react';
import css from './CartItem.module.css';

export const CartItem = ({ item, onRemove, onUpdateAmount }) => {
  const baseImgUrl = 'http://';
  const defaultImg = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';

  const { id, poster_path, name, amount, price } = item;

  const [currentAmount, setCurrentAmount] = useState(amount);

  const calculateTotalPrice = () => {
    return (price * currentAmount).toFixed(2);
  };

  const handleDecrement = () => {
    const newAmount = (currentAmount > 1 ? currentAmount - 1 : 1);
    setCurrentAmount(newAmount);
    onUpdateAmount(newAmount);
  };

  const handleIncrement = () => {
    const newAmount = currentAmount + 1;
    setCurrentAmount(newAmount);
    onUpdateAmount(newAmount);
  };

  const formattedPrice = calculateTotalPrice();

  const handleRemoveClick = () => {
    onRemove(id);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.filter((cartItem) => cartItem.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <li className={css.cartItem}>
      <button type="button" onClick={handleRemoveClick} className={css.btnRemove}>
        &#10006;
      </button>
      <img src={poster_path ? `${baseImgUrl}${poster_path}` : defaultImg} alt={name} className={css.itemImg} />
      <div className={css.wrapper}>
        <h3 className={css.drugTitle}>{name}</h3>
        <p>Price: {formattedPrice}</p>
        <div className={css.btnWrapper}>
          <button 
            type="button" 
            onClick={handleDecrement} 
            data-action="decrement"
            className={currentAmount === 1 ? `${css.isHidden}` : css.btnChange }
          >
            -
          </button>
          <p className={css.price} id="value">{currentAmount}</p>
          <button 
            type="button" 
            onClick={handleIncrement} 
            data-action="increment"
            className={css.btnChange}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
