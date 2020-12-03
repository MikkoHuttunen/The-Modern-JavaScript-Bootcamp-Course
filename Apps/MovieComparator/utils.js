//Rate limit data fetching
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            //Call function with as many arguments as needed
            func.apply(null, args);
        }, delay)
    };
};