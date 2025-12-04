import { useEffect, useContext } from "react";
import {ShopContext} from '../contex';

function Alert (){
    const {alertName: name = '', closeAlert = Function.prototype} = useContext(ShopContext);
    useEffect(() => {
        const timerid = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerid);
        }
    // eslint-disable-next-line
    }, [name]);

    return <div id="toast-container">
        <div className="toast">{name} добавлен в корзину</div>
    </div>
}

export {Alert}