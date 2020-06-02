// План действий:
// нужно задать дату к которой мы будем считать время
const finalDate = new Date("Jan 1, 2021 00:00:00").getTime();

// далее прописываем функцию, которая будет обновляться каждую секунду
const timerId = setInterval(function() {
	
	// внутри функции нам нужно задать текущую дату, и дистанцию от текущей даты к цели
	let currentDate = new Date();

	let distance = finalDate - currentDate;
	
	// просчитать дни
	let tDay = Math.floor((finalDate - currentDate) / 1000 / 60 / 60 / 24);
	
	// часы
	let tHour = 24 - (currentDate.getHours() + 1 );
	
	// минуты
	let tMinutes = 60 - (currentDate.getMinutes() + 1);

	// секунды ... 
	let tSeconds = 60 - (currentDate.getSeconds() + 1);

	// и вывести результат
	let timerToNewYear = tDay + " дней " + tHour + " часов " + tMinutes + " минут " + tSeconds + " секунд";

	// получим элемент
	const timer = document.querySelector('#timeToNewYear'); 

	// установим элементам с id: timeToNewYear свойство innerHTML со значением timerToNewYear:
	timer.innerHTML = timerToNewYear;
	
}, 1000);


// по окончанию счетчика, мы должны остановить отсчет, с помощью clearInterval();
// остановить вывод через N-секунд
setTimeout(() => { clearInterval(timerId); alert('Happy New Year!'); }, finalDate - new Date());
