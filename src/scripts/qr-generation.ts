import { qrState } from "./qr/qr-state";
import { updateQR } from "./qr/qr-update";

const btnGenerate = document.getElementById(
  "btn-generate",
) as HTMLButtonElement;
const input = document.getElementById("input-qr-data") as HTMLInputElement;

btnGenerate.addEventListener("click", () => {
  if (!input.value.trim()) return;

  qrState.data = input.value;
  console.log("Updating QR with:", qrState.data);
  updateQR();
});

