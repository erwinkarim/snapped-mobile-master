import QRCodeIcon  from "@/components/icons/QRCodeIcon";
import CoinsIcon  from "@/components/icons/CoinsIcon";
import ScanIcon from "@/components/icons/ScanIcon";
import WalletIcon from "@/components/icons/WalletIcon";

export default [
    {
        tabName: 'Coins',
        routeName: 'coin.home',
        icon: CoinsIcon,
    },
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
    {
        tabName: 'Top-Up',
        routeName: 'coin.top_up',
        icon: WalletIcon,
    },
]
