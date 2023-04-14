function addZero (number) {
    return number < 10 ? `0${number}` : number;
}
function timer (deadline) {
    let days = document.querySelector('#days');
    let hours = document.querySelector('#hours');
    let minutes = document.querySelector('#minutes');
    let seconds = document.querySelector('#seconds');

    function formatDuration(duration) {
        let seconds = Math.floor(duration / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds = seconds % 60;
        minutes = minutes % 60;
        hours = hours % 24;

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    let intervalID = window.setInterval(remainingTime, 1000);
    function remainingTime() {
        const now = new Date();
        const finish = new Date(deadline);
        const remaining = formatDuration(finish - now);
        days.textContent = addZero(remaining.days);
        hours.textContent = addZero(remaining.hours);
        minutes.textContent = addZero(remaining.minutes);
        seconds.textContent = addZero(remaining.seconds);

        if (finish - now <= 0) {
            days.textContent = '00';
            hours.textContent = '00';
            seconds.textContent = '00';
            minutes.textContent = '00';
            clearInterval(intervalID);
        }
    }
    remainingTime();
}
export {addZero};
export default timer;