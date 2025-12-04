import { useContext } from "react";
import { ShopContext } from '../context';

function ShoppingCart (){
    const {order, handleBasketShow = Function.prototype} = useContext(ShopContext);

    const quantity = order.lenth

    return (
        <div className="cart blue darken-4 white-text" onClick={handleBasketShow}>
            <i className="material-icons">shopping_basket</i>
            {quantity ? <span className="cart-quantity">{quantity} </span> : null}
        </div>
    )
}
export {ShoppingCart}