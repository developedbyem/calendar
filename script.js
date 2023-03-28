const currentDate = document.querySelector(".current-date");
const dayTag = document.querySelector(".days");
const weekTag = document.querySelector(".weeks");
const PrevNextIcon = document.querySelectorAll(".icons span");

// getting current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  currDate = date.getDate();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// create days of the week
days.forEach((day) => {
  weekTag.innerHTML += `<li>${day}</li>`;
});

const renderCalendar = () => {
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month

  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
  let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // getting last day of month

  let liTag = "";

  for (let i = firstDayOfMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateOfMonth; i++) {
    // adding active class to current day
    let isToday =
      i === currDate &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    // creating li of all days of current month
    liTag += `<li class=${isToday}>${i}</li>`;
  }
  for (let i = lastDayOfMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
  }

  currentDate.textContent = `${months[currMonth]} ${currYear}`;
  dayTag.innerHTML = liTag;
};

renderCalendar();

PrevNextIcon.forEach((icon) => {
  icon.addEventListener("click", function () {
    // next and previous month
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    // for last year and next year date
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }

    renderCalendar();
  });
});
