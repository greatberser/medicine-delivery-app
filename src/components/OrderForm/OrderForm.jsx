import { useState } from "react";
import css from './OrderForm.module.css'

export const OrderForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            name,
            email,
            phone,
            address,
        };
        onSubmit(orderData);
        console.log(orderData);


        localStorage.setItem('orderData', JSON.stringify(orderData));

        onSubmit(orderData);

        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
    };    

    return(
        <form className={css.orderForm} onSubmit={handleSubmit}>
            <label className={css.orderLabel}>
                Name:
                <input 
                    type="text"
                    name="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    required
                    className={css.orderInput}
                />
            </label>

            <label className={css.orderLabel}>
                Email:
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example@gmail.com"
                    required
                    className={css.orderInput}
                />
            </label>

            <label className={css.orderLabel}>
                Phone:
                <input 
                    type="tel" 
                    name="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    placeholder="123-456-7890"
                    title="Number may contain only numbers and dashes. For example 111-11-11"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                    className={css.orderInput}
                />
            </label>

            <label className={css.orderLabel}>
                Address:
                <input 
                    type="address" 
                    name="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Address"
                    required
                    className={css.orderInput}
                />
            </label>

            <button type="submit" className={css.btnSubmit}>Submit</button>
        </form>
    );
}

export default OrderForm;