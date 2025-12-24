/*ЗАДАНИЕ 1 */
const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 }, // нет свойства name
];

function pickPropArray(arr, prop) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasOwnProperty(prop)) {
            result.push(arr[i][prop]);
        }
    }
    return result;
}

const result = pickPropArray(students, 'name');
console.log('Задание 1:', result); 

//ЗАДАНИЕ 2
function createCounter() {
    let count = 0; 

    return function() {
        count++; 
        console.log(count);
        return count;
    }
}

console.log('Задание 2:');
const counter1 = createCounter();
counter1();
counter1(); 

const counter2 = createCounter();
counter2(); 
counter2(); 

// ЗАДАНИЕ 3
function spinWords(string) {
    return string.split(' ').map(word => {
        if (word.length >= 5) {
            return word.split('').reverse().join('');
        }
        return word;
    }).join(' '); // Соединяем слова обратно в строку
}

console.log('Задание 3:');
const result1 = spinWords("Привет от Legacy");
console.log(result1); // тевирП от ycageL

const result2 = spinWords("This is a test");
console.log(result2); // This is a test

//ЗАДАНИЕ 4
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}

console.log('Задание 4:', twoSum([2, 7, 11, 15], 9)); 




//АДАНИЕ 5
function longestCommonSuffix(strs) {
    if (!strs.length) return "";
    
    let suffix = "";
    
    let word = strs[0];
    
    for (let i = 1; i <= word.length; i++) {
        // Берем последние i букв
        let chunk = word.slice(-i);
        let isCommon = strs.every(s => s.endsWith(chunk));
        
        if (isCommon) {
            suffix = chunk;
        } else {
            break; // Если нарушилось стоп
        }
    }
    
    return suffix.length >= 2 ? suffix : "";
}

console.log('Задание 5:');
console.log(longestCommonSuffix(["цветок", "поток", "хлопок"])); 
console.log(longestCommonSuffix(["собака", "гоночная машина", "машина"])); 