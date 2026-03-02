const downloadBtn = document.getElementById("download-qr") as HTMLButtonElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

function isCanvasEmpty(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return true;

  const pixelBuffer = new Uint32Array(
    ctx.getImageData(0, 0, canvas.width, canvas.height).data.buffer,
  );

  return !pixelBuffer.some((color) => color !== 0);
}

function downloadQR() {
  if (!canvas || isCanvasEmpty(canvas)) return;

  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = canvas.toDataURL();
  link.click();
}

downloadBtn.addEventListener("click", downloadQR);

