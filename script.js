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
const presetContainer = document.getElementById("presetContainer");

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

// Preset Filters
const filterPresets = {
  vintage: {
    name: "Vintage",
    filters: {
      brightness: 110,
      contrast: 85,
      saturation: 70,
      sepia: 40,
      hueRotation: -5,
    },
  },
  oldTown: {
    name: "Old Town",
    filters: {
      brightness: 95,
      contrast: 90,
      saturation: 60,
      sepia: 35,
      hueRotation: 15,
      grayscale: 15,
    },
  },
  dramatic: {
    name: "Dramatic",
    filters: {
      brightness: 85,
      contrast: 150,
      saturation: 110,
      hueRotation: -10,
    },
  },
  warmTone: {
    name: "Warm Tone",
    filters: {
      brightness: 105,
      saturation: 130,
      hueRotation: 20,
      sepia: 15,
    },
  },
  coolTone: {
    name: "Cool Tone",
    filters: {
      brightness: 100,
      contrast: 110,
      saturation: 90,
      hueRotation: 200,
    },
  },
  cinematic: {
    name: "Cinematic",
    filters: {
      brightness: 90,
      contrast: 130,
      saturation: 80,
      hueRotation: 10,
      blur: 1,
    },
  },
  noir: {
    name: "Noir",
    filters: {
      brightness: 85,
      contrast: 140,
      saturation: 0,
      grayscale: 100,
    },
  },
  dreamy: {
    name: "Dreamy",
    filters: {
      brightness: 115,
      contrast: 75,
      saturation: 120,
      blur: 2,
      opacity: 95,
    },
  },
  polaroid: {
    name: "Polaroid",
    filters: {
      brightness: 115,
      contrast: 90,
      saturation: 85,
      sepia: 25,
      hueRotation: 5,
    },
  },
  vibrant: {
    name: "Vibrant",
    filters: {
      brightness: 110,
      contrast: 120,
      saturation: 160,
    },
  },
  minimalist: {
    name: "Minimalist",
    filters: {
      brightness: 105,
      contrast: 95,
      saturation: 30,
      grayscale: 40,
    },
  },
};

// Object.keys(filterPresets).forEach((presetName) => {
//   const button = document.createElement("button");
//   button.textContent = filterPresets[presetName].name;
//   button.className = "preset-button";
//   presetContainer.appendChild(button);

//   button.addEventListener("click", () => {
//     const preset = filterPresets[presetName];

//     Object.keys(preset.filters).forEach((key,filterName) => {
//       const filterElement = createFilterControls(
//         key,
//         filters[key].min,
//         filters[key].max,
//         filters[key].default,
//         filters[key].unit
//       );
//     });
//     applyFilters();
//   });
// });

function createPresetButtons() {
  presetContainer.innerHTML = ""; // Clear existing buttons

  Object.keys(filterPresets).forEach((presetName) => {
    const preset = filterPresets[presetName];

    const button = document.createElement("button");
    button.textContent = preset.name;
    button.className = "preset-button";
    button.dataset.preset = presetName;

    button.addEventListener("click", () => {
      console.log(`Applying preset: ${preset.name}`, preset.filters);

      // Apply each filter from the preset's filters object
      Object.keys(preset.filters).forEach((filterName) => {
        // Check if this filter exists in our main filters object
        if (filters[filterName]) {
          const presetValue = preset.filters[filterName];

          // Update the filter value
          filters[filterName].value = presetValue;
          console.log(`Setting ${filterName} to ${presetValue}`);

          // Update the slider if it exists
          const slider = document.getElementById(filterName);
          if (slider) {
            slider.value = presetValue;
          }

          // Update the value display if it exists
          const valueSpan = document.getElementById(`${filterName}-value`);
          if (valueSpan) {
            valueSpan.textContent = `${presetValue}${filters[filterName].unit}`;
          }
        } else {
          console.warn(`Filter ${filterName} not found in filters object`);
        }
      });

      // Apply the filters to the image
      if (image) {
        applyFilters();
        console.log("Filters applied successfully!");
      } else {
        alert("Please upload an image first!");
      }
    });

    presetContainer.appendChild(button);
  });
}

// Initialize preset buttons
createPresetButtons();
