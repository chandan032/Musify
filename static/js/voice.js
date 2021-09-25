function runSpeechRecognition() {
	var action = document.getElementById("action");
	// new speech recognition object
	var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
	var recognition = new SpeechRecognition();

	// This runs when the speech recognition service starts
	recognition.onstart = function () {
		// action.innerHTML = "<small>listening, please speak...</small>";
	};

	recognition.onspeechend = function () {
		// action.innerHTML = "<small>...</small>";
		recognition.stop();
	}

	// This runs when the speech recognition service returns result
	recognition.onresult = function (event) {
		var transcript = event.results[0][0].transcript;
		var confidence = event.results[0][0].confidence;
		console.log(transcript)
		if (transcript == "play") {
			playAudio();
		}
		else if (transcript == "pause") {
			pauseAudio();
		}
		else if (transcript == "play recent") {
			window.location.replace("/recent");
		}
		else if (transcript == "play previous") {
			window.location.replace("/last_played");
		}
		else {
			songName = transcript.slice(5);
			url = "/play/" + songName + "/"
			window.location.replace(url);
		}
	};

	// start recognition
	recognition.start();
}

function playAudio() {
	var x = document.getElementsByName("media")[0];
	x.play();
}

function pauseAudio() {
	var x = document.getElementsByName("media")[0];
	x.pause();
}
