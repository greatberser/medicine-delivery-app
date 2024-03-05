import css from './ShopList.module.css';

export const ShopList = ({ shops, onSelectShop }) => {

  const handleShopClick = (shopId) => {
    onSelectShop(shopId);
  };

  return (
    <ul className={css.shopList}>
    {shops.map((shop) => (
      <li key={shop.id}>
        <button onClick={() => handleShopClick(shop.id)} className={css.shopLink}>{shop.name}</button>
      </li>
    ))}
  </ul>
  );
};

export default ShopList;
