export default function InitializeGameAccount({
  onConfirm,
}: {
  onConfirm: () => void;
}) {
  return (
    <dialog className="nes-dialog" id="solana-popup-initialize">
      <form method="dialog">
        <p>
          You will be asked to sign a transaction to initialize your game
          account.
        </p>
        <p>
          This requires you to own a UXUY wallet account and have some Soon
          devnet tokens in your wallet.
        </p>
        <menu className="dialog-menu pt-2">
          <button className="nes-btn">Cancel</button>
          <button className="nes-btn is-primary" onClick={onConfirm}>
            Proceed
          </button>
        </menu>
      </form>
    </dialog>
  );
}
