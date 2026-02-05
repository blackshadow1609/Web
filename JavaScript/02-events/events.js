// JavaScript source code
function setImage() {
    let filename = document.getElementById("image-file");

    if (filename.files.length === 0) {
        return; // Ничего не выбрано
    }

    let reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("photo").src = e.target.result;
    }
    reader.readAsDataURL(filename.files[0]);
}

function setBackground() {
    let color_tool = document.getElementById('choose-color');
    let color = color_tool.value;
    document.getElementById('color-sample').style.backgroundColor = color;
    document.getElementById('color-sample').style.width = "200px";
    document.getElementById('color-sample').style.height = "200px";
}

function switchBackground() {
    let delay = document.getElementById("delay").value;

    document.body.style.transition = `color ${delay}s, background ${delay}s`;

    const imgElement = document.getElementById("switch-background");

    if (document.body.classList.contains('white')) {
        document.body.classList.remove('white');
        document.body.classList.add('dark');
        imgElement.src = 'image/sun.png';
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('white');
        imgElement.src = 'image/moon.png';
    }
}
document.addEventListener
    (
        "mousemove",
        function (event) {
            let x = event.clientX;
            let y = event.clientY;
            document.getElementById("mouse").innerHTML = `X = ${x}, Y = ${y}`;

        }
    );
