var getTwoDigitString = function(n) {
  'ngInject';
  var str = n + '';
  if (str.length === 1)
    return '0' + str;
  return str;
}

export function toTime() {
  'ngInject';
  return (timeInSeconds) => {
    var hours = Math.floor(timeInSeconds / 3600);
    var minutes = Math.floor(timeInSeconds / 60);
    if (minutes === 60) {
      minutes -= 1;
    }
    var seconds = Math.floor(timeInSeconds % 60);

    if (minutes > 60) {
      minutes = minutes % 60;
      return `${getTwoDigitString(hours) }:${getTwoDigitString(minutes) }:${getTwoDigitString(seconds) }`;
    } else
      return `00:${getTwoDigitString(minutes) }:${getTwoDigitString(seconds) }`;
  }
}
