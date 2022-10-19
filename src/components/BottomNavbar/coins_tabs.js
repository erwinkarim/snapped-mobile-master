import QRCodeIcon  from "@/components/icons/QRCodeIcon";
import ScanIcon from "@/components/icons/ScanIcon";
import WalletIcon from "@/components/icons/WalletIcon";

export default [
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
