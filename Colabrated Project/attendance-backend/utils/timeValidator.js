const { CHECK_IN_START, CHECK_IN_END, CHECK_OUT_START, CHECK_OUT_END } = require('../config/constants');

function isWithinTimeWindow(type) {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  let start, end;
  if (type === 'CHECKIN') {
    start = CHECK_IN_START;
    end = CHECK_IN_END;
  } else if (type === 'CHECKOUT') {
    start = CHECK_OUT_START;
    end = CHECK_OUT_END;
  } else {
    return false;
  }

  const nowMinutes = hour * 60 + minute;
  const startMinutes = start.hour * 60 + start.minute;
  const endMinutes = end.hour * 60 + end.minute;

  return nowMinutes >= startMinutes && nowMinutes < endMinutes;
}

module.exports = { isWithinTimeWindow };
