
const videoElementClassname = "Gv1mTb-aTv5jf" // This is for finding the video source of the shared screen

chrome.extension.sendMessage({}, function(response) {


	var iconContainer
	var recordButton
	var recording = false;
	var saveLink = document.createElement("a")
	saveLink.setAttribute("target","_blank")
	saveLink.setAttribute("download","Google Meet Recording.mkv")
	let recorder;

	// Get when start/stop sharing screen & find video source
	var videoSource = null;
	setInterval(function() {
		const newVideoSourcesCollection = document.getElementsByClassName(videoElementClassname)
		const newVideoSourcesArray = Array.prototype.slice.call( newVideoSourcesCollection, 0 )
		// Set video source to the left most video element on screen that's less than 100px wide
		var newVideoSource = null;
		newVideoSource = newVideoSourcesArray.filter(v => v.offsetWidth <= 100 && v.style.display !== "none").sort((v1,v2) => v1.getBoundingClientRect().left - v2.getBoundingClientRect().left)[0]
		if(videoSource && !newVideoSource){
			console.log("Lost Video Source")
			videoSource = null
			recording = false
			document.getElementById("custom-record-button").remove()
		} else if(!videoSource && newVideoSource){
			console.log("Found Video Source")
			videoSource = newVideoSource.srcObject
			injectRecordButton()
		}
	},1000)


	// Inject record button when sharing screen
	const injectRecordButton = () => {
		iconContainer = document.querySelector("div.f0WtFf")
		recordButton = document.querySelector("div.Q8K3Le").cloneNode(true)
		recordButton.setAttribute("id", "custom-record-button")
		recordButton.addEventListener("click", e => {
			e.preventDefault()
			if(recording){
				stopRecording()
			} else {
				startRecording()
			}
		})
		recordButton.style.display = "none"
		iconContainer.prepend(recordButton)
		setTimeout(() => {
			renameRecordButton("Record Meeting",false)
			recordButton.style.display = "flex"
			recordButton.setAttribute("jscontroller","")
			recordButton.setAttribute("jsaction","")
		},1000)

		document.body.appendChild(saveLink)

	}



	// Rename the record button
	const renameRecordButton = (name,makeRed) => {
		try{
			document.querySelector("div#custom-record-button div.I98jWb").innerText = name
			document.querySelector("div#custom-record-button > div").setAttribute("data-tooltip", name)
			document.querySelector("div#custom-record-button i.google-material-icons").innerText = "camera"
			if(makeRed){
				document.querySelector("div#custom-record-button div.I98jWb").style.color = "#f11"
				document.querySelector("div#custom-record-button i.google-material-icons").style.color = "#f11"
			} else {
				document.querySelector("div#custom-record-button div.I98jWb").style.color = "#5f6368"
				document.querySelector("div#custom-record-button i.google-material-icons").style.color = "#5f6368"
			}
			return true
		} catch (e) {
			return false
		}
	}
			

	const startRecording = async () => {
		console.log("Start Recording")
		renameRecordButton("Stop Recording",true)
		recording = true

		console.log("Video Source")
    console.log(videoSource)

		recorder = new MediaRecorder(videoSource)

		const chunks = [];
		recorder.ondataavailable = e => chunks.push(e.data);
		recorder.onstop = e => {
			const completeBlob = new Blob(chunks, { type: chunks[0].type });
			saveLink.href = URL.createObjectURL(completeBlob);
			saveLink.click();
		};
	
		recorder.start();

		/*
		stream = await navigator.mediaDevices.getDisplayMedia({
			video: { mediaSource: "screen" }
		});
		recorder = new MediaRecorder(stream);
	
		const chunks = [];
		recorder.ondataavailable = e => chunks.push(e.data);
		recorder.onstop = e => {
			const completeBlob = new Blob(chunks, { type: chunks[0].type });
			saveLink.href = URL.createObjectURL(completeBlob);
			saveLink.click();
		};
	
		recorder.start();
		*/

	}

	const stopRecording = () => {
		if(confirm("Are you sure you want to stop the recording?")){

			console.log("Stop Recording")
			renameRecordButton("Record Meeting",false)
			recording = false

			recorder.stop();

		}

		/*
		recorder.stop();
		stream.getVideoTracks()[0].stop();
		*/

	}

});


