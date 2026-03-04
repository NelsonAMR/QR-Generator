import { qr } from "./qr-instance";
import { qrState } from "./qr-state";

export function updateQR() {
  qr.update({
    width: qrState.size,
    height: qrState.size,

    data: qrState.data,

    margin: qrState.margin,

    dotsOptions: {
      color: qrState.frontColor,
      type:
        qrState.rounded === 0
          ? "square"
          : qrState.rounded < 50
            ? "rounded"
            : "extra-rounded",
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

