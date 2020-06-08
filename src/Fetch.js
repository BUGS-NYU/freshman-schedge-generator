
const axios = require('axios');

async function my_async_function() {
    try {
        const data = await axios.get('https://schedge.a1liu.com/2020/FA/UA/CORE')
        //awaits for the promise to return the data
        const courses = data.data;
        console.log(courses);

        let physicalScience = [];
        let lifeScience = [];
        let textsAndIdeas = [];
        let culturesAndContexts = [];
        let expressiveCulture = [];
        let quantitativeReasoning = [];

        for (i = 0; i < courses.length; i++) {
            const id = parseInt(courses[i].deptCourseId);

            if (id < 300 && id >= 200) {
                physicalScience = physicalScience.concat(courses[i].sections);
            } else if (id < 400 && id >= 300) {
                lifeScience = lifeScience.concat(courses[i].sections);
            }
            else if (id >= 400 && id < 500) {
                textsAndIdeas = textsAndIdeas.concat(courses[i].sections);
            } else if (id >= 500 && id < 600) {
                culturesAndContexts = culturesAndContexts.concat(courses[i].sections);
            } else if (id >= 700) {
                expressiveCulture = expressiveCulture.concat(courses[i].sections);
            } else {
                quantitativeReasoning= quantitativeReasoning.concat(courses[i].sections);
            }
        }

        const allSections = [];
        allSections.push(physicalScience);
        allSections.push(lifeScience);
        allSections.push(textsAndIdeas);
        allSections.push(culturesAndContexts);
        allSections.push(expressiveCulture);
        allSections.push(quantitativeReasoning);

        randomSectionArray = [];

        let random = twoRandomIndices(allSections.length);

        randomCourseOne = allSections[random[0]];
        randomCourseTwo = allSections[random[1]];

        randomSectionOne = randomCourseOne[randomIndex(randomCourseOne.length)];
        randomSectionTwo = randomCourseTwo[randomIndex(randomCourseTwo.length)];

        randomSectionArray.push(randomSectionOne);
        randomSectionArray.push(randomSectionTwo);

       console.log(randomSectionArray);

        return randomSectionArray;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

function randomIndex(size) {
    return Math.floor(Math.random() * size);
}

function twoRandomIndices(size) {
    let one = Math.floor(Math.random() * size);
    let two = Math.floor(Math.random() * size);

    while (one == two) {
        two = Math.floor(Math.random() * size);
    }

    return [one, two];
}




//async functions always return a promise

my_async_function();


//'https://schedge.a1liu.com/2020/FA/UA/CORE'