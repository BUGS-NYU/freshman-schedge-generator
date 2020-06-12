import React, {useState} from 'react';

async function randomCourses() {
    try {
        const data = await fetch('https://schedge.a1liu.com/2020/FA/UA/CORE')
        //awaits for the promise to return the data
        const courses = await data.json();

        let physicalScience = [];
        let lifeScience = [];
        let textsAndIdeas = [];
        let culturesAndContexts = [];
        let expressiveCulture = [];
        let quantitativeReasoning = [];

        let i = 0;


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


        let randomSectionArray = [];

        let random = twoRandomIndices(allSections.length);

        let randomCourseOne = allSections[random[0]];
        let randomCourseTwo = allSections[random[1]];

        let randomSectionOne = randomCourseOne[randomIndex(randomCourseOne.length)];
        let randomSectionTwo = randomCourseTwo[randomIndex(randomCourseTwo.length)];

        randomSectionArray.push(randomSectionOne);
        randomSectionArray.push(randomSectionTwo);

       console.log(randomSectionArray);

        return randomSectionArray;
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const Fetcher = () => {
    const [courses, setCourses] = useState([]);

    async function setCoursesAsync(event) {
        const randomArray = await randomCourses();
        setCourses(randomArray);
    }

    return (
        <button onClick={setCoursesAsync}/>
        )
    }

function randomIndex(size) {
    return Math.floor(Math.random() * size);
}

function twoRandomIndices(size) {
    let one = Math.floor(Math.random() * size);
    let two = Math.floor(Math.random() * size);

    while (one === two) {
        two = Math.floor(Math.random() * size);
    }

    return [one, two];
}




//async functions always return a promise

export default Fetcher;


//'https://schedge.a1liu.com/2020/FA/UA/CORE'