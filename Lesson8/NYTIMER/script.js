// План действий:
// нужно задать дату к которой мы будем считать время. задаем с помощью  new Date("Jan 1, 2021 00:00:00").getTime();
var finalDate = new Date("Jan 1, 2021 00:00:00").getTime();

// далее прописываем функцию, которая будет обновляться каждую секунду
var timerId = setInterval(function() {
	// внутри функции нам нужно задать текущую дату, и дистанцию от текущей даты к цели
	currentDate = new Date();
	
	// просчитать дни, часы, минуты, секунды ... 
	tDay = finalDate.getDate() - currentDate.getDate();
	tHour = finalDate.getHours() - currentDate.getHours();
	tMinutes = finalDate.getMinutes() - currentDate.getMinutes();
	tSeconds = finalDate.getSeconds() - currentDate.getSeconds();

	// и вывести результат
	timerToNewYear = tDay + " дней " + tHour + " часов " + tMinutes + " минут " + tSeconds + " секунд";

	// находим наш идентификатор в документе и присваиваем значение
	document.querySelector("#timeToNewYear") = timerToNewYear;
}, 1000);

// по окончанию счетчика, мы должны остановить отсчет, с помощью clearInterval();
// остановить вывод через N-секунд
setTimeout(() => { clearInterval(timerId); alert('Happy New Year!'); }, finalDate - new Date());
