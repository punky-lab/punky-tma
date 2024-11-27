export function showTxErrorModal(message: string) {
  (document.getElementById("solana-popup-tx-error") as HTMLDialogElement)?.showModal();
  (document.getElementById("solana-popup-tx-error-message") as HTMLParagraphElement).innerText = message;
}

export function showInitializeModal() {
  (document.getElementById("solana-popup-initialize") as HTMLDialogElement)?.showModal();
}
