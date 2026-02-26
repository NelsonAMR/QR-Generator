import QRCode from "qrcode";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const input = document.getElementById("input-qr-data") as HTMLInputElement;
const btnGenerate = document.getElementById("btn-generate") as HTMLButtonElement;

function generateQR(text: string) {
  if (!canvas) return;

  QRCode.toCanvas(canvas, text, (error) => {
    if (error) console.error(error);
  });
}

btnGenerate.addEventListener("click", () => {
  generateQR(input.value)
});

