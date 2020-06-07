
const axios = require('axios');

async function my_async_function() {
    try {
        const data = await axios.get('https://schedge.a1liu.com/2020/FA/UA/CORE')
        //awaits for the promise to return the data
        console.log(data.data);
        return data.data;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

//async functions always return a promise

my_async_function();


//'https://schedge.a1liu.com/2020/FA/UA/CORE'