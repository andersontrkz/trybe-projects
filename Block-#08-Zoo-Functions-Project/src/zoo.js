/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const data = require('./data');

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  const filteredAnimals = animals.filter((animal) => {
    const animalById = ids.find((id) => animal.id === id);

    return animalById;
  });

  return filteredAnimals;
}

function animalsOlderThan(animal, age) {
  const animalsFilteredSpecie = animals.find(({ name }) => name === animal);

  const animalsFilteredAge = animalsFilteredSpecie.residents.every((element) => element.age >= age);

  return animalsFilteredAge;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  const employeeFound = employees.find(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  ));

  return employeeFound;
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    ...personalInfo,
    ...associatedWith,
  };

  return newEmployee;
}

function isManager(id) {
  const boolManager = employees.some((manager) => manager.managers.includes(id));

  return boolManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = employees.push({ id, firstName, lastName, managers, responsibleFor });

  return newEmployee;
}

function animalCount(species) {
  if (!species) {
    const animalsAmount = animals.reduce((accumulator, current) => {
      accumulator[current.name] = current.residents.length;

      return accumulator;
    }, {});

    return animalsAmount;
  }
  const amount = animals.find((animal) => animal.name === species).residents.length;

  return amount;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  const totalPrice = Object.keys(entrants).reduce((accumulator, current) => (
    accumulator + (entrants[current] * prices[current]
    )), 0);

  return totalPrice;
}

function animalMap(options) {
  if (!options) {
    const location = animals.map((animal) => animal.location);

    return location;
  }

  const includeNames = Object.entries(options).includes('includeNames', true);
  console.log(includeNames);
  console.log(Object.entries(options));
}

console.log(animalMap({ includeNames: true, sex: 'female' }));

function schedule(dayName) {
  const time = {};
  const expedient = Object.keys(hours);
  if (!dayName) {
    expedient.map((element, callback) => {
      const timetable = hours[element];
      time[element] = `Open from ${timetable.open}am until ${timetable.close - 12}pm`;
      time.Monday = 'CLOSED';
      return callback;
    });
    return time;
  }
  if (dayName === 'Monday') {
    time.Monday = 'CLOSED';
    return time;
  }
  const { open, close } = hours[dayName];
  time[dayName] = `Open from ${open}am until ${close - 12}pm`;
  return time;
}

function oldestFromFirstSpecies(id) {
  const responsibleAnimals = employees.find(({ id: employeeId }) => (
    employeeId === id
  )).responsibleFor[0];

  const residentsAnimals = animals.find((animal) => animal.id === responsibleAnimals).residents;

  const oldestAnimal = Object.values(residentsAnimals.sort((smaller, bigger) => (
    bigger.age - smaller.age
  ))[0]);

  return oldestAnimal;
}

function increasePrices(percentage) {
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  const increasedPrices = {
    Adult: parseFloat((prices.Adult + (prices.Adult * (percentage / 100)) + 0.001).toFixed(2)),
    Senior: parseFloat((prices.Senior + (prices.Senior * (percentage / 100)) + 0.001).toFixed(2)),
    Child: parseFloat((prices.Child + (prices.Child * (percentage / 100)) + 0.001).toFixed(2)),
  };

  Object.assign(prices, increasedPrices);
}

function employeeCoverage(idOrName) {
  const filteredEmployee = employees.filter((employee) => {
    if (idOrName) {
      return idOrName === employee.id || idOrName === employee.firstName
      || idOrName === employee.lastName;
    }
    return {};
  });
  const reduceAnimalsByEmployee = filteredEmployee.reduce(
    (accumulator, { firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      const responsibleAnimals = responsibleFor.map((animalid) => (
        animals.find((animal) => animal.id === animalid).name
      ));
      accumulator[fullName] = responsibleAnimals;
      return accumulator;
    }, {},
  );
  return reduceAnimalsByEmployee;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
