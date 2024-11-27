export default function TxError() {
  const closeModal = () => {
    (document.getElementById("solana-popup-tx-error") as HTMLDialogElement)
      .close();
  };

  return (
    <dialog className="nes-dialog" id="solana-popup-tx-error">
      <form method="dialog">
        <p className="title">Transaction Error</p>
        <p id="solana-popup-tx-error-message"></p>
      </form>
      <menu className="dialog-menu">
        <button
          className="nes-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          className="nes-btn is-primary"
          onClick={closeModal}
        >
          Confirm
        </button>
      </menu>
    </dialog>
  );
}
