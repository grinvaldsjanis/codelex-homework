// 1 Write a function that takes two numbers (a and b) as argument
// Sum a and b Return the result


const sumNum = (a: number, b: number): number => a + b;

console.log('1. Sum of two numbers')
console.log(sumNum(2, 2)); // 3
console.log(sumNum(1, 10)); // 11
console.log(sumNum(99, 1)); // 100


// 2 Write a function that takes a value as argument
// Return the type of the value

const typeVal = (a:any): any => typeof a;

console.log('2. What Type')
console.log(typeVal(1)); // 3
console.log(typeVal(false)); // 11
console.log(typeVal({})); // 100
console.log(typeVal(null)); // 100
console.log(typeVal('string')); // 100
console.log(typeVal(['array'])); // 100

// 3 Write a function that takes two values, say a and b, as arguments
// Return true if the two values are equal and of the same type

const equalType = (a: any, b: any): boolean => typeof a === typeof b && a===b;

console.log('3. Equal Type and value')
console.log(equalType(2,3));
console.log(equalType(3,3));
console.log(equalType(1,'1'));
console.log(equalType('10','10'));

// 4 Write a function that takes a string (a) and a number (n) as arguments
// Return the nth character of 'a'


const charAtNum = (a: string, n: number): string => a.charAt(n-1);

console.log('4. Character at number')
console.log(charAtNum('abcd',1));
console.log(charAtNum('zyxbwpl',5));
console.log(charAtNum('gfedcba',3));

// 5 Write a function that takes a string (a) as argument
// Remove the first 3 characters of a. Return the result

const removeFirst3 = (a: string): string => a.slice(3);

console.log('5. Remove first 3')
console.log(removeFirst3('abcdefg'));
console.log(removeFirst3('1234'));
console.log(removeFirst3('fgedcba'));

// 6 Write a function that takes a string as argument
// Extract the last 3 characters from the string. Return the result

const extractLast3 = (a: string): string => a.slice(-3);

console.log('6. Extract last 3')
console.log(extractLast3('abcdefg'));
console.log(extractLast3('1234'));
console.log(extractLast3('fgedcba'));

// 7 Write a function that takes a string (a) as argument
// Get the first 3 characters of a. Return the result

const getFirst3 = (a: string): string => a.slice(0, 3);

console.log('7. Get first 3')
console.log(getFirst3('abcdefg'));
console.log(getFirst3('1234'));
console.log(getFirst3('fgedcba'));

// 8 Write a function that takes a string (a) as argument
// Extract the first half a. Return the result

const getFirstHalf = (a: string): string => a.slice(0, (a.length+1)/2);

console.log('8. Get first half')
console.log(getFirstHalf('abcdefg'));
console.log(getFirstHalf('1234'));
console.log(getFirstHalf('gedcba'));

// 9 Write a function that takes a string (a) as argument
// Remove the last 3 characters of a. Return the result

const removeLast3 = (a: string): string => a.slice(0, a.length-3);

console.log('9. Remove last 3')
console.log(removeLast3('abcdefg'));
console.log(removeLast3('1234'));
console.log(removeLast3('fgedcba'));


// 10 Write a function that takes two numbers (a and b) as argument
// Return b percent of a


const percentOfNum = (a: number, b: number): number => b*a/100;

console.log('10. Percent of a number')
console.log(percentOfNum(100,50));
console.log(percentOfNum(10,1));
console.log(percentOfNum(500,25));

// 11 Write a function that takes 6 values (a,b,c,d,e,f) as arguments
// Sum a and b
// Then subtract by c
// Then multiply by d and divide by e
// Finally raise to the power of f and return the result
// Tip: mind the order

const complexCalcFunc = function(a:number, b:number, c:number, d:number, e:number, f:number): number {
    return Math.pow(((a+b-c)*d/e),f);
}
console.log('11. Complex calculation')
console.log(complexCalcFunc(6,5,4,3,2,1));
console.log(complexCalcFunc(6,2,1,4,2,3));
console.log(complexCalcFunc(2,3,6,4,2,3));

// 12 Write a function that takes a number as argument
// If the number is even, return true. Otherwise, return false

const isEven = (a: number): boolean => a % 2 === 0;

