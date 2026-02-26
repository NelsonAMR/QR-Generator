const logoSizeSelector = document.getElementById("logo-size-selector") as HTMLProgressElement;
const logoSizeValueDisplay = document.getElementById(
  "logo-size-value",
) as HTMLSpanElement;
logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";

function updateLogoSizeValue() {
  logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";
}

logoSizeSelector.addEventListener("input", updateLogoSizeValue);