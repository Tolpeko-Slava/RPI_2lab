// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  dates = document.querySelector('.DateTime'),
  focus = document.querySelector('.focus'),
  btn = document.querySelector('.btn'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  Water=document.querySelector('.WaterWinter'),
  Speend=document.querySelector('.SpeendWinter');

var i=2;
var clock=1;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
	
  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Show DateTime
function showDateTime() {
	
	var options = { weekday: 'long', month: 'long', day: 'numeric' };
	
  let today = new Date(),
	Month = today.getMonth(),
    Day = today.getDate();
	
  // Output Time
  dates.innerHTML =today.toLocaleString('ru', options);
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date();
    hour = today.getHours();
	num = hour % 6;
	num=num+1;
	if (hour<6){
		// Morning
		str = "url('images/morning/0"+num+".jpg')";
		document.body.style.backgroundImage = str;
		greeting.textContent = 'Good Morning, ';
		document.body.style.color = 'white';
	}else if (hour < 12) {
		//	Day
		str = "url('images/day/0"+num+".jpg')";
		document.body.style.backgroundImage =str ;
		greeting.textContent = 'Good Day, ';
	} else if (hour < 18) {
		// Evening
		str = "url('images/evening/0"+num+".jpg')";
		document.body.style.backgroundImage =str ;
		greeting.textContent = 'Good Afternoon, ';
		document.body.style.color = 'white';
	} else {
		// Night
		str = "url('images/night/0"+num+".jpg')";
		document.body.style.backgroundImage =str ;
		greeting.textContent = 'Good Night, ';
		document.body.style.color = 'white';
	}
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
	if(localStorage.getItem('name')==""){
		name.textContent='[Enter Name]';
	}
	else{
		name.textContent = localStorage.getItem('name');
	}
  }
}

// Set Name
function setName(e) {	
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
	var str= name.textContent;  
	if((!name.textContent)||(!str.trim())){
      name.textContent = '[Enter Name]';
	}
    else {
		localStorage.setItem('name', e.target.innerText);
	}
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
	if(localStorage.getItem('focus')==""){
		focus.textContent='[Enter Focus]';
	}
	else{
		focus.textContent = localStorage.getItem('focus');
	}
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
	var str= focus.textContent;  
	if((!focus.textContent)||(!str.trim())){
      focus.textContent = '[Enter Focus]';
	}
    else {
		localStorage.setItem('focus', e.target.innerText);
	}
  }	
}

name.onfocus = function() {
  name.textContent = '';
};
focus.onfocus = function() {
  focus.textContent = '';
};

//Button update
function getImage() {
  let today = new Date();
    hour = today.getHours();
	num = hour % 6;
	num=num+i;
	hour=hour+i;
	i=i+1;
	//hour=hour+i;
	//clock=clock+1;
	if(num>6){
		num=num%6;
		if(num==0){
			num=6;
			hour=hour-1;
		}
	}	
	if(hour>24){
		hour=hour%24;
	}
	if (hour<6){
		// Morning
		str = "url('images/morning/0"+num+".jpg')";
	}else if (hour < 12) {
		//	Day
		str = "url('images/day/0"+num+".jpg')";
	} else if (hour < 18) {
		// Evening
		str = "url('images/evening/0"+num+".jpg')";
	} else {
		// Night
		str = "url('images/night/0"+num+".jpg')";
	}     
  document.body.style.backgroundImage =str;
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  Speend.textContent=`${data.wind.speed}м/с`;
  Water.textContent=`${data.main.humidity}г/м3`;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}



name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
btn.addEventListener('click', getImage);

// Run
showTime();
showDateTime();
setBgGreet();
getName();
getFocus();