/*----------------------------------------------------------------------------------------*/
function addLeadingZero(number) {

    return number < 10 ? "0" + `${number}` : `${number}`;
    /*return number < 10 ? "0" + number : number;*/
}
document.body.onload = function tick_timer() {
    let time = new Date();
    document.getElementById("full-time").innerHTML = time;

    document.getElementById("hours").innerHTML = addLeadingZero(time.getHours());
    document.getElementById("minutes").innerHTML = addLeadingZero(time.getMinutes());
    document.getElementById("seconds").innerHTML = addLeadingZero(time.getSeconds());

    document.getElementById("years").innerHTML = addLeadingZero(time.getFullYear());
    document.getElementById("months").innerHTML = addLeadingZero(time.getMonth() + 1);
    document.getElementById("days").innerHTML = addLeadingZero(time.getDate());


    document.getElementById("day-of-week").innerHTML = time.toLocaleDateString("ru", { weekday: 'long' });

    document.getElementById('current-date').style.visibility = document.getElementById('show-date').checked ? "visible" : "hidden";
    document.getElementById('day-of-week').style.visibility = document.getElementById('show-weekday').checked ? "visible" : "hidden";

    setTimeout(tick_timer, 100);
}
/*----------------------------------------------------------------------------------------*/
document.getElementById("btn-start").onclick = function startCountdownTimer() {
    let targetDate = document.getElementById("target-date");
    let targetTime = document.getElementById("target-time");
    let btnStart = document.getElementById("btn-start");
    if (btnStart.value === "Start") {
        btnStart.value = "Stop";
        targetDate.disabled = targetTime.disabled = true;
        tickCountdown();
    }
    else {
        btnStart.value = "Start";
        targetDate.disabled = targetTime.disabled = false;
        clearTimeout(tickCountdown);
    }
}
function tickCountdown() {

    let now = new Date();

    let targetDateControl = document.getElementById("target-date");
    let targetTimeControl = document.getElementById("target-time");

    let targetDateValue = targetDateControl.valueAsDate;
    let targetTimeValue = targetTimeControl.valueAsDate;

    //Выравниваем часовой пояс
    targetDateValue.setHours(targetDateValue.getHours() + targetDateValue.getTimezoneOffset() / 60);
    targetTimeValue.setHours(targetTimeValue.getHours() + targetTimeValue.getTimezoneOffset() / 60);

    document.getElementById("duration").innerHTML = typeof (targetTimeValue);
    targetTimeValue.setFullYear(targetDateValue.getFullYear());
    targetTimeValue.setMonth(targetDateValue.getMonth());
    targetTimeValue.setDate(targetDateValue.getDate());

    document.getElementById("target-date-value").innerHTML = targetDateValue;
    document.getElementById("target-time-value").innerHTML = targetTimeValue;
    document.getElementById("current-time-value").innerHTML = now;

    let duration = targetTimeValue - now;
    document.getElementById("duration").innerHTML = duration;

    let timestamp = Math.trunc(duration / 1000);
    document.getElementById("timestamp").innerHTML = timestamp;

    const SECONDS_PER_MINUTE = 60;
    const SECONDS_PER_HOUR = 3600;
    const SECONDS_PER_DAY = 86400;
    const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;
    const DAYS_PER_MONTH = 365.25 / 12;
    const SECONDS_PER_MONTH = SECONDS_PER_DAY * DAYS_PER_MONTH;
    const SECONDS_PER_YEAR = SECONDS_PER_DAY * 365 + SECONDS_PER_HOUR * 6;

    let time_of_day = timestamp % SECONDS_PER_DAY;
    let date = Math.floor(timestamp / SECONDS_PER_DAY);
    date = date * SECONDS_PER_DAY;

    /*---------------Даты------------------------*/
    let years = Math.floor(date / SECONDS_PER_YEAR);
    if (years > 0) {
        date = date % SECONDS_PER_YEAR;
        let years_unit = document.getElementById("years-unit");
        if (years_unit == null) {
            let display = document.getElementById("display");
            display.prepend(createTimeBlock("years", addLeadingZero(years)));
        }
        else years_unit.innerHTML = addLeadingZero(years);
    }
    else removeTimeBlock("years");

    let months = Math.floor(date / SECONDS_PER_MONTH);
    if (months > 0) {
        /*let display = document.getElementById("display");*/
        date = date % SECONDS_PER_MONTH;

        let months_unit = document.getElementById("months-unit");
        if (months_unit == null) {
            months_block = createTimeBlock("months", addLeadingZero(months));
            let hours_block = document.getElementById("hours-unit").parentElement;
            hours_block.before(months_block);
        }
        else months_unit.innerHTML = addLeadingZero(months);
    }
    else removeTimeBlock("months");

    let weeks = Math.floor(date / SECONDS_PER_WEEK);
    if (weeks > 0) {
        let weeks_unit = document.getElementById("weeks-unit");
        date = date % SECONDS_PER_WEEK;
        if (weeks_unit == null) {
            weeks_block = createTimeBlock("weeks", addLeadingZero(weeks));
            let hours_block = document.getElementById("hours-unit").parentElement;
            hours_block.before(weeks_block);
        }
        else weeks_unit.innerHTML = addLeadingZero(weeks);
    }
    else removeTimeBlock("weeks");

    let days = Math.floor(date / SECONDS_PER_DAY);
    if (days > 0) {
        let days_unit = document.getElementById("days-unit");
        /*date = date % SECONDS_PER_DAY;*/
        if (days_unit == null) {
            days_block = createTimeBlock("days", addLeadingZero(days));
            let hours_block = document.getElementById("hours-unit").parentElement;
            hours_block.before(days_block);
        }
        else days_unit.innerHTML = addLeadingZero(days);
    }
    else removeTimeBlock("days");

    /*---------------Часы------------------------*/
    let hours = Math.floor(time_of_day / SECONDS_PER_HOUR);
    if (hours > 0) time_of_day = (time_of_day % (SECONDS_PER_HOUR));

    let minutes = Math.floor(time_of_day / SECONDS_PER_MINUTE);
    if (minutes > 0) time_of_day = (time_of_day % SECONDS_PER_MINUTE);

    let seconds = Math.floor(time_of_day);

    document.getElementById("hours-unit").innerHTML = addLeadingZero(hours);
    document.getElementById("minutes-unit").innerHTML = addLeadingZero(minutes);
    document.getElementById("seconds-unit").innerHTML = addLeadingZero(seconds);

    if (timestamp > 0 && document.getElementById("btn-start").value === "Stop")
        setTimeout(tickCountdown, 100);
}
function createTimeBlock(name, value) {
    let time_block = document.createElement("div");
    time_block.className = "time-block";

    let unit = document.createElement("div");
    unit.id = `${name}-unit`;
    unit.className = "time-unit";
    document.getElementById("value-type").innerHTML = typeof (value);
    unit.innerHTML = addLeadingZero(value);

    let marker = document.createElement("div");
    marker.id = `${name}-marker`;
    marker.className = "time-marker";
    marker.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);

    time_block.prepend(unit);
    time_block.append(marker);

    return time_block;
}
function removeTimeBlock(name) {
    let unit = document.getElementById(`${name}-unit`);
    if (unit != null) {
        let block = unit.parentElement;
        let block_parent = block.parentElement;
        display.removeChild(block);
    }
    
}



