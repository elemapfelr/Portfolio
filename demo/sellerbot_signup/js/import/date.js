export function currDate() {
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);
	var day = ('0' + today.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	return dateString;
}

export function currTime() {
	var today = new Date();

	var hours = ('0' + today.getHours()).slice(-2);
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2);

	var timeString = hours + ':' + minutes + ':' + seconds;

	return timeString;
}

/**
 * Calculates a new date by adding or subtracting a specified number of days from the current date.
 *
 * @param {string} operator - The operator to use for the calculation, either '+' or '-'.
 * @param {number} days - The number of days to add or subtract from the current date.
 * @returns {string} - The calculated date as a string in the format 'YYYY-MM-DD'.
 */
export function calcDate(operator, days) {
	var modifiedDate = new Date();

	if (operator == '+') {
		modifiedDate.setDate(modifiedDate.getDate() + days);
	} else if (operator == '-') {
		modifiedDate.setDate(modifiedDate.getDate() - days);
	}

	var year = modifiedDate.getFullYear();
	var month = ('0' + (modifiedDate.getMonth() + 1)).slice(-2);
	var day = ('0' + modifiedDate.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	return dateString;
}

/**
 * Returns the date for a specific day of the current week.
 *
 * @param {number} dayNum - The index of the desired day in the week (0-6, with 0 representing Sunday).
 * @returns {string} - The date of the desired day in the format 'YYYY-MM-DD'.
 */
export function thisWeek(dayNum) {
	var today = new Date();
	var theYear = today.getFullYear();
	var theMonth = today.getMonth();
	var theDate = today.getDate();
	var theDayOfWeek = today.getDay();

	var thisWeek = [];

	for (var i = 0; i < 7; i++) {
		var resultDay = new Date(theYear, theMonth, theDate + (i - theDayOfWeek));
		var yyyy = resultDay.getFullYear();
		var mm = Number(resultDay.getMonth()) + 1;
		var dd = resultDay.getDate();

		mm = String(mm).length === 1 ? '0' + mm : mm;
		dd = String(dd).length === 1 ? '0' + dd : dd;

		thisWeek[i] = yyyy + '-' + mm + '-' + dd;
	}

	return thisWeek[dayNum];
}

export function thisMonthFirstDay() {
	var today = new Date();

	var year = today.getFullYear();
	var month = ('0' + (today.getMonth() + 1)).slice(-2);

	var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
	var day = ('0' + firstDay.getDate()).slice(-2);

	var dateString = year + '-' + month + '-' + day;

	return dateString;
}
