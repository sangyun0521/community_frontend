// 현재 한국 시각 구하기 yyyy. mm. dd. day hh:mm:ss (DateString)
const getCurrentKSTDateString = () => {
  return dateObjectToKSTDateString(new Date());
};
// Date 객체 DateString으로 변환
const dateObjectToKSTDateString = (dateObject) => {
  return dateObject.toLocaleString("ko-KR", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "long",
    timeZone: "Asia/Seoul",
  });
};

const getDateFromDateString = (dateString) => {
  return dateString.substr(0, 17);
};

const getYearFromDateString = (dateString) => {
  return dateString.substr(0, 4);
};

const getMonthFromDateString = (dateString) => {
  return dateString.substr(6, 2);
};

const getDayFromDateString = (dateString) => {
  return dateString.substr(10, 2);
};

const getWeekDayFromDateString = (dateString) => {
  return dateString.substr(14, 1);
};

const getHourFromDateString = (dateString) => {
  return dateString.substr(18, 2);
};

const getMinuteFromDateString = (dateString) => {
  return dateString.substr(21, 2);
};

const getSecondFromDateString = (dateString) => {
  return dateString.substr(24, 2);
};

const getAPIDateStringFromDateString = (dateString) => {
  //yyyy. mm. dd. N요일 hh:mm:ss -> yyyy-MM-dd HH:mm:ss
  // 오늘 날짜와 동일하다면 시간 까지 보낸다
  // 오늘 날짜가 아닌 다른 날짜라면 00:00:00 으로 변경 해서 보낸다
  var newDateString = "";
  if (
    getDateFromDateString(getCurrentKSTDateString()) ===
    getDateFromDateString(dateString)
  ) {
    newDateString = dateString;
  } else {
    newDateString = dateString.substr(0, 18) + "00:00:00";
  }
  //UTC 기준으로 변경
  newDateString = getUTCDateStringFromKSTDateString(newDateString);

  return (
    getYearFromDateString(newDateString) +
    "-" +
    getMonthFromDateString(newDateString) +
    "-" +
    getDayFromDateString(newDateString) +
    " " +
    getHourFromDateString(newDateString) +
    ":" +
    getMinuteFromDateString(newDateString) +
    ":" +
    getSecondFromDateString(newDateString)
  );
};

const getUTCDateStringFromKSTDateString = (KSTDateString) => {
  // KST
  const UTCTime = new Date(
    getYearFromDateString(KSTDateString),
    getMonthFromDateString(KSTDateString) - 1,
    getDayFromDateString(KSTDateString),
    getHourFromDateString(KSTDateString),
    getMinuteFromDateString(KSTDateString),
    getSecondFromDateString(KSTDateString)
  );
  UTCTime.setHours(UTCTime.getHours() - 9);
  return dateObjectToKSTDateString(UTCTime);
};

const getDateContainerStringFromDateString = (dateString) => {
  return (
    getDayFromDateString(dateString) +
    "\n" +
    getWeekDayFromDateString(dateString)
  );
};
// 현재 날짜 부터 14일 간의 DateString 리스트 반환
const getDateList = () => {
  const DURATION = 14;
  var list = [];
  for (let i = 0; i < DURATION; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    list.push(dateObjectToKSTDateString(currentDate));
  }
  console.log(list);
  return list;
};

const dateToKSTString = (date) => {
  var inDate = new Date(date);
  inDate.setHours(inDate.getHours() + 9);
  const h = inDate.getHours();
  const m = inDate.getMinutes();
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
};

export {
  getCurrentKSTDateString,
  dateToKSTString,
  getDateList,
  getDateFromDateString,
  getAPIDateStringFromDateString,
  getDateContainerStringFromDateString,
};
