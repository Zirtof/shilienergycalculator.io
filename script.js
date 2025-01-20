// Константы для расчётов
// Точное количество дней в месяце и году по условию
const DAYS_IN_MONTH = 30.44;
const DAYS_IN_YEAR = 365.25;
const HOURS_IN_DAY = 24;
const HOURS_IN_WEEK = 24 * 7;

// Функция для валидации числовых значений
function isValidNumber(value) {
  return !isNaN(value) && value >= 0;
}

// Функция, рассчитывающая сколько часов всего отработал прибор
// в зависимости от выбранной единицы измерения.
function calculateTotalHours(timeValue, timeUnit) {
  switch (timeUnit) {
    case "hours":
      return timeValue;
    case "days":
      return timeValue * HOURS_IN_DAY;
    case "weeks":
      return timeValue * HOURS_IN_WEEK;
    case "months":
      return timeValue * HOURS_IN_DAY * DAYS_IN_MONTH;
    case "years":
      return timeValue * HOURS_IN_DAY * DAYS_IN_YEAR;
    default:
      return 0;
  }
}

// Функция, которая рассчитывает стоимость при непрерывной работе
function calculateContinuousCost(power, costPerKWh) {
  // Мощность прибора (Вт) переводим в кВт (делим на 1000),
  // умножаем на тариф => получаем стоимость за 1 час
  const costPerHour = (power / 1000) * costPerKWh;
  const costPerDay = costPerHour * HOURS_IN_DAY;
  const costPerWeek = costPerDay * 7;
  const costPerMonth = costPerDay * DAYS_IN_MONTH;
  const costPerYear = costPerDay * DAYS_IN_YEAR;

  return {
    hourly: costPerHour,
    daily: costPerDay,
    weekly: costPerWeek,
    monthly: costPerMonth,
    yearly: costPerYear
  };
}

// Основная функция для обработки данных из формы и вывода результатов
function handleFormSubmit(event) {
  event.preventDefault();

  // Получаем значения из формы
  const powerInput = document.getElementById("powerInput");
  const timeValueInput = document.getElementById("timeValueInput");
  const timeUnitSelect = document.getElementById("timeUnitSelect");
  const costInput = document.getElementById("costInput");

  const power = parseFloat(powerInput.value);
  const timeValue = parseFloat(timeValueInput.value);
  const timeUnit = timeUnitSelect.value;
  const costPerKWh = parseFloat(costInput.value);

  // Валидация данных
  if (!isValidNumber(power) || !isValidNumber(timeValue) || !isValidNumber(costPerKWh)) {
    alert("Пожалуйста, введите корректные числовые значения!");
    return;
  }

  // Считаем общее количество часов работы за указанный промежуток
  const totalHours = calculateTotalHours(timeValue, timeUnit);

  // Переводим мощность из Вт в кВт
  const powerInKW = power / 1000;

  // Считаем общее потребление кВт·ч
  const totalEnergyKWh = powerInKW * totalHours;

  // Считаем общую стоимость
  const totalCost = totalEnergyKWh * costPerKWh;

  // Считаем стоимость при непрерывной работе
  const continuousCost = calculateContinuousCost(power, costPerKWh);

  // Формируем вывод результатов
  const resultsDiv = document.getElementById("results");

  // Очищаем предыдущие результаты, если они были
  resultsDiv.innerHTML = "";

  // Создаём блоки с текстом результатов
  const totalCostParagraph = document.createElement("p");
  totalCostParagraph.textContent = `Общая стоимость за указанный период: ${totalCost.toFixed(2)} руб.`;

  // Стоимость при непрерывной работе
  const costPerHourParagraph = document.createElement("p");
  costPerHourParagraph.textContent = `Стоимость при непрерывной работе (в час): ${continuousCost.hourly.toFixed(2)} руб`;

  const costPerDayParagraph = document.createElement("p");
  costPerDayParagraph.textContent = `Стоимость при непрерывной работе (в день): ${continuousCost.daily.toFixed(2)} руб`;

  const costPerWeekParagraph = document.createElement("p");
  costPerWeekParagraph.textContent = `Стоимость при непрерывной работе (в неделю): ${continuousCost.weekly.toFixed(2)} руб`;

  const costPerMonthParagraph = document.createElement("p");
  costPerMonthParagraph.textContent = `Стоимость при непрерывной работе (в месяц): ${continuousCost.monthly.toFixed(2)} руб`;

  const costPerYearParagraph = document.createElement("p");
  costPerYearParagraph.textContent = `Стоимость при непрерывной работе (в год): ${continuousCost.yearly.toFixed(2)} руб`;

  // Добавляем все абзацы в контейнер результатов
  resultsDiv.appendChild(totalCostParagraph);
  resultsDiv.appendChild(costPerHourParagraph);
  resultsDiv.appendChild(costPerDayParagraph);
  resultsDiv.appendChild(costPerWeekParagraph);
  resultsDiv.appendChild(costPerMonthParagraph);
  resultsDiv.appendChild(costPerYearParagraph);
}

// Назначаем обработчик события при отправке формы
document.getElementById("energy-form").addEventListener("submit", handleFormSubmit);
