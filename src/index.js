// Imports your SCSS stylesheet
import './style.scss';

import data from './data.json'

const years   = new Set()
const makes   = new Set()
const models  = new Set()


data.forEach(car => { 
  years.add(car.year) 
  makes.add(car.Manufacturer)
  models.add(car.model)
});

const sortedYears = new Array(...years).sort().reverse();
const sortedMakes = new Array(...makes).sort();
const sortedModels = new Array(...models).sort();


const yearEl = document.querySelector('#car-finder-year')
const makeEl = document.querySelector('#car-finder-make')
const modelEl = document.querySelector('#car-finder-model')

// Populate our initial year dropdown
sortedYears.forEach((year) => {
  const opt = document.createElement(`option`)
  opt.value = year
  opt.text = year
  yearEl.appendChild(opt)
})

function getMakesByYear(year)
{
  const makes = new Set()
  data.forEach((v) => {
    if(Number(v.year) === Number(year)) {
      makes.add(v.Manufacturer)
    }
  })
  return makes
}

function getModelsByYearMake(year, make)
{
  const models = new Set()
  data.forEach((v) => {
    if(
      v.year === year &&
      v.Manufacturer === make
    ) {
      models.add(v.model)
    }
  })
  return models
}

function getVehicle(year, make, model)
{
  return data.find( car => 
    car.year === year && car.Manufacturer === make && car.model === model 
  )
}

// Listen to when its been updated
yearEl.addEventListener('change', (e) => {
  const { value } = yearEl
  const makes = getMakesByYear(Number(value))
  makeEl.innerHTML = ''
  modelEl.innerHTML = ''
  makes.forEach((make) => {
    const opt = document.createElement(`option`)
    opt.value = make
    opt.text = make
    makeEl.appendChild(opt)
    makeEl.disabled = false
  })
})

makeEl.addEventListener('change', (e) => {
  const { value } = makeEl
  const { value: year } = yearEl
  modelEl.innerHTML = ''
  const models = getModelsByYearMake(Number(year), value)
  models.forEach((model) => {
    const opt = document.createElement(`option`)
    opt.value = model 
    opt.text = model
    modelEl.appendChild(opt)
    modelEl.disabled = false
  })
})

modelEl.addEventListener('change', (e) => {
  const { value: year } = yearEl
  const { value: make } = makeEl
  const { value: model } = modelEl
  console.log(getVehicle(Number(year), make, model))
})
