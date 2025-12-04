import { useContext } from "react";
import {ShopContext} from '../contex';

function BasketItem (props) {
    const {
        displayName,
        price,
        offerId,
        picture,
        quantity, 
    } = props;

    const {removeFromBasket, incQuantity, decQuantity} = useContext(ShopContext);

return (
    <li className="collection-item avatar" id = {offerId}>
        <img src={picture} alt="" className="circle"/>
        <span className="title">{displayName}</span>
        <p>Цена: {price.finalPrice} <br/>
            Кол-во: 
                <i
                    className="material-icons basket-quantity"
                    onClick={() => decQuantity(offerId)}
                >
                    remove
                </i>{" "}
                x{quantity}{" "}
                <i
                    className="material-icons basket-quantity"
                    onClick={() => incQuantity(offerId)}
                >
                    add 
                    </i>
        </p>
        <span className="secondary-content"><i className="material-icons basket-delete" onClick = {() => {removeFromBasket(offerId)}}>delete</i></span>
    </li>
);
}

export {BasketItem}