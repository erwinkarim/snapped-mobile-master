
const StoresHome = () => import("@/views/stores/StoresHome");
const StoresShow = () => import("@/views/stores/StoresShow");
const StoresProductShow = () => import("@/views/stores/StoresProductShow");
const StoresOrders = () => import("@/views/stores/StoresOrders");
const StoresOrdersNew = () => import("@/views/stores/StoresOrdersNew");
const StoresOrdersShow = () => import("@/views/stores/StoresOrdersShow");

import App from "@/App";

const authControlMeta = {
    checkAuth: 'true'
};

export default {

    path: '/stores',
    component: App,
    children: [
      {
        path: '',
        component: StoresHome,
        name: 'stores.home',
        meta: authControlMeta,
      },
      {
        path: '/orders',
        component: StoresOrders,
        name: 'stores.orders.home',
        meta: authControlMeta,
      },
      {
        path: '/orders/new',
        component: StoresOrdersNew,
        name: 'stores.orders.new',
        meta: authControlMeta,
      },
      {
        path: '/orders/:orderID',
        component: StoresOrdersShow,
        name: 'stores.orders.show',
        meta: authControlMeta,
      },
      {
        path: ':storeID',
        component: StoresShow,
        name: 'stores.show',
        meta: authControlMeta,
      },
      {
        path: ':storeID/products/:productID',
        component: StoresProductShow,
        name: 'stores.product.show',
        meta: authControlMeta,
      },
    ],
  };