console.log('12. Is Even number')
console.log(isEven(10));
console.log(isEven(-4));
console.log(isEven(5));
console.log(isEven(-111));

// 13 Write a function that takes two strings (a and b) as arguments
// Return the number of times a occurs in b

const charOccur = function (a: string, str: string): number {
    const letterArr = str.replace(" ", "").split("");
    var counter = 0;
    for (var index in letterArr) {
        if (letterArr[index] === a) {
            counter++;
        }
    }
    return counter;
}

console.log('13. Character Occurrence');
console.log(charOccur('m', 'how many times does the character occur in this sentence?'));
console.log(charOccur('h', 'how many times does the character occur in this sentence?'));
console.log(charOccur('?', 'how many times does the character occur in this sentence?'));
console.log(charOccur('z', 'how many times does the character occur in this sentence?'));

// 14 Write a function that takes a number (a) as argument
// If a is a whole number (has no decimal place), return true
// Otherwise, return false

const isWholeNum = (a: number): boolean => Math.round(a) === a;

console.log('14. Whole number');
console.log(isWholeNum(4));
console.log(isWholeNum(1.123));
console.log(isWholeNum(1048));
console.log(isWholeNum(10.48));

// 15 Write a function that takes two numbers (a and b) as arguments
// If a is smaller than b, divide a by b
// Otherwise, multiply both numbers. Return the resulting value

const divideMultip = function (a: number, b: number): number {
    if (a < b) {
        return a / b;
    } else {
        return a*b;
    }
}

console.log('15. Divide or Multiply');
console.log(divideMultip(10, 100));
console.log(divideMultip(90, 45));
console.log(divideMultip(8, 20));
console.log(divideMultip(2, 0.5));

// 16 Write a function that takes two strings (a and b) as arguments
// If a contains b, append b to the beginning of a
// If not, append it to the end. Return the concatenation

const concateContaining = function (a: string, b: string): string {
    if (a.includes(b)) {
        return b+a;
    } else {
        return a+b;
    }
}

console.log('16. Concate Containing ');
console.log(concateContaining('cheese', 'cake'));
console.log(concateContaining('lips', 's'));
console.log(concateContaining('Java', 'script'));
console.log(concateContaining(' think, therefore I am', 'I'));

// 17 Write a function that takes a number (a) as argument
// Round a to the 2nd digit after the comma
// Return the rounded number

const roundFixed2 = (a: number): number => +a.toFixed(2);

console.log('17. Round number to 2 decimals ');
console.log(roundFixed2(2.12397));
console.log(roundFixed2(3.136));
console.log(roundFixed2(1.12397));
console.log(roundFixed2(26.1379));

// 18 Write a function that takes a number (a) as argument
// Split a into its individual digits and return them in an array
// Tip: you might want to change the type of the number for the splitting

const num2digits = (a: number): number[] => a.toString().replace(".", "").split("").map(str => parseInt(str, 10));

console.log('18. Number to array of digits');
console.log(num2digits(10));
console.log(num2digits(931));
console.log(num2digits(193278));

// 19 It seems like something happened to these strings
// Can you figure out how to clear up the chaos?
// Write a function that joins these strings together such that they form the following words:
// 'Javascript', 'Countryside', and 'Downtown'
// You might want to apply basic JS string methods such as replace(), split(), slice() etc.

const clearChaos = function(a: string, b: string): string {
    let fixedA = a.replace("%","");
    let aToUppercase = fixedA.charAt(0).toUpperCase() + fixedA.slice(1);
    let fixedB = b.replace("%","").split("").reverse().join('');
    return aToUppercase+""+fixedB;
}

console.log('19. Clear up the chaos');
console.log(clearChaos('java', 'tpi%rcs'));
console.log(clearChaos('c%ountry', 'edis'));
console.log(clearChaos('down', 'nw%ot'));

// 20 This challenge is a little bit more complex
// Write a function that takes a number (a) as argument
// If a is prime, return a
// If not, return the next higher prime number

const closestPrime = function (a: number): number {

    const isPrime = function (num: number): boolean {
        let prime = true;
        for (let i = 2; i < num; i++) {
            if (num % i == 0) {
                prime = false;
            }
        }
        return prime;
    }
    const nextPrime = function (num: number): number {
        do {
            num++;
        } while (!isPrime(num));
        return num;
    }

    if (isPrime(a)) {
        return a;
    } else {
        return nextPrime(a);
    }
}

