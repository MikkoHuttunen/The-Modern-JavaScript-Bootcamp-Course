class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    //Start the timer
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick(); //Call tick immediately at start
        this.interval = setInterval(this.tick, 20);
    };

    //Pause the timer
    pause = () => {
        clearInterval(this.interval); //Reset timer
    };

    //Called every second
    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining = this.timeRemaining - .02;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }
    };

    //Getter
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    //Setter
    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}