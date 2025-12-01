import {useState, useEffect} from "react";
import { API_KEY, API_URL } from "../config";

import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import {ShoppingCart} from "./SoppingCart"
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addItem = (item) =>{
        const itemIndex = order.findIndex(orderItem => orderItem.offerId === item.offerId)
        if(itemIndex < 0){
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder(prevOrder => [...prevOrder, newItem])

        }
        else{
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return{
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }

                }
                else {
                    return orderItem;
                }

            });
            
            setOrder(newOrder);
        }
        setAlertName(item.displayName);
    }

    const removeItem = (id) => {
        const array = order.filter(item => item.offerId !== id.offerId);
        setOrder(array);
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    useEffect(function getGoods(){
        fetch(API_URL, 
            {headers: {
                "Authorization" : API_KEY,
            },
        }).then(respons => respons.json())
        .then(data => {
            data.shop && setGoods(data.shop);
            setLoading(false);
        });
    }, []);

    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.offerId === itemId){
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity
                }
            } else{
                return el;
            }
        });
        setOrder(newOrder);
    }
    const decQuantity = (itemId) => {
            const newOrder = order.map(el => {
            if (el.offerId === itemId){
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else{
                return el;
            }
        });
        setOrder(newOrder);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    return <main className="container content">
        <ShoppingCart quantity = {order.length} handleBasketShow = {handleBasketShow}/>

        {
            loading? <Preloader/> : <GoodsList goods = {goods} add={addItem}/>
        }
        {
            isBasketShow && 
                <BasketList 
                    arrayOfItems = {order} 
                    handleBasketShow = {handleBasketShow} 
                    removeItem = {removeItem}
                    incQuantity = {incQuantity} 
                    decQuantity = {decQuantity}
                />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
        }
    </main>
}

export {Shop};