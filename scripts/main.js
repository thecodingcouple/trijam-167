/**
 * Fetch animal data
 * @returns Animal data
 */
async function getAnimalData() {
    let data = [];
    try { 
        const response = await fetch('scripts/animals.json');
        if (response.ok) {
            data = response.json();
        } else {
            throw response.statusText;
        }
    } catch (error) {
        console.error(error);
    } finally {
        return data;
    }
}

/**
 * 
 * @param {*} data 
 */
function createAnimalButtons(data) {
    const buttonGroup = document.getElementById('animal-button-group');

    for(const animal of data) {
        let button = document.createElement("button");
        button.innerHTML = animal.name;
        button.onclick = () => {
            onAnimalButtonClicked(animal);
        };

        buttonGroup.appendChild(button);
    }
}

/**
 * 
 * @param {*} animal 
 */
function onAnimalButtonClicked(animal) {
    console.log(animal.name);
}

/**
 * Gets a random number between min (inclusive) and max (exclusive)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_number_between_two_values
 * @param {*} min Minimum number
 * @param {*} max Maximum number
 * @returns A random number between min and max
 */
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Main function
 */
async function main() {
    const MAX_ANIMAL_COUNT = 4;
    let data = await getAnimalData();

    // Randomly remove animals from data for game variability 
    for(let x = 1; x < MAX_ANIMAL_COUNT; x++) {
        let randomIndex = getRandomInt(0, data.length);
        data.splice(randomIndex, 1);
    }

    createAnimalButtons(data);
}

main();