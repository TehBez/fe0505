// Задаём конечную дату
timeend = new Date();
timeend = new Date(timeend.getYear()>1900?(timeend.getYear()+1):(timeend.getYear()+1901),0,1);

// Функция таймера
function time() {
	today = new Date();
	today = Math.floor((timeend-today)/1000);
	tsec = today % 60; today = Math.floor(today/60); if(tsec<10)tsec = '0' + tsec;
	tmin = today % 60; today = Math.floor(today/60); if(tmin<10)tmin = '0' + tmin;
	thour = today % 24; today = Math.floor(today/24);
	timestr = today + " дней " + thour + " часов " + tmin + " минут " + tsec + " секунд";

	document.getElementById('t').innerHTML = timestr; // почитать ещё про getElementById, innerHTML

	window.setTimeout("time()", 1000); // почитать ещё про window.setTimeout
}

