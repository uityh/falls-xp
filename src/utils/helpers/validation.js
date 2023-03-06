
const checkString = (strVal, varName) => { 
	if(!strVal) throw new Error(`${varName} must be provided`);
	if(typeof strVal !== 'string') throw new Error(`${varName} must be a string`);
	strVal = strVal.trim();
	if(strVal.length === 0) throw new Error(`${varName} must not be an empty string`);
	return strVal;
}

const checkDateString = (dateStr, varName, minDate=new Date(), maxDate) => {
	if(!dateStr) throw new Error(`${varName} must be provided`);
	if(typeof dateStr !== 'string') throw new Error(`${varName} must be a string`);
	dateStr = dateStr.trim();
	if(dateStr.length === 0) throw new Error(`${varName} must not be an empty string`);
	const date = new Date(dateStr);
	if(date.toString() === 'Invalid Date') throw new Error(`${varName} must be a valid date`);
	
	// minDate.setHours(24, 59, 59);
	minDate.setDate(minDate.getDate() + 1);
	minDate.setHours(0, 0, 0);

	if(minDate && date < minDate) throw new Error(`${varName} must be after ${minDate}`);
	if(maxDate && date > maxDate) throw new Error(`${varName} must be before ${maxDate}`);

	return date;
}
	

export {
	checkString,
	checkDateString
}