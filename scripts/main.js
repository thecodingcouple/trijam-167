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
        button.appendChild(createAnimalFigure(animal));
        button.onclick = () => {
            onAnimalButtonClicked(animal);
        };

        buttonGroup.appendChild(button);
    }
}

/**
 * Create a figure populated with animal data
 * @param {*} data Animal data
 * @returns figure with image and caption
 */
function createAnimalFigure(data) {
    let figure = document.createElement("figure");
    let image = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    image.src = `images/${data.imageFileName}`;
    figCaption.innerHTML = data.name;

    figure.appendChild(image);
    figure.appendChild(figCaption);

    return figure;
}

/**
 * 
 * @param {*} animal 
 */
function onAnimalButtonClicked(animal) {
    const audioUrl = `sounds/${animal.soundFileName}`;
    new Audio(audioUrl).play();
}

/**
 * Gets a random number between min (inclusive) and max (exclusive)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
 * @param {*} min Minimum number
 * @param {*} max Maximum number
 * @returns A random number between min and max
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
function generateGameSoundSequence(data) {
    const sequenceCount = 4;
    let sequence = [];

    // Randomly add animals to game sequence 
    for(let x = 0; x < sequenceCount; x++) {
        let randomIndex = getRandomInt(0, data.length);
        sequence.push(data[randomIndex]);
    }

    return sequence;
}

/**
 * Play sequence of sound files
 * @param {*} sounds 
 */
function playSounds(sounds) {
    const audio = new Audio();
    audio.src = sounds.shift();
    audio.play();

    audio.addEventListener("ended", () => {
        if (sounds.length) {
            audio.src = sounds.shift();
            audio.play();
        }
    });
}

/**
 * 
 * @param {*} data 
 */
function startGame(data) {
    // Generate game sequence
    let soundSequence = generateGameSoundSequence(data);
    console.log(soundSequence.map(s => s));

    const sounds = soundSequence.map(animal => `sounds/${animal.soundFileName}`);
    playSounds(sounds);
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

    // Create animal buttons
    createAnimalButtons(data);

    // Add listener to start game
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
        startGame(data);
    });
}

main();