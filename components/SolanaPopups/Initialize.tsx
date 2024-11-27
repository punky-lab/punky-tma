export default function InitializeGameAccount({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  return (
    <dialog className="nes-dialog" id="solana-popup-initialize">
      <form method="dialog">
        <p className="title">Sign Transaction</p>
        <p>
          You will be asked to sign a transaction to initialize your game
          account.
        </p>
        <p>
          This requires you to own a UXUY wallet account and have some Sonic
          Testnet tokens in your balance.
        </p>
        <menu className="dialog-menu">
          <button className="nes-btn">Cancel</button>
          <button className="nes-btn is-primary" onClick={onConfirm}>
            Proceed
          </button>
        </menu>
      </form>
    </dialog>
  );
}
