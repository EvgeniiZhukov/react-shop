import { useContext } from "react";
import { ShopContext } from "../contex";
import { GoodsItem } from "./GoodsItem";

function GoodsList() {
   const {goods = []} = useContext(ShopContext);

   return !goods.length ? (<h3>Nothing here</h3>) : 
   (<div className="goods">
        {goods.map(item => (<GoodsItem key = {item.offerId} {...item} />))}
   </div>)
}
export {GoodsList}