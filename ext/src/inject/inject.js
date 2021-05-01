chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		var iconContainer
		var recordButton
		var recording = false;
		var saveLink = document.createElement("a")
		saveLink.setAttribute("target","_blank")
		saveLink.setAttribute("download","Google Meet Recording.mkv")
		let recorder, stream;

		const inject = () => {
			iconContainer = document.querySelector("div.f0WtFf")
			if(!iconContainer){
				setTimeout(() => {
					inject()
				},500)
				return;
			}
	
			recordButton = document.querySelector("div.uD3s5c").cloneNode()
			recordButton.setAttribute("id", "custom-record-button")
			recordButton.addEventListener("click", e => {
				e.preventDefault()
				recording = !recording
				if(recording){
					startRecording()
				} else {
					stopRecording()
				}
			})
			iconContainer.prepend(recordButton)
			setTimeout(() => {
				renameRecordButton("Record Screen")
				recordButton.setAttribute("jscontroller","")
				recordButton.setAttribute("jsaction","")
			},1000)

			document.body.appendChild(saveLink)

		}
		inject()

		const renameRecordButton = name => {
			try{
				document.querySelector("div#custom-record-button div.YhIwSc").innerText = name
				document.querySelector("div#custom-record-button div.U26fgb").classList.remove("c7fp5b") // Remove all other classes
				document.querySelector("div#custom-record-button i.google-material-icons").innerText = "camera"
				return true
			} catch (e) {
				return false
			}
		}
		/*
		const startRecording = async () => {
			console.log("Start Recording")
			renameRecordButton("Stop Recording")
			recording = true

			//getMediaStream()

			const recorder = new MediaRecorder(window.webkitMediaStream);
			const chunks = [];
			recorder.ondataavailable = e => chunks.push(e.data);
			recorder.start();

			//window.webkitMediaStream
		}

		const stopRecording = () => {
			if(!confirm("Are you sure you want to stop recording?")){
				return;
			}
			console.log("Stop Recording")
			renameRecordButton("Start Recording")
			recording = false
		}

		const getMediaStream = () => {

			for(var object in window) { 
				if(window.hasOwnProperty(object)){
					console.log(object + " " + (typeof window[object]));
				}  
			}
			*/

		const startRecording = async () => {
			console.log("Start Recording")
			renameRecordButton("Stop Recording")

			// Doesn't like this mediaSteam object
			recorder = new MediaRecorder(window.webkitMediaStream);
		
			const chunks = [];
			recorder.ondataavailable = e => chunks.push(e.data);
			recorder.onstop = e => {
				const completeBlob = new Blob(chunks, { type: chunks[0].type });
				saveLink.href = URL.createObjectURL(completeBlob);
				saveLink.click();
			};
		
			recorder.start();

		}

		const stopRecording = () => {
			console.log("Stop Recording")
			renameRecordButton("Start Recording")

			recorder.stop();
			
		}

	}

	}, 10);
});