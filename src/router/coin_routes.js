// to handle coin routings

import App from "@/App";
const CoinHome = () => import("@/views/edcoins/CoinHome");
const CoinTrxDetail = () => import("@/views/edcoins/CoinTrxDetail");
const CoinScanQR = () => import("@/views/edcoins/CoinScanQR");
const CoinShowQR = () => import("@/views/edcoins/CoinShowQR");
const CoinTopUp = () => import("@/views/edcoins/CoinTopUp");
const CoinTopUpBuy = () => import("@/views/edcoins/CoinTopUpBuy");
const CoinTopUpBuyAck = () => import("@/views/edcoins/CoinTopUpBuyAck");
const CoinTopUpRedeemMarks = () => import("@/views/edcoins/CoinTopUpRedeemMarks");
const CoinTopUpGamified = () => import("@/views/edcoins/CoinTopUpGamified");
const CoinTopUpMarkDetail = () => import("@/views/edcoins/CoinTopUpMarkDetail");
const CoinTopUpMarkAttempt = () => import("@/views/edcoins/CoinTopUpMarkAttempt");
/*
import CoinHome from "@/views/edcoins/CoinHome";
import CoinTrxDetail from "@/views/edcoins/CoinTrxDetail";
import CoinScanQR from "@/views/edcoins/CoinScanQR";
import CoinShowQR from "@/views/edcoins/CoinShowQR";
import CoinTopUp from "@/views/edcoins/CoinTopUp";
import CoinTopUpBuy from "@/views/edcoins/CoinTopUpBuy";
import CoinTopUpBuyAck from "@/views/edcoins/CoinTopUpBuyAck";
import CoinTopUpRedeemMarks from "@/views/edcoins/CoinTopUpRedeemMarks";
import CoinTopUpGamified from "@/views/edcoins/CoinTopUpGamified";
*/

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
        path: 'detail/:trxID',
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
        path: 'top_up/redeem_marks/:mark_id',
        component: CoinTopUpMarkDetail,
        name : 'coin.top_up_redeem_marks_detail',
      },
      {
        path: 'top_up/redeem_marks/:mark_id/attempt',
        component: CoinTopUpMarkAttempt,
        name : 'coin.top_up_redeem_marks_attempt',
      },
      {
        path: 'top_up/gamified',
        component: CoinTopUpGamified,
        name : 'coin.top_up_gamified',
      },

    ],
}