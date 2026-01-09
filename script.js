let filters = {
  brightness: { min: 0, max: 200, value: 100, unit: "%" },
  contrast: { min: 0, max: 200, value: 100, unit: "%" },
  saturation: { min: 0, max: 200, value: 100, unit: "%" },
  hueRotation: { min: -180, max: 180, value: 0, unit: "deg" },
  blur: { min: 0, max: 255, value: 0, unit: "px" },
  grayscale: { min: 0, max: 100, value: 0, unit: "%" },
  sepia: { min: 0, max: 100, value: 0, unit: "%" },
  opacity: { min: 0, max: 100, value: 100, unit: "%" },
  invert: { min: 0, max: 100, value: 0, unit: "%" },
};

const filterContainer = document.getElementById("filters");
const imageUpload = document.getElementById("imageUpload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const placeholders = document.querySelectorAll("#placeholder");
let image = null;
let file = null;

const filter = document.getElementById("filters");
const input = document.getElementById("input");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

function createFilterControls(name, min, max, value, unit = "%") {
  const div = document.createElement("div");
  div.className = "filter";

  const label = document.createElement("label");
  label.textContent = name;
  label.htmlFor = name;

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  div.appendChild(label);
  div.appendChild(input);

  input.addEventListener("input", () => {
    filters[name].value = Number(input.value);
    console.log(filters[name], Number(input.value));
    applyFilters();
  });

  return div;
}

createFilterControls();

function createFilters() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterControls(
      key,
      filters[key].min,
      filters[key].max,
      filters[key].default,
      filters[key].unit
    );
    filterContainer.appendChild(filterElement);
  });
}
createFilters();

placeholders.forEach((placeholder) => {
  placeholder.addEventListener("click", () => {
    imageUpload.click();
  });
});

imageUpload.addEventListener("change", (event) => {
  file = event.target.files[0];
  const placeholderArea = document.querySelector(".placeholder-center");

  if (!file) {
    canvas.style.display = "none";
    canvas.style.width = "0";
    canvas.style.height = "0";
    placeholderArea.style.display = "flex";
    return;
  }

  placeholderArea.style.display = "none";

  image = new Image();
  image.src = URL.createObjectURL(file);

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
  };
});

function applyFilters() {
  if (!image) return; // ⬅ REQUIRED

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.filter = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturation.value}%)
    hue-rotate(${filters.hueRotation.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    opacity(${filters.opacity.value}%)
    invert(${filters.invert.value}%)
  `;
  ctx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: { min: 0, max: 200, value: 100, unit: "%" },
    contrast: { min: 0, max: 200, value: 100, unit: "%" },
    saturation: { min: 0, max: 200, value: 100, unit: "%" },
    hueRotation: { min: -180, max: 180, value: 0, unit: "deg" },
    blur: { min: 0, max: 255, value: 0, unit: "px" },
    grayscale: { min: 0, max: 100, value: 0, unit: "%" },
    sepia: { min: 0, max: 100, value: 0, unit: "%" },
    opacity: { min: 0, max: 100, value: 100, unit: "%" },
    invert: { min: 0, max: 100, value: 0, unit: "%" },
  };

  applyFilters();

  filterContainer.innerHTML = "";
  createFilters();
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
});
