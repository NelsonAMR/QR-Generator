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
const roundedSelector = document.getElementById("rounded-selector") as HTMLInputElement;
const roundedValueDisplay = document.getElementById("rounded-value") as HTMLSpanElement;
roundedValueDisplay.textContent = String(roundedSelector.value) + "%";

function updateColorPreview(input: HTMLInputElement) {
  const colorValue = input.value;
  const textInput = document.getElementById(
    `${input.id}-text`,
  ) as HTMLInputElement;
  textInput.value = colorValue;
}

function updateColorInput(input: HTMLInputElement) {
  const colorValue = input.value;
  if (/^#([0-9A-F]{3}){1,2}$/i.test(colorValue)) {
    const colorInput = document.getElementById(
      input.id.replace("-text", ""),
    ) as HTMLInputElement;
    colorInput.value = colorValue;
  }
}

function updateSizeValue() {
  sizeValueDisplay.textContent = String(sizeSelector.value) + "px";
}

function updateRoundedValue() {
  roundedValueDisplay.textContent = String(roundedSelector.value) + "%";
}

frontColorInput.addEventListener("input", () =>
  updateColorPreview(frontColorInput),
);
backColorInput.addEventListener("input", () =>
  updateColorPreview(backColorInput),
);

frontColorTextInput.addEventListener("input", () =>
  updateColorInput(frontColorTextInput),
);
backColorTextInput.addEventListener("input", () =>
  updateColorInput(backColorTextInput),
);

sizeSelector.addEventListener("input", updateSizeValue);

roundedSelector.addEventListener("input", updateRoundedValue);

