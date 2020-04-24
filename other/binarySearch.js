function binarySearch(arr, k) {
    let l = 0, r = arr.length - 1;
    let mid;
    while(l <= r) {
        mid = (l + r) >> 1;
        if (k === arr[mid]) {
            return mid;
        } else if (arr[mid] < k) {
            l = mid + 1;
        } else if (arr[mid] > k) {
            r = mid - 1;
        }
    }
    return -1;
}
// var arr = [1, 2, 3, 4, 5, 5, 7, 7, 8, 9];
// console.log(binarySearch(arr, 6) === -1);
// console.log(binarySearch(arr, 3) === 2);
// console.log(binarySearch(arr, 10) === -1);
// console.log(binarySearch(arr, 9) === 9);
// console.log(binarySearch(arr, 1) === 0);

function leftBound(arr, k) {
    let l = 0, r = arr.length - 1;
    let mid;
    while(l <= r) {
        mid = (l + r) >> 1;
        if (k === arr[mid]) {
            r = mid - 1
        } else if (arr[mid] < k) {
            l = mid + 1;
        } else if (arr[mid] > k) {
            r = mid - 1;
        }
    }
    if (l > arr.length - 1) return -1
    if (arr[l] === k) {
        return l
    } else {
        return -1
    }
}
var arr = [1, 2, 3, 4, 5, 5, 7, 7, 8, 9];
console.log(leftBound(arr, 6) === -1);
console.log(leftBound(arr, 3) === 2);
console.log(leftBound(arr, 10) === -1);
console.log(leftBound(arr, 9) === 9);
console.log(leftBound(arr, 1) === 0);
console.log(leftBound(arr, 5) === 4);
function rightBound(arr, k) {
    let l = 0, r = arr.length - 1;
    let mid;
    while(l <= r) {
        mid = (l + r) >> 1;
        if (k === arr[mid]) {
            l = mid + 1;
        } else if (arr[mid] < k) {
            l = mid + 1;
        } else if (arr[mid] > k) {
            r = mid - 1;
        }
    }
    if (arr[r] === k) {
        return r
    } else {
        return -1
    }
}
// var arr = [1, 2, 3, 4, 5, 5, 7, 7, 8, 9];
// console.log(rightBound(arr, 6) === -1);
// console.log(rightBound(arr, 3) === 2);
// console.log(rightBound(arr, 10) === -1);
// console.log(rightBound(arr, 9) === 9);
// console.log(rightBound(arr, 1) === 0);
// console.log(rightBound(arr, 0) === -1);
// console.log(rightBound(arr, 5) === 5);
