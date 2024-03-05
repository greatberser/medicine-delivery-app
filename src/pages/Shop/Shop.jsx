import { useState, useEffect } from 'react';
import { ShopList } from '../../components/ShopList/ShopList';
import { DrugList } from '../../components/DrugList/DrugList';
import { Loader } from '../../components/Loader/Loader';
import * as api from '../../services/api';
import css from './Shop.module.css';

export default function Shop() {
    const [shops, setShops] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [selectedShopId, setSelectedShopId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function getListShops() {
            try {
                setIsLoading(true);
                const response = await api.getShops();
                setShops(response);
                if (!selectedShopId && response.length > 0) {
                    setSelectedShopId(response[0]?.id);
                }
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        getListShops();
    }, [selectedShopId]);

    useEffect(() => {
        async function getListDrugs() {
            try {
                setIsLoading(true);
                const response = await api.getDrugsByShopId(selectedShopId);
                setDrugs(response);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
    
        if (selectedShopId) {
            getListDrugs();
        }
    }, [selectedShopId]);

    const handleShopChange = (shopId) => {
        setSelectedShopId(shopId);
    };
    const handleAddToCart = (drug) => {
        setCart((prevCart) => [...prevCart, drug]);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div>
                <b>:{'\u0028'}</b> Something went wrong{' '}
            </div>
        );
    }

    return (
        <div className="container" style={{display: 'flex', flexDirection: 'row', gap: '40px', paddingTop: '50px'}}>
            <div className={css.shopContainer}>
                <h3 className={css.shopTitle}>Shops:</h3>
                <ShopList shops={shops} onSelectShop={handleShopChange} />
            </div>

            {selectedShopId && (
                <div className={css.drugsContainer}>
                    <DrugList drugs={drugs} onAddToCart={handleAddToCart} />
                </div>
            )}
        </div>
    );
}
