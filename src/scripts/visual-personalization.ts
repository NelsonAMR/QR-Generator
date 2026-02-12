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

