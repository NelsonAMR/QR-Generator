import { qrState } from "./qr/qr-state";
import { scheduleUpdateQR } from "./qr/qr-update";

const inputFile = document.getElementById("input-file") as HTMLInputElement;
const logoSizeSelector = document.getElementById("logo-size-selector") as HTMLProgressElement;
const logoSizeValueDisplay = document.getElementById(
  "logo-size-value",
) as HTMLSpanElement;
logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";
qrState.logo.size = Number(logoSizeSelector.value) / 100;

function updateLogoSizeValue() {
  logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";
  qrState.logo.size = Number(logoSizeSelector.value) / 100;
  scheduleUpdateQR();
}

logoSizeSelector.addEventListener("input", updateLogoSizeValue);

inputFile.addEventListener("change", () => {
  const [file] = inputFile.files ?? [];

  if (!file) {
    qrState.logo.src = "";
    scheduleUpdateQR();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== "string") return;
    qrState.logo.src = reader.result;
    scheduleUpdateQR();
  };
  reader.readAsDataURL(file);
});