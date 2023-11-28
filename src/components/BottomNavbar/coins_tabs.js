import QRCodeIcon  from "@/components/icons/QRCodeIcon";
import CoinsIcon  from "@/components/icons/CoinsIcon";
import ScanIcon from "@/components/icons/ScanIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import HomeIcon2 from "@/components/icons/HomeIcon2";
import StoreIcon from "@/components/icons/StoreIcon";

export default [
    {
        tabName: 'Home',
        routeName: 'login', // should base on student or teacher
        icon: HomeIcon2,
    },
    {
        tabName: 'Coins',
        routeName: 'coin.home',
        icon: CoinsIcon,
    },
    /*
        QR trading will be done later.
    {
        tabName: 'Scan QR',
        routeName: 'coin.scan_qr',
        icon: ScanIcon,
    },
    {
        tabName: 'Show QR',
        routeName: 'coin.show_qr',
        icon: QRCodeIcon,
    },
    */
    {
        tabName: 'Top-Up',
        routeName: 'coin.top_up',
        icon: WalletIcon,
    },
    {
        tabName: 'Store',
        routeName: 'stores.home',
        icon: StoreIcon,
    },
]
