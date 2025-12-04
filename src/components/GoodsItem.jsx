import { useContext } from "react";
import { ShopContext } from "../contex";

function GoodsItem(props) {
    const {
        displayName,
        displayDescription,
        price,
        displayAssets,
        offerId,
    } = props;

    const {addToBasket} = useContext(ShopContext);
    const picture = displayAssets.length? (displayAssets[0].background) : (null);

    const add = () => {
      addToBasket({offerId, displayName, price, picture});
    }

    return   <div className="card" id={offerId} >
        <div className="card-image">
          <img src={picture} alt={displayName}/>

        </div>
        <div className="card-content">
          <span className="card-title" >{displayName}</span>
          <p>{displayDescription}</p>
        </div>
        <div className="card-action">
          <button className="btn" onClick = {add}>Купить</button>
          <span className="right" style = {{fontSize : "1.7rem"}}>{price.finalPrice} руб.</span>
        </div>
      </div>
}

export {GoodsItem}