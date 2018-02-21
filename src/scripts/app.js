/**

Из этих чисел надо создать 13 групп по 6 чисел максимально равные между собой!

Например 2.64 + 2.63 + 2.55 + 2.60 + 2.54 + 2.60 ищем среднее деля сумму на 6 ,получаем среднее 2.593 первая ячейка батареек из 6 штук
Берем еще 6 цифр уже из 74 штук например 2.60 + 2.60 + 2.58 + 2.64 + 2.53 + 2.59 делим на 6 , получаем 2.590 и так далее 13 раз
Тринадцать групп должны быть максимально равны друг другу, хотя бы до третьего знака, тогда я их сгруппирую и могу сваривать в ячейки и собирать батарею...

Пример item - [id батарейки, емкость]

*/

import __DATA__ from './data'

const newObj = {};
const newItems = [];
const sortFn = (a, b) => a[0] - b[0];
const result = [
  [], [], [],
  [], [], [],
  [], [], [],
  [], [], [],
  []
];

// среднее арифметическое значение емкости в каждой группе
let average = __DATA__.reduce((prevItem, currentItem) => {
  return prevItem + currentItem[1];
}, 0) / 13;

__DATA__.sort(sortFn);

__DATA__.forEach(item => {

  if (!newObj[item[1]]) {
    newObj[item[1]] = [];
  }

  newObj[item[1]].push(item[0]);

});

Object.keys(newObj).forEach((key) => {

  newItems.push([
    parseFloat(key),
    newObj[key],
    newObj[key].length
  ]);

});

newItems.sort((a, b) => b[2] - a[2]);

result.forEach(resItem => {

  if (!resItem[0]) {
    resItem[0] = 0;
  }

  if (!resItem[1]) {
    resItem[1] = [];
  }

  newItems.forEach(item => {

    if (resItem[0] < average && item[1].length !== 0 && resItem[1].length < 6) {
      resItem[0] += item[0];
      resItem[1].push({
        id: item[1].shift(),
        capacity: item[0]
      });
    }

  });

});

console.log('Average:', average);
console.log('array newItems:', newItems);
console.log('array Result:', result);

var app = new Vue({
  el: '#root',
  data: {
    result: result
  }
});
