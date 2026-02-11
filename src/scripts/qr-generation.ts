import QRCode from "qrcode";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const input = document.getElementById("input-qr-data") as HTMLInputElement;

function generateQR(text: string) {
  if (!canvas) return;

  QRCode.toCanvas(canvas, text, (error) => {
    if (error) console.error(error);
  });
}

input.addEventListener("click", () => generateQR(input.value));