console.log('20. The closest prime number');
console.log(closestPrime(38));
console.log(closestPrime(7));
console.log(closestPrime(115));
console.log(closestPrime(2000));

// 21 Write a function that takes two numbers, say x and y, as arguments
// Check if x is divisible by y
// If yes, return x
// If not, return the next higher natural number that is divisible by y

const divisibleNum = function (x: number, y: number): number {

    const isDivisible = function (num1: number, num2: number): boolean {
        let divisible = true;
        if (num1 % num2 != 0) {
            divisible = false;
        }
        return divisible;
    }

    const nextDivisible = function (num1: number, num2: number): number {
        return Math.ceil(num1/num2)*num2;
    }

    if (isDivisible(x, y)) {
        return x;
    } else {
        return nextDivisible(x,y);
    }
}

console.log('21. The closest divisible number');
console.log(divisibleNum(1,23));
console.log(divisibleNum(23, 23));
console.log(divisibleNum(7, 3));
console.log(divisibleNum(-5, 7));

// 22 Write a function that takes two strings (a and b) as arguments
// Beginning at the end of 'a', insert 'b' after every 3rd character of 'a'
// Return the resulting string

const insertEvery3 = function (a: string, b: string): string {
    const strArr = a.split("").reverse();
    const newArr = [];

    for (let i=0; i<strArr.length; i++) {
        newArr.push(strArr[i]);
        if ((i+1) % 3 === 0) {
            newArr.push(b);
        }
    }
    return newArr.reverse().join("")
}

console.log('22. Insert b every 3rd from end');
console.log(insertEvery3('1234567', '.'));
console.log(insertEvery3('abcde', '$'));
console.log(insertEvery3('zxyzxyzxyzxyzxyz', 'w'));

// 23 Write a function that takes a string as argument
// As it is, the string has no meaning
// Increment each letter to the next letter in the alphabet. Return the correct word

const decoding = function (a: string): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const charArr = a.split("");
    let decodedChars: string[] = [];
    for (let i=0;i<charArr.length;i++) {
        decodedChars.push(alphabet.charAt(alphabet.indexOf(charArr[i])+1)); 
    }
    return decodedChars.join("");
}

console.log('23. Decoding the word, shifting alphabet');
console.log(decoding('bnchmf'));
console.log(decoding('bgddrd'));
console.log(decoding('sdrshmf'));

// 24 Write a function that takes an array (a) and a value (n) as argument
// Return the nth element of 'a'

const pickNum = function (a: number[], n:number): number {
    return a[n-1];
}

console.log('24. Pick number from array');
console.log(pickNum([1,2,3,4,5],3));
console.log(pickNum([10,9,8,7,6],5));
console.log(pickNum([7,2,1,6,3],1));

// 25 Write a function that takes an array (a) as argument
// Remove the first 3 elements of 'a'
// Return the result

const remove4 = function (a: number[]): number[] {
    return a.slice(3);
}

console.log('25. Remove first 4 elements');
console.log(remove4 ([1,2,3,4]));
console.log(remove4 ([5,4,3,2,1,0]));
console.log(remove4 ([99,1,1]));

// 26 Write a function that takes an array (a) as argument
// Extract the last 3 elements of a
// Return the resulting array

const extractLast = function (a: number[]): number[] {
    return a.slice(-3);
}

console.log('26. Extract last 3 elements');
console.log(extractLast ([1,2,3,4]));
console.log(extractLast ([5,4,3,2,1,0]));
console.log(extractLast ([99,1,1]));

// 27 Write a function that takes an array (a) as argument
// Extract the first 3 elements of a
// Return the resulting array

const extractFirst3 = function (a: number[]): number[] {
    return a.slice(0,3);
}

console.log('27. Extract first 3 elements');
console.log(extractFirst3 ([1,2,3,4]));
console.log(extractFirst3 ([5,4,3,2,1,0]));
console.log(extractFirst3 ([99,1,1]));

// 28 Write a function that takes an array (a) and a number (n) as arguments
// It should return the last n elements of a

const extractLastN = function (a: number[], n: number): number[] {
    return a.slice(-n);
}

