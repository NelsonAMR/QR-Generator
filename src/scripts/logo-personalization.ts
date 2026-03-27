import { qrState } from "./qr/qr-state";
import { scheduleUpdateQR } from "./qr/qr-update";

const inputFile = document.getElementById("input-file") as HTMLInputElement;
const logoSizeSelector = document.getElementById("logo-size-selector") as HTMLProgressElement;
const logoSizeValueDisplay = document.getElementById(
  "logo-size-value",
) as HTMLSpanElement;
const logoContainer = document.querySelector(".config-logo-container") as HTMLDivElement | null;
const logoLabel = document.querySelector(
  '.config-logo-container label[for="input-file"]',
) as HTMLLabelElement | null;
logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";
qrState.logo.size = Number(logoSizeSelector.value) / 100;

if (inputFile) {
  const inputRect = inputFile.getBoundingClientRect();
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/c40f739a-5bd7-43c1-b72b-6af62c33a938",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"e2e79d"},body:JSON.stringify({sessionId:"e2e79d",runId:"logo-pre-fix",hypothesisId:"L1",location:"logo-personalization.ts:init",message:"Logo input initial state",data:{exists:true,disabled:inputFile.disabled,display:getComputedStyle(inputFile).display,visibility:getComputedStyle(inputFile).visibility,pointerEvents:getComputedStyle(inputFile).pointerEvents,width:Math.round(inputRect.width),height:Math.round(inputRect.height),collapsedContainer:logoContainer?.closest(".config-container")?.classList.contains("collapsed") ?? null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
}

function updateLogoSizeValue() {
  logoSizeValueDisplay.textContent = String(logoSizeSelector.value) + "%";
  qrState.logo.size = Number(logoSizeSelector.value) / 100;
  scheduleUpdateQR();
}

logoSizeSelector.addEventListener("input", updateLogoSizeValue);

logoLabel?.addEventListener("click", () => {
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/c40f739a-5bd7-43c1-b72b-6af62c33a938",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"e2e79d"},body:JSON.stringify({sessionId:"e2e79d",runId:"logo-pre-fix",hypothesisId:"L2",location:"logo-personalization.ts:logoLabel.click",message:"Logo label clicked",data:{labelFor:logoLabel.htmlFor},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
});

inputFile.addEventListener("click", () => {
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/c40f739a-5bd7-43c1-b72b-6af62c33a938",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"e2e79d"},body:JSON.stringify({sessionId:"e2e79d",runId:"logo-pre-fix",hypothesisId:"L3",location:"logo-personalization.ts:inputFile.click",message:"Logo file input clicked",data:{disabled:inputFile.disabled},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
});

inputFile.addEventListener("change", () => {
  const [file] = inputFile.files ?? [];
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/c40f739a-5bd7-43c1-b72b-6af62c33a938",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"e2e79d"},body:JSON.stringify({sessionId:"e2e79d",runId:"logo-pre-fix",hypothesisId:"L4",location:"logo-personalization.ts:inputFile.change",message:"Logo input change fired",data:{hasFile:Boolean(file),filesCount:inputFile.files?.length ?? 0,fileType:file?.type ?? null,fileSize:file?.size ?? null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (!file) {
    qrState.logo.src = "";
    scheduleUpdateQR();
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== "string") return;
    // #region agent log
    fetch("http://127.0.0.1:7242/ingest/c40f739a-5bd7-43c1-b72b-6af62c33a938",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"e2e79d"},body:JSON.stringify({sessionId:"e2e79d",runId:"logo-pre-fix",hypothesisId:"L5",location:"logo-personalization.ts:reader.onload",message:"Logo file loaded as data URL",data:{resultPrefix:reader.result.slice(0,30)},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    qrState.logo.src = reader.result;
    scheduleUpdateQR();
  };
  reader.readAsDataURL(file);
});