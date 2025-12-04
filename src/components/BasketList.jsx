import {useContext} from 'react';
import {ShopContext} from '../context'

import { BasketItem } from "./BasketItem"
function BasketList () {
    const {
            order: arrayOfItems = [],
            handleBasketShow = Function.prototype, 
        } = useContext(ShopContext)
    const totalPrice = arrayOfItems.reduce((sum, element) => {
        // console.log(sum, element.price , element.quantity);
        return sum + element.price.finalPrice * element.quantity
    }, 0)

    return(
            <ul className = "collection basket-list">
                <li className="collection-item active">Корзина <span className="secondary-content"><i className="material-icons basket-close" onClick={handleBasketShow}>close</i></span></li>
                {
                    arrayOfItems.length? arrayOfItems.map(item => <BasketItem 
                                                                    key = {item.offerId} {...item} 
                                                                />):
                    <li className="collection-item">Корзина пуста</li>
                }
                <li className="collection-item active">Общая стоимость: {totalPrice} руб. 
                </li>
                <li className = "collection-item">
                    <button 
                        className="btn btn-small ">Оформить
                    </button>
                </li>
            </ul>
)
}
export {BasketList}