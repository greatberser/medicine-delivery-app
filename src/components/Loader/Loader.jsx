import { Rings } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
    return(
        <div className={css.loader}>
    <Rings
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />
    </div>);
}

export default Loader