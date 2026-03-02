import QRCodeStyling from "qr-code-styling";

export const qr = new QRCodeStyling({
  width: 256,
  height: 256,
  data: "",
  margin: 10,

  dotsOptions: {
    type: "square",
    color: "#000000",
  },

  backgroundOptions: {
    color: "#FFFFFF",
  },
});

