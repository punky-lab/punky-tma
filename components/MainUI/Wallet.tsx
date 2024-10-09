import { DynamicConnectButton, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import PopUp from "./PopUp";


interface WalletProps {
    onClose: () => void;
}

export default function Wallet({
    onClose,
}: WalletProps) {
    return (
        <PopUp title="Wallet" onClose={onClose}>
            <div className="flex grow items-center justify-center">
                <DynamicWidget />
            </div>
        </PopUp>
    );
}
