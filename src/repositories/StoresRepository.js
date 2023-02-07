import Repository from "@/repositories/Repository";

const token = localStorage.getItem('token');

export default {
  storeIndex(){
    // get all the stores
    return Repository.get('/stores', {
    });
  },
  storeDetail(storeID){
    // get all the stores
    return Repository.get(`/stores/${storeID}`, {
    });
  },
  storeProducts(storeID){
    // set all products 
    return Repository.get(`/stores/${storeID}/storeProducts`, {
      headers: { 
        'Content-Type': 'application/json'
      }
    });
  },
  storeProduct(storeID, productID){
    // get product info 
    return Repository.get(`/stores/${storeID}/storeProducts/${productID}`, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  storeNewOrder(orderDetail){
    // make a new order
    return Repository.post(`/orders`, {
      orderDetail,
    });
  },
  storeOrders(){
    // get your orders
    return Repository.get(`/orders/`, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },
  storeGetOrder(orderID){
    // get a specific orders
    return Repository.get(`/orders/${orderID}`, {
        headers: {
            Accept: "application/json",
            Authorization: 'Bearer ' + token,
        }
    });
  },

}