const btn = document.querySelector('button');

const moveX = (element, amount, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const bodyBoundary = document.body.clientWidth; //Document boundary
            const elRight = element.getBoundingClientRect().right; //Current right of the element
            const currLeft = element.getBoundingClientRect().left; //Current left of the element
            //Check if element is off the boundary otherwise move
            if (elRight + amount > bodyBoundary) {
                //Send some data when rejecting
                reject({bodyBoundary, elRight, amount});
            } else {
                element.style.transform = `translateX(${currLeft + amount}px)`;
                resolve();
            }
        }, delay);
    });
};

//Move element in web page using chained promises
moveX(btn, 300, 1000)
    .then(() => moveX(btn, 300, 1000)) //Implicit returns to make it more clear
    .then(() => moveX(btn, 300, 1000))
    .then(() => moveX(btn, 300, 1000))
    .then(() => moveX(btn, 300, 1000))
    .then(() => moveX(btn, 300, 1000))
    .catch(({bodyBoundary, elRight, amount}) => {
        alert('OUT OF SPACE, CANNOT MOVE');
        //Retrieve data from rejected promise
        console.log(`Body is ${bodyBoundary}px wide`);
        console.log(`Element is at ${elRight}px, ${amount}px is too large`);
    })

//Move element in nested callback functions
/*moveX(btn, 100, 1000, () => {
    //Success
    moveX(btn, 400, 1000, () => {
        //Success
        moveX(btn, 700, 1000, () => {
            //Success
            alert('CAN STILL MOVE FURTHER!');
        }, () => {
            //Fail
            alert('CANNOT MOVE FURTHER!');
        });
    }, () => {
        //Fail
        alert('CANNOT MOVE FURTHER!');
    })
}, () => {
    //Fail
    alert('CANNOT MOVE FURTHER!');
})*/

//Promises

//Promise that gets resolved or rejected randomly after 5 seconds
const dogPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.5) {
                resolve();
            } else {
                reject();
            }
        }, 5000);
    });
};

//If promise resolves or gets rejected
dogPromise().then(() => {
    console.log('We get a dog!');
}).catch(() => {
    console.log("We won't get a dog");
});

//Create a promise with values
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pages = {
                '/users': [
                    {id: 1, username: 'Bilbo'},
                    {id: 5, username: 'Esmeralda'}
                ], '/users/1': {
                    id: 1,
                    username: 'Bilbo',
                    upvotes: 360,
                    city: 'Lisbon',
                    topPostId: 454321
                }, '/users/5': {
                    id: 5,
                    username: 'Esmeralda',
                    upvotes: 571,
                    city: 'Honolulu'
                }, '/posts/454321': {
                    id: 454321,
                    title: 'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
                }, '/about': 'This is the about page'
            };
            const data = pages[url];
            if (data) {
                resolve({status: 200, data}); //Status code 200 and data for success
            } else {
                reject({status: 404}); //Status code 404 for failing
            }
        }, 1000);
    });
};

//Resolving and rejecting retrieving values
fakeRequest('/users').then((res) => {
    console.log('Status Code', res.status);
    console.log('Data', res.data);
    console.log('REQUEST WORKED!');
}).catch((res) => {
    console.log(res.status);
    console.log('REQUEST FAILED!');
});

//Returns failed
fakeRequest('/dogs').then((res) => {
    console.log('Status Code', res.status);
    console.log('Data', res.data);
    console.log('REQUEST WORKED!');
}).catch((res) => {
    console.log(res.status);
    console.log('REQUEST FAILED!');
});

//Promise chaining with only 1 catch needed
fakeRequest('/users').then((res) => {
    console.log(res);
    const id = res.data[0].id;
    return fakeRequest(`/users/${id}`);
}).then((res) => {
    console.log(res);
    const postId = res.data.topPostId;
    return fakeRequest(`/posts/${postId}`);
}).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log('ERROR!', err);
});