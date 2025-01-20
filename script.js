/**
 * Функция для форматирования числового результата
 * до двух знаков после запятой.
 * @param {number} value - число для форматирования
 * @id70533735 (@returns) {string} - отформатированное число
 */
function formatNumber(value) {
  return value.toFixed(2);
}

// Находим элементы на странице
const powerInput = document.getElementById('power');
const timeValueInput = document.getElementById('timeValue');
const timeUnitSelect = document.getElementById('timeUnit');
const costInput = document.getElementById('cost');
const daysInMonthInput = document.getElementById('daysInMonth');
const daysInYearInput = document.getElementById('daysInYear');
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result');

/**
 * Основная функция для расчёта энергопотребления и вывода результата.
 */
function calculateEnergyCost() {
  // Очищаем предыдущие результаты
  resultContainer.innerHTML = '';

  // Считываем значения из полей ввода и преобразуем к числу
  const power = parseFloat(powerInput.value);
  const timeValue = parseFloat(timeValueInput.value);
  const costPerKwh = parseFloat(costInput.value);
  const daysInMonth = parseFloat(daysInMonthInput.value);
  const daysInYear = parseFloat(daysInYearInput.value);
  const timeUnit = timeUnitSelect.value;

  // Проверка корректности введённых данных
  if (
    isNaN(power) || power < 0 ||
    isNaN(timeValue) || timeValue < 0 ||
    isNaN(costPerKwh) || costPerKwh < 0 ||
    isNaN(daysInMonth) || daysInMonth <= 0 ||
    isNaN(daysInYear) || daysInYear <= 0
  ) {
    resultContainer.innerHTML = '<p id="error-message">Пожалуйста, введите корректные числовые значения.</p>';
    return;
  }

  // Определяем, сколько часов соответствует выбранному интервалу
  let totalHours = 0;
  switch (timeUnit) {
    case 'hours':
      totalHours = timeValue;
      break;
    case 'days':
      totalHours = timeValue * 24;
      break;
    case 'weeks':
      totalHours = timeValue * 24 * 7;
      break;
    case 'months':
      totalHours = timeValue * 24 * daysInMonth;
      break;
    case 'years':
      totalHours = timeValue * 24 * daysInYear;
      break;
    default:
      totalHours = 0;
  }

  // Расчёт общего расхода энергии в кВт·ч за указанный период:
  // (мощность (Вт) / 1000) * кол-во часов = кВт·ч
  const totalKwh = (power / 1000) * totalHours;

  // Расчёт общей стоимости
  const totalCost = totalKwh * costPerKwh;

  // Теперь рассчитываем стоимость для 1 часа, 1 дня, 1 недели, месяца и года
  const costPerHour = (power / 1000) * 1 * costPerKwh;
  const costPerDay = (power / 1000) * 24 * costPerKwh;
  const costPerWeek = (power / 1000) * 24 * 7 * costPerKwh;
  const costPerMonth = (power / 1000) * 24 * daysInMonth * costPerKwh;
  const costPerYear = (power / 1000) * 24 * daysInYear * costPerKwh;

  // Формируем вывод на страницу
  const resultHtml = `
    <p><strong>Общая стоимость за указанный период:</strong> ${formatNumber(totalCost)} у.е.</p>
    <p><strong>Стоимость при непрерывной работе:</strong></p>
    <ul>
      <li>За 1 час: ${formatNumber(costPerHour)} у.е.</li>
      <li>За 1 день: ${formatNumber(costPerDay)} у.е.</li>
      <li>За 1 неделю: ${formatNumber(costPerWeek)} у.е.</li>
      <li>За 1 месяц (${daysInMonth} дн.): ${formatNumber(costPerMonth)} у.е.</li>
      <li>За 1 год (${daysInYear} дн.): ${formatNumber(costPerYear)} у.е.</li>
    </ul>
  `;

  resultContainer.innerHTML = resultHtml;
}

// Привязываем обработчик события к кнопке
calculateBtn.addEventListener('click', calculateEnergyCost);
