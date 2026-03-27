import { qr } from "./qr-instance";
import { qrState } from "./qr-state";

let scheduledFrameId: number | null = null;

function getDotsType(rounded: number) {
  if (rounded <= 0) return "square";
  if (rounded >= 100) return "dots";
  if (rounded >= 60) return "extra-rounded";
  return "rounded";
}

function renderQRNow() {
  qr.update({
    width: qrState.size,
    height: qrState.size,

    data: qrState.data,

    margin: qrState.margin,

    dotsOptions: {
      color: qrState.frontColor,
      type: getDotsType(qrState.rounded),
    },

    backgroundOptions: {
      color: qrState.backColor,
    },

    image: qrState.logo.src || undefined,
    imageOptions: {
      imageSize: qrState.logo.size,
      margin: 5,
    },
  });
}

export function updateQR() {
  renderQRNow();
}

export function scheduleUpdateQR() {
  if (scheduledFrameId !== null) return;

  scheduledFrameId = requestAnimationFrame(() => {
    scheduledFrameId = null;
    renderQRNow();
  });
}

