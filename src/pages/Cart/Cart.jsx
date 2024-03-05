import { useState, useEffect } from "react";
import { OrderForm } from "../../components/OrderForm/OrderForm";
import { CartItem } from "../../components/CartItem/CartItem";
import { getDrugsFromCart } from "../../services/api";
import css from './Cart.module.css';

export default function Cart({ initialCarts }) {
    const [carts, setCarts] = useState(initialCarts || []);
    // eslint-disable-next-line
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
      calculateTotalPrice();
      // eslint-disable-next-line
    }, [carts]);
  
    const calculateTotalPrice = () => {
      const total = carts.reduce((acc, item) => acc + item.price * item.amount, 0);
      setTotalPrice(total);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartData = await getDrugsFromCart();
                setCarts(cartData || []);
            } catch (error) {
                console.error("Error reading data:", error.message);
            }
        };

        fetchData();
    }, []);

    const handleRemove = (id) => {
        const updateCarts = carts.filter(item => item.id !== id);
        setCarts(updateCarts);
    }

    const handleUpdateAmount = (id, newAmount) => {
        const updatedCarts = carts.map((item) => {
          if (item.id === id) {
            const priceDifference = (newAmount - item.amount) * item.price;
            setTotalPrice((prevTotalPrice) => prevTotalPrice + priceDifference);
            return { ...item, amount: newAmount };
          }
          return item;
        });
    
        setCarts(updatedCarts);
    };
      
    const handleOrderSubmit = () => {
        const orderData = {};
        const orderedItems = [...carts];
        setOrders((prevOrders) => [...prevOrders, { ...orderData, items: orderedItems }]);
        setCarts([]);
    };

    return (
        <div className="container" style={{ paddingTop: '50px' }}>
          <div className={css.wrapper}>
            <OrderForm onSubmit={handleOrderSubmit} />
            <ul className={css.cartList}>
              {carts.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemove(item.id)}
                  onUpdateAmount={(newAmount) => handleUpdateAmount(item.id, newAmount)}
                />
              ))}
            </ul>
          </div>
          <div className={css.wrapperPrice}>
            <p className={css.priceText}>Total price: <span className={css.priceNumber}>{totalPrice.toFixed(2)}</span></p>
          </div>
        </div>
    );
}
