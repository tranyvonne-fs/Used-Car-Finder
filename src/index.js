// Imports your SCSS stylesheet
import '/src/styles/index.scss';

// Import data from datasheet
import vehicleData from '/src/car-dataset.json';

// Create unique sets for years, makes, and models
const yearSet = new Set();
const makeSet = new Set();
const modelSet = new Set();

// Populate sets with data
vehicleData.forEach((vehicle) => {
  yearSet.add(vehicle.year);
  makeSet.add(vehicle.Manufacturer);
  modelSet.add(vehicle.model);
});

// Convert sets to sorted arrays
const orderedYears = Array.from(yearSet).sort((a, b) => b - a);
const orderedMakes = Array.from(makeSet).sort();
const orderedModels = Array.from(modelSet).sort();

// Grab dropdown elements from the DOM
const yearDropdown = document.querySelector('#finder-year');
const makeDropdown = document.querySelector('#finder-make');
const modelDropdown = document.querySelector('#finder-model');

// Populate the year dropdown with options
orderedYears.forEach((year) => {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearDropdown.appendChild(option);
});

// Helper function to retrieve makes by year
const fetchMakesByYear = (selectedYear) => {
  const filteredMakes = new Set();
  vehicleData.forEach((vehicle) => {
    if (vehicle.year === selectedYear) {
      filteredMakes.add(vehicle.Manufacturer);
    }
  });
  return filteredMakes;
};

// Helper function to retrieve models by year and make
const fetchModelsByYearAndMake = (selectedYear, selectedMake) => {
  const filteredModels = new Set();
  vehicleData.forEach((vehicle) => {
    if (vehicle.year === selectedYear && vehicle.Manufacturer === selectedMake) {
      filteredModels.add(vehicle.model);
    }
  });
  return filteredModels;
};

// Helper function to retrieve vehicle details
const findVehicle = (selectedYear, selectedMake, selectedModel) => {
  return vehicleData.find(
    (vehicle) =>
      vehicle.year === selectedYear &&
      vehicle.Manufacturer === selectedMake &&
      vehicle.model === selectedModel
  );
};

// Event listener for year selection
yearDropdown.addEventListener('change', () => {
  const selectedYear = Number(yearDropdown.value);
  const availableMakes = fetchMakesByYear(selectedYear);

  // Reset and populate the make dropdown
  makeDropdown.innerHTML = '';
  modelDropdown.innerHTML = '';
  availableMakes.forEach((make) => {
    const option = document.createElement('option');
    option.value = make;
    option.textContent = make;
    makeDropdown.appendChild(option);
  });

  makeDropdown.disabled = availableMakes.size === 0;
});

// Event listener for make selection
makeDropdown.addEventListener('change', () => {
  const selectedYear = Number(yearDropdown.value);
  const selectedMake = makeDropdown.value;
  const availableModels = fetchModelsByYearAndMake(selectedYear, selectedMake);

  // Reset and populate the model dropdown
  modelDropdown.innerHTML = '';
  availableModels.forEach((model) => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    modelDropdown.appendChild(option);
  });

  modelDropdown.disabled = availableModels.size === 0;
});

// Event listener for model selection
modelDropdown.addEventListener('change', () => {
  const selectedYear = Number(yearDropdown.value);
  const selectedMake = makeDropdown.value;
  const selectedModel = modelDropdown.value;

  console.log(findVehicle(selectedYear, selectedMake, selectedModel));
});