console.log('28. Extract last n elements');
console.log(extractLastN ([1, 2, 3, 4, 5], 2));
console.log(extractLastN ([1, 2, 3], 6));
console.log(extractLastN ([1, 2, 3, 4, 5, 6, 7, 8], 3));

// 29 Write a function that takes an array (a) and a value (b) as argument
// The function should clean a from all occurrences of b
// Return the filtered array

const cleanFromElement = function (a: any[], n: any): any[] {
    return a.filter(elem => elem != n);
}

console.log('29. Extract last n elements');
console.log(cleanFromElement ([1,2,3], 2));
console.log(cleanFromElement ([1,2,'2'], '2'));
console.log(cleanFromElement ([false,'2',1], false));
console.log(cleanFromElement ([1,2,'2',1], 1));

// 30 Write a function that takes an array (a) and a value (b) as argument
// The function should clean a from all occurrences of b
// Return the filtered array

const filterElem = function (a: any[], n: any): any[] {
    return a.filter(elem => (elem !== n ));
}

console.log('30. Filter off n from array');
console.log(filterElem ([1,2,3], 2));
console.log(filterElem ([1,2,'2'], '2'));
console.log(filterElem ([false,'2',1], false));
console.log(filterElem ([1,2,'2',1], 1));

// 31Write a function that takes an array (a) as argument
// Return the number of elements in a

const arrLength = function (a: any[]): number {
    return a.length;
}

console.log('31. Lenght of an array');
console.log(arrLength ([1,2,2,4]));
console.log(arrLength ([9,9,9]));
console.log(arrLength ([4,3,2,1,0]));

// 32 Write a function that takes an array of numbers as argument
// Return the number of negative values in the array

const negativeCount = function (a: number[]): number {
    return a.filter(elem => elem < 0).length;
}

console.log('32. Return number of negative values');
console.log(negativeCount ([1,-2,2,-4]));
console.log(negativeCount ([0,9,1]));
console.log(negativeCount ([4,-3,2,1,0]));

// 33 Write a function that takes an array of numbers as argument
// It should return an array with the numbers sorted in descending order

const sortDesc = function (a: number[]): number[] {
    return a.sort((a, b) => b - a);
}

console.log('33. Sort array of numbers in desc order');
console.log(sortDesc([1,3,2]));
console.log(sortDesc([4,2,3,1]));

// 34 Write a function that takes an array of strings as argument
// Sort the array elements alphabetically
// Return the result

const sortAbcOrder = function (a: string[]): string[] {
    return a.sort();
}

console.log('34. Sort array of letters in abc order');
console.log(sortAbcOrder(['b', 'c', 'd', 'a']));
console.log(sortAbcOrder(['z', 'c', 'd', 'a', 'y', 'a', 'w']));

// 35 Write a function that takes an array of numbers as argument
// It should return the average of the numbers

const averageNum = function (a: number[]): number {
    return a.reduce((a, b) => a + b, 0)/a.length;
}

console.log('35. Return average number');
console.log(averageNum([10,100,40]));
console.log(averageNum([10,100,1000]));
console.log(averageNum([-50,0,50,200]));

// 36 Write a function that takes an array of strings as argument
// Return the longest string

const longestStr = function (a: string[]): string {
    return a.sort((a, b) => b.length - a.length)[0];
}

console.log('36. Return longest string in array');
console.log(longestStr(['help', 'me']));
console.log(longestStr(['I', 'need', 'candy']));

// 37 Write a function that takes an array as argument
// It should return true if all elements in the array are equal
// It should return false otherwise

const allEqual = function (a: any[]): boolean {
    return [...new Set(a)].length < 2;
}

console.log('37. Are all elements same');
console.log(allEqual([true, true, true, true]));
console.log(allEqual(['test', 'test', 'test']));
console.log(allEqual([1,1,1,2]));
console.log(allEqual(['10',10,10,10]));

// 38 Write a function that takes arguments an arbitrary number of arrays
// It should return an array containing the values of all arrays

const combineArrays = function (...args: any[]) {
    return [...args].concat.apply([],[...args]);
}

console.log('38. Combine 2 arrays into 1 array');
console.log(combineArrays([1, 2, 3], [4, 5, 6]));
console.log(combineArrays(['a', 'b', 'c'], [4, 5, 6]));
console.log(combineArrays([true, true], [1, 2], ['a', 'b']));


