import QRCodeIcon  from "@/components/icons/QRCodeIcon";
import CoinsIcon  from "@/components/icons/CoinsIcon";
import ScanIcon from "@/components/icons/ScanIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import HomeIcon from "@/components/icons/HomeIcon";

export default [
    {
        tabName: 'Home',
        routeName: 'student.home', // should base on student or teacher
        icon: HomeIcon,
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
]
