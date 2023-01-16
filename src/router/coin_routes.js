// to handle coin routings

import App from "@/App";
import CoinHome from "@/views/edcoins/CoinHome";
import CoinTrxDetail from "@/views/edcoins/CoinTrxDetail";
import CoinScanQR from "@/views/edcoins/CoinScanQR";
import CoinShowQR from "@/views/edcoins/CoinShowQR";
import CoinTopUp from "@/views/edcoins/CoinTopUp";
import CoinTopUpBuy from "@/views/edcoins/CoinTopUpBuy";
import CoinTopUpBuyAck from "@/views/edcoins/CoinTopUpBuyAck";
import CoinTopUpRedeemMarks from "@/views/edcoins/CoinTopUpRedeemMarks";
import CoinTopUpGamified from "@/views/edcoins/CoinTopUpGamified";

const authControlMeta = {
    checkAuth: 'true'
}

export default {

    path: '/coins',
    component: App,
    children: [
      /* HOME */
      {
        path: '',
        component: CoinHome,
        name: 'coin.home',
        meta: authControlMeta,
      },
      {
        path: '/detail/:trxID',
        component: CoinTrxDetail,
        name: 'coin.trxDetail',
        meta: authControlMeta,
      },
      {
        path: 'scan_qr',
        component: CoinScanQR,
        name : 'coin.scan_qr',
      },
      {
        path: 'show_qr',
        component: CoinShowQR,
        name : 'coin.show_qr',
      },
      {
        path: 'top_up',
        component: CoinTopUp,
        name : 'coin.top_up',
      },
      {
        path: 'top_up/buy',
        component: CoinTopUpBuy,
        name : 'coin.top_up_buy',
      },
      {
        path: 'top_up/buy/ack',
        component: CoinTopUpBuyAck,
        name : 'coin.top_up_buy_ack',
      },
      {
        path: 'top_up/redeem_marks',
        component: CoinTopUpRedeemMarks,
        name : 'coin.top_up_redeem_marks',
      },
      {
        path: 'top_up/gamified',
        component: CoinTopUpGamified,
        name : 'coin.top_up_gamified',
      },

    ],
}