// 39 Write a function that takes an array of objects as argument
// Sort the array by property b in ascending order
// Return the sorted array

const sortObjects = function (objArr: {[key:string]:number}[]) {
    return objArr.sort((obj1, obj2) => obj1.b - obj2.b);
}

console.log('39. Sort objects in array by prop value');
console.log(sortObjects([{a:1,b:2},{a:5,b:4}]));
console.log(sortObjects([{a:2,b:10},{a:5,b:4}]));
console.log(sortObjects([{a:1,b:7},{a:2,b:1}]));

// 40 Write a function that takes two arrays as arguments
// Merge both arrays and remove duplicate values
// Sort the merge result in ascending order
// Return the resulting array

const cleanSort = function (arr1: number[], arr2: number[]): number[] {
    const arrMerged:number[] = arr1.concat(arr2);
    return [...new Set(arrMerged)].sort();
}

console.log('40. Merge, clean and sort arrays');
console.log(cleanSort([1, 2, 3], [3, 4, 5]));
console.log(cleanSort([-10, 22, 333, 42], [-11, 5, 22, 41, 42]));


// 41 Write a function that takes an array (a) and a number (b) as arguments
// Sum up all array elements with a value greater than b
// Return the sum

const sumLargerThanN = function (arr: number[], num: number): number {
    return arr.filter(e => e > num).reduce((a, b) => a + b);
}

console.log('41. Sum of all elements larger than n');
console.log(sumLargerThanN([1, 2, 3, 4, 5, 6, 7], 2));
console.log(sumLargerThanN([-10, -11, -3, 1, -4], -3));
console.log(sumLargerThanN([78, 99, 100, 101, 401], 99));

// 42 Write a function that takes two numbers (min and max) as arguments
// Return an array of numbers in the range min to max

const seqArr = function (minN: number, maxN: number): number[] {
    const arr = [];
    for (let i=minN; i<=maxN; i++) {
        arr.push(i);
    }
    return arr;
}

console.log('42. Create a sequence of numbers from min to max');
console.log(seqArr(2, 10));
console.log(seqArr(1, 3));
console.log(seqArr(-5, 5));
console.log(seqArr(2, 7));

// 43 Write a function that takes an array of strings as argument
// Group those strings by their first letter
// Return an object that contains properties with keys representing first letters
// The values should be arrays of strings containing only the corresponding strings
// For example, the array ['Alf', 'Alice', 'Ben'] should be transformed to
// { a: ['Alf', 'Alice'], b: ['Ben']}

const objectsSorted = function (array: string[]) {
    let resultObj:{[key:string]:string[]} = {};
  
  for (let i =0; i < array.length; i++) {
    let currentWord = array[i];
    let firstChar = currentWord[0].toLowerCase();
    let innerArr = [];
    if (resultObj[firstChar] === undefined) {
       innerArr.push(currentWord);
      resultObj[firstChar] = innerArr
    }else {
      resultObj[firstChar].push(currentWord)
    }
  }
  return resultObj
}

console.log('43. Make array of objects with names by first letter');
console.log(objectsSorted(['Alf', 'Alice', 'Ben']));
console.log(objectsSorted(['Ant', 'Bear', 'Bird']));
console.log(objectsSorted(['Berlin', 'Paris', 'Prague']));

// 44 Write a function that takes an array with arbitrary elements and a number as arguments
// Return a new array, the first element should be either the given number itself
// or zero if the number is smaller than 6
// The other elements should be the elements of the original array
// Try not to mutate the original array

const processArray = function (arr: any[], num: number): any[] {
    let newArr = [];
    if (num < 6){
     newArr.push(0);
    } else {
     newArr.push(num);
    }
     return newArr.concat(arr);
 }
 
 console.log('44 make array with new first element');
 console.log(processArray([1,2,3], 6));
 console.log(processArray(['a','b'], 2));
 console.log(processArray([null,false], 11));

//  45 Write a function that takes an array (a) and a value (n) as arguments
//  Save every nth element in a new array
//  Return the new array

