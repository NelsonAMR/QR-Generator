import { qrState } from "./qr/qr-state";
import { scheduleUpdateQR } from "./qr/qr-update";

const frontColorInput = document.getElementById(
  "front-color",
) as HTMLInputElement;
const frontColorTextInput = document.getElementById(
  "front-color-text",
) as HTMLInputElement;
const backColorInput = document.getElementById(
  "back-color",
) as HTMLInputElement;
const backColorTextInput = document.getElementById(
  "back-color-text",
) as HTMLInputElement;
const sizeSelector = document.getElementById("size-selector") as HTMLProgressElement;
const sizeValueDisplay = document.getElementById("size-value") as HTMLSpanElement;
sizeValueDisplay.textContent = String(sizeSelector.value) + "px";
const previewHeaderSize = document.querySelector(
  ".preview-header-size",
) as HTMLSpanElement | null;
if (previewHeaderSize) {
  previewHeaderSize.textContent = `${sizeSelector.value} x ${sizeSelector.value} px`;
}
const roundedSelector = document.getElementById("rounded-selector") as HTMLInputElement;
const roundedValueDisplay = document.getElementById("rounded-value") as HTMLSpanElement;
roundedValueDisplay.textContent = String(roundedSelector.value) + "%";

function updateColorPreview(input: HTMLInputElement, shouldRender: boolean) {
  const colorValue = input.value;
  const textInput = document.getElementById(
    `${input.id}-text`,
  ) as HTMLInputElement;
  textInput.value = colorValue;
  if (input.id === "front-color") {
    qrState.frontColor = colorValue;
  } else if (input.id === "back-color") {
    qrState.backColor = colorValue;
  }
  if (shouldRender) scheduleUpdateQR();
}

function updateColorInput(input: HTMLInputElement) {
  const colorValue = input.value;
  if (/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
    const colorInput = document.getElementById(
      input.id.replace("-text", ""),
    ) as HTMLInputElement;
    colorInput.value = colorValue;
    if (input.id === "front-color-text") {
      qrState.frontColor = colorValue;
    } else if (input.id === "back-color-text") {
      qrState.backColor = colorValue;
    }
    scheduleUpdateQR();
  }
}

function updateSizeValue() {
  sizeValueDisplay.textContent = String(sizeSelector.value) + "px";
  qrState.size = Number(sizeSelector.value);
  if (previewHeaderSize) {
    previewHeaderSize.textContent = `${sizeSelector.value} x ${sizeSelector.value} px`;
  }
  scheduleUpdateQR();
}

function updateRoundedValue() {
  roundedValueDisplay.textContent = String(roundedSelector.value) + "%";
  qrState.rounded = Number(roundedSelector.value);
  scheduleUpdateQR();
}

frontColorInput.addEventListener("input", () => {
  updateColorPreview(frontColorInput, false);
});
backColorInput.addEventListener("input", () => {
  updateColorPreview(backColorInput, false);
});
frontColorInput.addEventListener("change", () => {
  updateColorPreview(frontColorInput, true);
});
backColorInput.addEventListener("change", () => {
  updateColorPreview(backColorInput, true);
});

frontColorTextInput.addEventListener("input", () =>
  updateColorInput(frontColorTextInput),
);
backColorTextInput.addEventListener("input", () =>
  updateColorInput(backColorTextInput),
);

sizeSelector.addEventListener("input", updateSizeValue);

roundedSelector.addEventListener("input", updateRoundedValue);

