export const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const monthValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const years = [];
export const months = [];
export const year = [];
function allYears() {
  for (let i = 2001; i < 2200; i++) {
    years.push(i);
  }
}

allYears();

function loopYear() {
  for (let i = 0; i < years.length; i++) {
    year.push({ label: "" + years[i], value: "" + years[i] });
  }
}
loopYear();
function loopmonth() {
  for (let i = 0; i < month.length; i++) {
    months.push({ label: "" + month[i], value: "" + monthValue[i] });
  }
}

loopmonth();

let tempDate = new Date();
export let thisYear = tempDate.getFullYear();
export let realthisMonth = tempDate.getMonth();
export let threeMonthAgo = new Date();
if (threeMonthAgo.getMonth() + 1 <= 9 && threeMonthAgo.getDate() <= 9) {
  threeMonthAgo = threeMonthAgo.getFullYear() + "-" + 0 + (threeMonthAgo.getMonth() - 2) + "-" + 0 + threeMonthAgo.getDate();
} else if (threeMonthAgo.getMonth() + 1 <= 9) {
  threeMonthAgo = tempDate.getFullYear() + "-" + 0 + (threeMonthAgo.getMonth() - 2) + "-" + threeMonthAgo.getDate();
} else if (threeMonthAgo.getDate() <= 9) {
  threeMonthAgo = threeMonthAgo.getFullYear() + "-" + (threeMonthAgo.getMonth() - 2) + "-" + 0 + threeMonthAgo.getDate();
} else {
  threeMonthAgo = threeMonthAgo.getFullYear() + "-" + (threeMonthAgo.getMonth() - 2) + "-" + threeMonthAgo.getDate();
}

export let setDate;
if (tempDate.getMonth() + 1 <= 9 && tempDate.getDate() <= 9) {
  setDate = tempDate.getFullYear() + "-" + 0 + (tempDate.getMonth() + 1) + "-" + 0 + tempDate.getDate();
} else if (tempDate.getMonth() + 1 <= 9) {
  setDate = tempDate.getFullYear() + "-" + 0 + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
} else if (tempDate.getDate() <= 9) {
  setDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + 0 + tempDate.getDate();
} else {
  setDate = tempDate.getFullYear() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getDate();
}