const everyN = function (arr: any[], num: number): any[] {
    let newArr: any[] = [];
    for (let i=num-1; i<arr.length; i+=num){
     newArr.push(arr[i]);
    }
     return newArr
 }
 
 console.log('45 extract every n element');
 console.log(everyN([1,2,3,4,5,6,7,8,9,10],3));
 console.log(everyN([10,9,8,7,6,5,4,3,2,1],5));
 console.log(everyN([7,2,1,6,3,4,5,8,9,10],2));

// 46 Write a function that takes an object with two properties as argument
// It should return the value of the property with key country

const extractCountry = function (countryObj: {[key:string]: string}) {
    return countryObj["country"];
 }
 
 console.log('46 extract country from object');
 console.log(extractCountry({  continent: 'Asia',  country: 'Japan'}));
 console.log(extractCountry({  country: 'Sweden',  continent: 'Europe'}));

//  47 Write a function that takes an object with two properties as argument
// It should return the value of the property with key 'prop-2'
// Tip: you might want to use the square brackets property accessor

const extractProp2 = function (someObj: {[key:string]: any}): string {
    return someObj["prop-2"];
 }
 
 console.log('47 Extract prop-2 elem');
 console.log(extractProp2({  one: 1,  'prop-2': 2}));
 console.log(extractProp2({  'prop-2': 'two',  prop: 'test'}));

// 48 Write a function that takes an object with two properties and a string as arguments
// It should return the value of the property with key equal to the value of the string

const extractSomeValue = function (someObj: {[key:string]:string}, someStr: string): string {
    return someObj[someStr];
 }
 
 console.log('48 Extract value by defined key');
 console.log(extractSomeValue({  continent: 'Asia',  country: 'Japan'}, 'continent'));
 console.log(extractSomeValue({  country: 'Sweden',  continent: 'Europe'}, 'country'));

// 49 Write a function that takes an object (a) and a string (b) as argument
// Return true if a has a property with key b
// Return false otherwise

const doesHaveProp = function (someObj: object, someStr: string): boolean {
    return someObj.hasOwnProperty(someStr);
}

console.log('49 Iz there a property with a defined name');
console.log(doesHaveProp({ a: 1, b: 2, c: 3 }, 'b'));
console.log(doesHaveProp({ x: 'a', y: 'b', z: 'c' }, 'a'));
console.log(doesHaveProp({ x: 'a', y: 'b', z: 'c' }, 'z'));

// 50 Write a function that a string (a) as argument
// Create an object that has a property with key 'key' and a value of a
// Return the object

const makeObj = function (str: string): object {
    return {key: str}
}

console.log('50 make object with key property');
console.log(makeObj('a'));
console.log(makeObj('z'));
console.log(makeObj('b'));

// 51 Write a function that takes two strings (a and b) as arguments
// Create an object that has a property with key 'a' and a value of 'b'
// Return the object

const makeObj1 = function (str1: string, str2: string): object {
    return { [str1]: str2 }
}

console.log('51 make object with key property and values');
console.log(makeObj1('a', 'b'));
console.log(makeObj1('z', 'x'));
console.log(makeObj1('b', 'w'));

// 52 Write a function that takes two arrays (a and b) as arguments
// Create an object that has properties with keys 'a' and corresponding values 'b'
// Return the object

const objFrom2Arr = function (arr1: any[], arr2: any[]): object {
    let resultObj:{[key:string]:number} = {}
    for (let i=0; i<arr1.length; i++) {
        resultObj[arr1[i]] = arr2[i];
    }
    return resultObj;
}

console.log('52 make object with respective keys and values from arrays');
console.log(objFrom2Arr(['a','b','c'],[1,2,3]));
console.log(objFrom2Arr(['w','x','y','z'],[10,9,5,2]));
console.log(objFrom2Arr([1,'b'],['a',2]));

// 53 Write a function that takes an object (a) as argument
// Return an array with all object keys

const arraFromObj = function (someObj: object): any[] {
    return Object.keys(someObj);
}

console.log('53 make an array from object keys');
console.log(arraFromObj({a:1,b:2,c:3}));
console.log(arraFromObj({j:9,i:2,x:3,z:4}));
console.log(arraFromObj({w:15,x:22,y:13}));

// 54 Write a function that takes an object (a) as argument
// Return the sum of all object values

const sumObjVal = function (someObj: object): number {
    return Object.values(someObj).reduce((a, b) => a + b, 0);
}

