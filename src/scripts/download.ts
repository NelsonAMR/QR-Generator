import { qr } from "./qr/qr-instance";
import { qrState } from "./qr/qr-state";

type UIFormat = "png" | "jpg" | "svg";
type QRExtension = "png" | "jpeg" | "svg";

const downloadBtn = document.getElementById("download-qr") as HTMLButtonElement | null;
const copyBtn = document.getElementById("copy-qr-btn") as HTMLButtonElement | null;
const copyFeedback = document.getElementById("copy-feedback") as HTMLSpanElement | null;
const formatInputs = document.querySelectorAll<HTMLInputElement>(
  'input[name="format"]',
);
const formatOptions = document.querySelectorAll<HTMLLabelElement>(
  ".format-options .btn",
);
let copyFeedbackTimeout: number | null = null;

function getSelectedFormat(): UIFormat {
  const selected = document.querySelector<HTMLInputElement>(
    'input[name="format"]:checked',
  );
  if (!selected) return "png";
  return selected.value as UIFormat;
}

function mapFormatToExtension(format: UIFormat): QRExtension {
  if (format === "jpg") return "jpeg";
  return format;
}

function hasQrData(): boolean {
  return Boolean(qrState.data.trim());
}

async function getQRBlob(format: UIFormat): Promise<Blob | null> {
  const extension = mapFormatToExtension(format);
  const rawData = await qr.getRawData(extension);

  if (!rawData) return null;
  if (rawData instanceof Blob) return rawData;

  return new Blob([rawData], {
    type: extension === "svg" ? "image/svg+xml" : `image/${extension}`,
  });
}

function setupFormatSelection() {
  const selected = getSelectedFormat();

  function setActiveFormat(format: UIFormat) {
    formatOptions.forEach((option) => {
      const input = option.querySelector<HTMLInputElement>('input[name="format"]');
      option.classList.toggle("active", input?.value === format);
    });
  }

  qrState.format = selected;
  setActiveFormat(selected);

  formatInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const format = getSelectedFormat();
      qrState.format = format;
      setActiveFormat(format);
    });
  });
}

async function downloadQR() {
  if (!hasQrData()) return;

  const format = qrState.format;
  const blob = await getQRBlob(format);
  if (!blob) return;

  const link = document.createElement("a");
  link.download = `qr-code.${format}`;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

function setCopyFeedback(message: string) {
  if (!copyFeedback) return;

  if (copyFeedbackTimeout !== null) {
    window.clearTimeout(copyFeedbackTimeout);
    copyFeedbackTimeout = null;
  }

  copyFeedback.textContent = message;

  copyFeedbackTimeout = window.setTimeout(() => {
    if (!copyFeedback) return;
    copyFeedback.textContent = "";
    copyFeedbackTimeout = null;
  }, 3000);
}

async function copyQRToClipboard() {
  if (!hasQrData() || !navigator.clipboard || !window.ClipboardItem) {
    setCopyFeedback("Genera un QR antes de copiar.");
    return;
  }

  const format = qrState.format;
  const blob = await getQRBlob(format);
  if (!blob) {
    setCopyFeedback("No se pudo copiar el QR.");
    return;
  }

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    setCopyFeedback("QR copiado al portapapeles.");
  } catch {
    setCopyFeedback("Tu navegador bloqueó la copia.");
  }
}

setupFormatSelection();

downloadBtn?.addEventListener("click", () => {
  void downloadQR();
});

copyBtn?.addEventListener("click", () => {
  void copyQRToClipboard();
});

