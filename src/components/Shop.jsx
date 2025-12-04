import {useEffect, useContext} from "react";
import { API_KEY, API_URL } from "../config";


import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import {ShoppingCart} from "./SoppingCart"
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";
import { ShopContext } from "../context";

function Shop() {
    const {loading, order, isBasketShow, alertName, setGoods} = useContext(ShopContext);


    useEffect(function getGoods(){
        fetch(API_URL, 
            {headers: {
                "Authorization" : API_KEY,
            },
        }).then(respons => respons.json())
        .then(data => {
            setGoods(data.shop);
        });
        // eslint-disable-next-line
    }, []);

    return <main className="container content">
        <ShoppingCart quantity = {order.length}/>

        {
            loading? <Preloader/> : <GoodsList/>
        }
        {
            isBasketShow && 
                <BasketList/>
        }
        {
            alertName && <Alert/>
        }
    </main>
}

export {Shop};