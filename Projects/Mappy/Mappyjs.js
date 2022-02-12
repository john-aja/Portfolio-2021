'use strict'

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


let map, mapEvent;


class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;

    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }


    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace
    }
}

class Cycling extends Workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();
    }

    calcSpeed() {
        // km/hr
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}


///////////////////////////////////////////////////////

class App {
    #map;
    #mapEvent;
    #workOut = []
    #mapZoomLevel = 13;

    constructor() {
        this._getPosition();

        this._getLocalStorage();

        form.addEventListener('submit', this._newWorkout.bind(this));

        inputType.addEventListener('change', this._toggleElevationField);

        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position');
            })
    }

    _loadMap(position) {

        const { latitude } = position.coords;
        const { longitude } = position.coords;

        const coords = [latitude, longitude]
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        this.#map.on('click', this._showForm.bind(this));

        this.#workOut.forEach(work => {
            this._renderWorkout(work);
            this._renderWorkoutMarker(work);
        })
    }


    _showForm(mapE) {

        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    };

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 10);
    }

    _toggleElevationField() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e) {

        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every(inp => inp > 0);

        e.preventDefault();

        // get data from form

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng;

        let workOut;
        // check if data is valid

        // if workout running, create running object

        if (type === 'running') {
            const cadence = +inputCadence.value;

            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert('Inputs have to be positive number');

            workOut = new Running([lat, lng], distance, duration, cadence);
        }


        // if workout running, create cycling object

        if (type === 'cycling') {
            const elevationGain = +inputElevation.value;


            if (!validInputs(distance, duration, elevationGain) || !allPositive(distance, duration)) return alert('Inputs have to be positive number');

            workOut = new Cycling([lat, lng], distance, duration, elevationGain);
        }

        // add new object to workout array
        this.#workOut.push(workOut);



        // render workout on map as marker
        this._renderWorkoutMarker(workOut)



        //  render workout on list
        this._renderWorkout(workOut)


        // hide form + input fields
        this._hideForm()

        //  set local storage 

        this._setLocalStorage();
    }

    _renderWorkoutMarker(workOut) {
        L.marker(workOut.coords).addTo(this.#map)
            .bindPopup(L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workOut.type}-popup`,
            }))
            .setPopupContent(`${workOut.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workOut.description}`)
            .openPopup();
    }

    _renderWorkout(workOut) {

        let html = `<section class="events"><div class="workout event-tab-${workOut.type} workout--${workOut.type}" data-id="${workOut.id}">
        <span class="event event-date">${workOut.description}</span>
            <div class="info">
                <h6 class="event-activity">${workOut.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} <span class="information kms">${workOut.distance}</span><span
            class="text">Km
        </span>
                </h6 >
                <h6 class="event-activity">⏱<span class="information time">${workOut.duration}</span><span class="text">MIN
                        </span>
                </h6> 
                <h6 class="event-activity">⚡️ <span class="information speed">${workOut.type === 'running' ? workOut.pace.toFixed(1) : workOut.speed} </span><span
                      class="text">${workOut.type === 'running' ? 'min/km' : 'km / hr'}</span></h6 >
                <h6 class="event-activity">${workOut.type === 'running' ? '🦶🏼' : '⛰'} <span class="information steps">${workOut.type === 'running' ? workOut.cadence : workOut.elevationGain} </span><span class="text">${workOut.type === 'running' ? 'Spm' : 'm'}
            </span>
            </h6>
            </div >
        </div ></section> `;

        form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout');

        if (!workoutEl) return;

        const workout = this.#workOut.find(work => work.id === workoutEl.dataset.id);

        this.#map.setView(workout.coords, this.#mapZoomLevel, {
            animate: true,
            pan: {
                duration: 1
            }
        });

        // workout.click();
    }

    _setLocalStorage() {
        localStorage.setItem('workout', JSON.stringify(this.#workOut))
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workout'));

        if (!data) return;

        this.#workOut = data;
    }

    reset() {
        localStorage.removeItem('workout');
        location.reload();
    }
}

const app = new App();