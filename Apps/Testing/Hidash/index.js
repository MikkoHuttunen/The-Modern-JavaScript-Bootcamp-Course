module.exports = {
    forEach(arr, func) {
        /*for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            func(value, i);
        }*/

        for (let index in arr) {
            func(arr[index], index);
        }
    },
    map(arr, func) {
        const result = [];

        for (let i = 0; i < arr.length; i++) {
            result.push(func(arr[i], i));
        }

        return result;
    }
};