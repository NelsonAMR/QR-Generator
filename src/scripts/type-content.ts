export type ContentType = "url" | "text" | "wifi" | "vcard";

const options = document.querySelectorAll<HTMLLabelElement>(
  ".aside-options .btn",
);
const inputGroup = document.getElementById("input-group") as HTMLDivElement;
const inputLabel = document.getElementById("input-label") as HTMLLabelElement;

function setActive(type: ContentType) {
  options.forEach((option) => {
    option.classList.toggle("active", option.dataset.type === type);
  });

  renderInput(type);
}

function renderInput(type: ContentType) {
  switch (type) {
    case "url":
      inputLabel.textContent = "Enlace del sitio";
      inputGroup.innerHTML = `
                <input type="url" placeholder="http://www.example.com" />
            `;
      break;
    case "text":
      inputLabel.textContent = "Texto a codificar";
      inputGroup.innerHTML = `
                <textarea placeholder="Escribe el texto aquí"></textarea>
            `;
      break;
    case "wifi":
      inputLabel.textContent = "Datos de la red WiFi";
      inputGroup.innerHTML = `
                <input type="text" placeholder="SSID de la red" />
                <input type="text" placeholder="Contraseña de la red" />
                <select>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Sin contraseña</option>
                </select>
            `;
      break;
    case "vcard":
      inputLabel.textContent = "Información de contacto (vCard)";
      inputGroup.innerHTML = `
                <input type="text" placeholder="Nombre completo" />
                <input type="text" placeholder="Teléfono" />
                <input type="email" placeholder="Correo electrónico" />
                <input type="text" placeholder="Dirección" />
            `;
      break;
  }
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    const type = option.dataset.type as ContentType;
    setActive(type);
  });
});

setActive("url");

