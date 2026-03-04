import "../styles/main.css";

import "./type-content";
import "./collapse-section";
import "./visual-personalization";
import "./logo-personalization";
import "./qr-generation";
import "./download";

import { qr } from "./qr/qr-instance";
import { updateQR } from "./qr/qr-update";

const qrContainer = document.getElementById("qr-container") as HTMLDivElement;

if (!qrContainer) {
  throw new Error("QR container not found");
}

qr.append(qrContainer);

updateQR();