console.log('54 Return the sum of all object values');
console.log(sumObjVal({a:1,b:2,c:3}));
console.log(sumObjVal({j:9,i:2,x:3,z:4}));
console.log(sumObjVal({w:15,x:22,y:13}));

// 55 Write a function that takes an object as argument
// It should return an object with all original object properties
// except for the property with key 'b'

const removeBvalue = function (someObj: {[key:string]:number}) {
    return (({ b, ...o }) => o)(someObj);
 }
 
 console.log('55 Return object without b value');
 console.log(removeBvalue({ a: 1, b: 7, c: 3 }));
 console.log(removeBvalue({ b: 0, a: 7, d: 8 }));
 console.log(removeBvalue({ e: 6, f: 4, b: 5, a: 3 }));

//  56. Write a function that takes two objects as arguments
//  Unfortunately, the property 'b' in the second object has the wrong key
//  should be named 'd' instead
//  Merge both objects and correct the wrong property name
//  Return the resulting object
//  It should have the properties 'a', 'b', 'c', 'd', and 'e'

type Numbers1 = {
    [key: string]: number
 }
 
 type Numbers2 = {
    [key: string]: number
 }
 
 const merge2obj = function (obj1: Numbers1, obj2: Numbers2) {
 
    obj2['d'] = obj2['b'];
    delete obj2['b'];
    return { ...obj1, ...obj2 };
 }
 
 console.log('56 Merge both objects and correct the wrong property name');
 console.log(merge2obj({ a: 1, b: 2 }, { c: 3, b: 4, e: 5 }));
 console.log(merge2obj({ a: 5, b: 4 }, { c: 3, b: 1, e: 2 }));

//  60 Write a function that takes an object as argument containing properties with personal information
//  Extract firstName, lastName, size, and weight if available
//  If size or weight is given transform the value to a string
//  Attach the unit cm to the size
//  Attach the unit kg to the weight
//  Return a new object with all available properties that we are interested in
 
const addUnitsToObj = function (personObj: { [key: string]: string | number }) {
    for (var key in personObj) {
       if (key === "weight") {
          personObj[key] += "kg"
       }
       if (key === "size") {
          personObj[key] += "cm"
       }
    }
    return personObj;
 }
 
 console.log('60. takes an object as argument containing properties with personal information Extract firstName, lastName, size, and weight if available If size or weight is given transform the value to a string Attach the unit cm to the size Attach the unit kg to the weight Return a new object with all available properties that we are interested in y');
 console.log(addUnitsToObj({ fn: 'Lisa', ln: 'Müller', age: 17, size: 175, weight: 67 }));
 console.log(addUnitsToObj({ fn: 'Martin', ln: 'Harper', age: 26, email: 'martin.harper@test.de', weight: 102 }));
 console.log(addUnitsToObj({ fn: 'Andrew', ln: 'Harper', age: 81, size: 175, weight: 71 }));
 console.log(addUnitsToObj({ fn: 'Matthew', ln: 'Müller', age: 19, email: 'matthew@mueller.de' })); 

 //  61 Write a function that takes an array of objects and a string as arguments
//  Add a property with key 'continent' and value equal to the string to each of the objects
//  Return the new array of objects
//  Tip: try not to mutate the original array
 
const addContinent = function (objArr: {[key:string]: string}[], continent: string) {
    const newArr = objArr.map(object => {
       object["continent"] = continent;
       return object;
    })
    return newArr;
 }
 
 console.log('61. Add a property with key continent and value equal to the string to each of the objects Return the new array of objects Tip: try not to mutate the original array');
 console.log(addContinent([{ city: 'Tokyo', country: 'Japan' }, { city: 'Bangkok', country: 'Thailand' }], 'Asia'));
 console.log(addContinent([{ city: 'Stockholm', country: 'Sweden' }, { city: 'Paris', country: 'France' }], 'Europe'));
 

 // 62. Write a function that takes an array of numbers as argument
//  Convert the array to an object
//  It should have a key for each unique value of the array
//  The corresponding object value should be the number of times the key occurs within the array
 
