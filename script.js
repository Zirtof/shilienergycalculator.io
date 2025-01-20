// Константы для перевода времени в часы
const HOURS_IN_DAY = 24;
const HOURS_IN_WEEK = 24 * 7;        // 168
const HOURS_IN_MONTH = 24 * 30.44;   // 730.56 (30.44 дня)
const HOURS_IN_YEAR = 24 * 365.25;   // 8766 (365.25 дней)

// Получаем элементы формы и блока результатов
const form = document.getElementById('energyForm');
const totalCostOutput = document.getElementById('totalCostOutput');
const hourCostOutput = document.getElementById('hourCostOutput');
const dayCostOutput = document.getElementById('dayCostOutput');
const weekCostOutput = document.getElementById('weekCostOutput');
const monthCostOutput = document.getElementById('monthCostOutput');
const yearCostOutput = document.getElementById('yearCostOutput');
const resultsContainer = document.getElementById('results');

// Функция для расчёта общего времени в часах в зависимости от выбранной единицы
function getTotalHours(timeValue, timeUnit) {
  switch (timeUnit) {
    case 'hour':
      return timeValue; // уже в часах
    case 'day':
      return timeValue * HOURS_IN_DAY;
    case 'week':
      return timeValue * HOURS_IN_WEEK;
    case 'month':
      return timeValue * HOURS_IN_MONTH;
    case 'year':
      return timeValue * HOURS_IN_YEAR;
    default:
      return 0;
  }
}

// Функция для форматирования чисел (например, чтобы округлять до двух знаков)
function formatNumber(num) {
  return num.toFixed(2);
}

// Основной обработчик формы
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Считываем значения из полей ввода
  const powerInWatts = parseFloat(document.getElementById('powerInput').value);
  const timeValue = parseFloat(document.getElementById('timeValueInput').value);
  const timeUnit = document.getElementById('timeUnitSelect').value;
  const costPerKwh = parseFloat(document.getElementById('costPerKwhInput').value);

  // Проверка введённых данных на валидность
  if (isNaN(powerInWatts) || powerInWatts < 0) {
    alert('Пожалуйста, введите корректную (неотрицательную) мощность прибора в Вт.');
    return;
  }
  if (isNaN(timeValue) || timeValue < 0) {
    alert('Пожалуйста, введите корректное (неотрицательное) время работы.');
    return;
  }
  if (isNaN(costPerKwh) || costPerKwh < 0) {
    alert('Пожалуйста, введите корректную (неотрицательную) стоимость 1 кВт*ч.');
    return;
  }

  // Переводим время работы в часы
  const totalHours = getTotalHours(timeValue, timeUnit);

  // Переводим мощность в кВт (из Вт)
  const powerInKw = powerInWatts / 1000;

  // Стоимость за 1 час при непрерывной работе
  const costPerHour = powerInKw * costPerKwh;

  // Общая стоимость за выбранный период
  const totalCost = costPerHour * totalHours;

  // Стоимость за разные промежутки (если прибор работает непрерывно)
  const costForOneHour = costPerHour;
  const costForOneDay = costPerHour * HOURS_IN_DAY;
  const costForOneWeek = costPerHour * HOURS_IN_WEEK;
  const costForOneMonth = costPerHour * HOURS_IN_MONTH;
  const costForOneYear = costPerHour * HOURS_IN_YEAR;

  // Вывод результатов
  totalCostOutput.textContent = `Общая стоимость за заданный период: ${formatNumber(totalCost)} у.е.`;
  hourCostOutput.textContent = `Стоимость в час (при непрерывной работе): ${formatNumber(costForOneHour)} у.е.`;
  dayCostOutput.textContent = `Стоимость в день (24 ч): ${formatNumber(costForOneDay)} у.е.`;
  weekCostOutput.textContent = `Стоимость в неделю (7 дней): ${formatNumber(costForOneWeek)} у.е.`;
  monthCostOutput.textContent = `Стоимость в месяц (30.44 дня): ${formatNumber(costForOneMonth)} у.е.`;
  yearCostOutput.textContent = `Стоимость в год (365.25 дней): ${formatNumber(costForOneYear)} у.е.`;

  // Отображаем блок результатов
  resultsContainer.classList.remove('hidden');
});
