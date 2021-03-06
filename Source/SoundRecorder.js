
class SoundRecorder
{
	initialize()
	{
		navigator.getUserMedia
		(
			{ audio: true },
			 
			this.mediaRecorder_GetUserMedia_Successful.bind(this),
 
			// error callback
			(error) =>
			{
				alert("ERROR: " + error);
			}
		);
	}

	play()
	{
		document.getElementById("inputInfo").value = "Playing...";

		if (this.audioDataRecorded != null)	 
		{
			var audioURLRecorded = window.URL.createObjectURL(this.audioDataRecorded);
			var domElementForAudio = document.createElement("audio");
			domElementForAudio.src = audioURLRecorded;
			domElementForAudio.onended = this.stop.bind(this);
			domElementForAudio.play();
		}
	}

	record()
	{
		document.getElementById("inputInfo").value = "Recording...";
		this.mediaRecorder.start
		(
			// hack - Not sure why I have to do this.
			// May limit the recording to 60 seconds?
			60000 // timeslice 
		);
	}

	saveAsWav(fileContentAsArrayBuffer)
	{
		var offlineAudioContext = new OfflineAudioContext
		({
			length: 88200,
			sampleRate: 44100
		});

		var source = offlineAudioContext.createBufferSource();

		offlineAudioContext.decodeAudioData
		(
			fileContentAsArrayBuffer, 
			(bufferDecoded) =>
			{
				source.buffer = bufferDecoded;
				source.connect(offlineAudioContext.destination);
				source.start();
				offlineAudioContext.startRendering().then
				(
					this.saveAsWav_AudioRenderingComplete
				);
			}
		);
	}

	saveAsWav_AudioRenderingComplete(renderedBuffer)
	{
		var numberOfChannels = renderedBuffer.numberOfChannels;
		var samplesPerSecond = renderedBuffer.sampleRate;

		var wavFile = new WavFile
		(
			"Converted.wav",
			new WavFileSamplingInfo
			(
				WavFileSamplingInfo.FormatCodeDefault,
				numberOfChannels,
				samplesPerSecond,
				8, // bitsPerSample,
				null // extraBytes
			),
			null // samplesForChannels
		);

		var samplesNormalized = renderedBuffer.getChannelData(0);
		var samplesDenormalized =
			wavFile.samplingInfo.samplesDenormalize(samplesNormalized);
		wavFile.samplesForChannels[0] = samplesDenormalized;

		var wavFileAsBytes = wavFile.toBytes();

		FileHelper.saveBytesToFile
		(
			wavFileAsBytes, wavFile.filePath
		);
	}

	saveAsWebM()
	{
		// The audio appears to be in some sort of "WebM" format.
		// Browsers appear to understand it,
		// but I would much prefer a simple WAV.

		FileHelper.saveBlobAsFile
		(
			this.audioDataRecorded,
			"Recording.webm" 
		);
	}

	stop()
	{
		document.getElementById("inputInfo").value = "Stopped.";
		if (this.mediaRecorder.state == "recording")
		{
			this.mediaRecorder.stop();
		}
	}

	// MediaRecorder event handlers

	mediaRecorder_DataAvailable(event) 
	{
		if (this.mediaRecorder.state != "recording")
		{
			this.audioDataRecorded = event.data;
			document.getElementById("inputInfo").value =
				"Sound recorded.";
		}
	}

	mediaRecorder_GetUserMedia_Successful(stream)
	{
		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.ondataavailable =
			this.mediaRecorder_DataAvailable.bind(this);
	}

}