const createObject = function (arr: number[]) {
    const obj:{[key: number]: number} = {};
 
 arr.forEach((elem) => {
   if (obj[elem]) {
    obj[elem]++;
   }else{
    obj[elem] = 1;
   };
 })
  return obj;
 }
 
 console.log('62 Convert the array to an object It should have a key for each unique value of the array The correspo ding object value should be the number of times the key occurs within the array');
 console.log(createObject([1,2,2,3]));
 console.log(createObject([9,9,9,99]));
 console.log(createObject([4,3,2,1]));

//  63. Write a function that takes two date instances as arguments
//  It should return true if the dates are equal
//  It should return false otherwise
 

const areEqualTimes = function (date1: Date, date2: Date) {
    return date1.getTime() === date2.getTime();
}

console.log('63 takes two date instances as arguments It should return true if the dates are equal It should return false otherwise');
console.log(areEqualTimes(new Date('2000/01/01 08:00:00'), new Date('2000/01/01 08:45:00')));
console.log(areEqualTimes(new Date('2000/01/01 08:00:00'), new Date('2000/01/01 08:00:00')));
console.log(areEqualTimes(new Date('2001/01/01 08:00:00'), new Date('2000/01/01 08:00:00')));


// 64 Write a function that takes two date instances as argument
//  It should return the number of days that lies between those dates
 
const daysBetweenDates = function (date1: Date, date2: Date) {
    const difference = date1.getTime() - date2.getTime();
    return Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
}

console.log('64 takes two date instances as argument It should return the number of days that lies between those dates');
console.log(daysBetweenDates(new Date('2020-06-11'), new Date('2020-06-01')));
console.log(daysBetweenDates(new Date('2000-01-01'), new Date('2020-06-01')));

//  65. Write a function that takes two date instances as argument
//  It should return true if they fall on the exact same day
//  It should return false otherwise
 
const isSameDay = function (date1: Date, date2: Date) {
    return date1.getTime() === date2.getTime();
}

console.log('65. takes two date instances as argument It should return true if they fall on the exact same day It should return false otherwise');
console.log(isSameDay(new Date('2000/01/01'), new Date('2000/01/01')));
console.log(isSameDay(new Date('2000/01/01'), new Date('2000/01/02')));
console.log(isSameDay(new Date('2001/01/01'), new Date('2000/01/01')));
console.log(isSameDay(new Date('2000/11/01'), new Date('2000/01/01')));


 // 66. Write a function that takes two number arrays as parameters 
// and return an array which contains elements from both 
// arrays

const mergeArrays = function (arr1: number[], arr2: number[]) {
    return [...arr1, ...arr2];
}

console.log('66 takes two number arrays as parameters and return an array which contains elements from both arrays');
console.log(mergeArrays([1, 2], [3, 4]));
console.log(mergeArrays([1, 2], [3, 4, 5, 6]))
 
//  67. Write a function that takes an array and a string as parameters 
//  and return an array which contains all elements from the given array
//  and the given string as the last element
 
const AddKiwi = function (arr: string[], fruit: string) {
    arr.push(fruit);
    return arr;
}

console.log('67 takes an array and a string as parameters and return an array which contains all elements from the given array and the given string as the last element');
console.log(AddKiwi(['Apple', 'Orange', 'Banana'], 'Kiwi'));

 //  68. Write a function that takes two objects as parameters 
//  and return an object which contains properties from both 
//  objects
 
const AddKiwi2 = function (arr: string[], fruit: string) {
    arr.unshift(fruit);
    return arr;
}

console.log('68 return an array which contains all elements from the given array and the given string as the first element');
console.log(AddKiwi2(['Apple', 'Orange', 'Banana'], 'Kiwi'));

 // 69. Write a function that takes an object and a string as parameters 
// and return an object which contains properties from the given object
// and a new property favoriteMovie with the value equal to the given strin

 
 const objMovie = function (obj: {eyeColor: string, age: number }, str: string) {
    type ObjectMovieExtend = typeof obj & {favoriteMovie: string}
    const newObj: ObjectMovieExtend = {
       eyeColor: obj['eyeColor'],
       age: obj['age'],
       favoriteMovie: str
    };
 
    return newObj;
 };
 
 console.log('69 Merge both objects and correct the wrong property name');
 console.log(objMovie({ eyeColor: 'green', age: 10 }, 'Garfield'));
 console.log(objMovie({ eyeColor: 'blue', age: 15 }, 'Twilight'));