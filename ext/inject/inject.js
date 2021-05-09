/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./inject.js":
/*!*******************!*\
  !*** ./inject.js ***!
  \*******************/
/***/ (() => {

eval("\r\nconst videoElementClassname = \"Gv1mTb-aTv5jf\" // This is for finding the video source of the shared screen\r\n\r\n\r\nchrome.extension.sendMessage({}, function(response) {\r\n\r\n\r\n\tvar iconContainer\r\n\tvar recordButton\r\n\tvar recording = false;\r\n\tvar saveLink = document.createElement(\"a\")\r\n\tsaveLink.setAttribute(\"target\",\"_blank\")\r\n\tsaveLink.setAttribute(\"download\",\"Google Meet Recording.mkv\")\r\n\tlet recorder;\r\n\r\n\t// Get when start/stop sharing screen & find video source\r\n\tvar videoSource = null;\r\n\tsetInterval(function() {\r\n\t\tconst newVideoSourcesCollection = document.getElementsByClassName(videoElementClassname)\r\n\t\tconst newVideoSourcesArray = Array.prototype.slice.call( newVideoSourcesCollection, 0 )\r\n\t\t// Set video source to the left most video element on screen that's less than 100px wide\r\n\t\tvar newVideoSource = null;\r\n\t\tnewVideoSource = newVideoSourcesArray.filter(v => v.offsetWidth <= 100 && v.style.display !== \"none\").sort((v1,v2) => v1.getBoundingClientRect().left - v2.getBoundingClientRect().left)[0]\r\n\t\t\r\n\t\t// If the video source changes (e.g. stops or gone from camera to screen)\r\n\t\tif(newVideoSource !== videoSource){\r\n\t\t\tif(newVideoSource){\r\n\t\t\t\tconsole.log(\"Found Video Source\")\r\n\t\t\t  videoSource = newVideoSource\r\n\t\t\t\ttry{ // Remove button if already exists (from camera)\r\n\t\t\t\t\tdocument.getElementById(\"custom-record-button\").remove()\r\n\t\t\t\t} catch (e) {}\r\n\t\t\t  injectRecordButton()\r\n\t\t\t} else {\r\n\t\t\t\tconsole.log(\"Lost Video Source\")\r\n\t\t\t\tif(recording){\r\n\t\t\t\t\tstopRecording(true)\r\n\t\t\t\t} else {\r\n\t\t\t\t\trecording = false\r\n\t\t\t\t}\r\n\t\t\t\tvideoSource = newVideoSource\r\n\t\t\t\ttry{\r\n\t\t\t\t\tdocument.getElementById(\"custom-record-button\").remove()\r\n\t\t\t\t} catch (e) {}\r\n\t\t\t}\r\n\t\t}\r\n\t},1000)\r\n\r\n\r\n\t// Inject record button when sharing screen\r\n\tconst injectRecordButton = () => {\r\n\t\ticonContainer = document.querySelector(\"div.f0WtFf\")\r\n\t\trecordButton = document.querySelector(\"div.Q8K3Le\").cloneNode(true)\r\n\t\trecordButton.setAttribute(\"id\", \"custom-record-button\")\r\n\t\trecordButton.addEventListener(\"click\", e => {\r\n\t\t\te.preventDefault()\r\n\t\t\tif(recording){\r\n\t\t\t\tstopRecording()\r\n\t\t\t} else {\r\n\t\t\t\tstartRecording()\r\n\t\t\t}\r\n\t\t})\r\n\t\trecordButton.style.display = \"none\"\r\n\t\ticonContainer.prepend(recordButton)\r\n\t\tsetTimeout(() => {\r\n\t\t\trenameRecordButton(\"Record Meeting\",false)\r\n\t\t\trecordButton.style.display = \"flex\"\r\n\t\t\trecordButton.setAttribute(\"jscontroller\",\"\")\r\n\t\t\trecordButton.setAttribute(\"jsaction\",\"\")\r\n\t\t},1000)\r\n\r\n\t\tdocument.body.appendChild(saveLink)\r\n\r\n\t}\r\n\r\n\r\n\r\n\t// Rename the record button\r\n\tconst renameRecordButton = (name,makeRed) => {\r\n\t\ttry{\r\n\t\t\tdocument.querySelector(\"div#custom-record-button div.I98jWb\").innerText = name\r\n\t\t\tdocument.querySelector(\"div#custom-record-button > div\").setAttribute(\"data-tooltip\", name)\r\n\t\t\tdocument.querySelector(\"div#custom-record-button i.google-material-icons\").innerText = \"camera\"\r\n\t\t\tif(makeRed){\r\n\t\t\t\tdocument.querySelector(\"div#custom-record-button div.I98jWb\").style.color = \"#f11\"\r\n\t\t\t\tdocument.querySelector(\"div#custom-record-button i.google-material-icons\").style.color = \"#f11\"\r\n\t\t\t} else {\r\n\t\t\t\tdocument.querySelector(\"div#custom-record-button div.I98jWb\").style.color = \"#5f6368\"\r\n\t\t\t\tdocument.querySelector(\"div#custom-record-button i.google-material-icons\").style.color = \"#5f6368\"\r\n\t\t\t}\r\n\t\t\treturn true\r\n\t\t} catch (e) {\r\n\t\t\treturn false\r\n\t\t}\r\n\t}\r\n\t\t\t\r\n\r\n\tconst startRecording = async () => {\r\n\t\tconsole.log(\"Start Recording\")\r\n\t\trenameRecordButton(\"Stop Recording\",true)\r\n\t\trecording = true\r\n\r\n\t\trecorder = new MediaRecorder(videoSource.srcObject)\r\n\r\n\t\tconst chunks = [];\r\n\t\trecorder.ondataavailable = e => chunks.push(e.data);\r\n\t\trecorder.onstop = e => {\r\n\t\t\tconst completeBlob = new Blob(chunks, { type: chunks[0].type });\r\n\t\t\tsaveLink.href = URL.createObjectURL(completeBlob);\r\n\t\t\tsaveLink.click();\r\n\t\t};\r\n\t\r\n\t\trecorder.start();\r\n\t}\r\n\r\n\tconst stopRecording = (skipConfirmation = false) => {\r\n\t\tif(skipConfirmation || confirm(\"Are you sure you want to stop the recording?\")){\r\n\r\n\t\t\tconsole.log(\"Stop Recording\")\r\n\t\t\trenameRecordButton(\"Record Meeting\",false)\r\n\t\t\trecording = false\r\n\r\n\t\t\trecorder.stop();\r\n\r\n\t\t}\r\n\t}\r\n\r\n});\r\n\r\n\r\n\n\n//# sourceURL=webpack://google-meet-screen-recorder/./inject.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./inject.js"]();
/******/ 	
/******/ })()
;