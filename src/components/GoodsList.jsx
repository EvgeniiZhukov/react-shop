import { GoodsItem } from "./GoodsItem";

function GoodsList(props) {
   const {goods = [], add = Function.prototype} = props;
   return !goods.length ? (<h3>Nothing here</h3>) : 
   (<div className="goods">
        {goods.map(item => (<GoodsItem addItemToCart = {add} key = {item.offerId} {...item} />))}
   </div>)
}
export {GoodsList}