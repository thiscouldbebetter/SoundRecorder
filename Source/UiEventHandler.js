
class UiEventHandler
{
	static buttonPlay_Clicked()
	{
		Globals.Instance.soundRecorder.play();
	}

	static buttonRecord_Clicked()
	{
		Globals.Instance.soundRecorder.record();
	}

	static buttonSave_Clicked()
	{
		Globals.Instance.soundRecorder.saveAsWebM();
	}

	static buttonStop_Clicked()
	{
		Globals.Instance.soundRecorder.stop();
	}

	static inputWebMFileToConvertToWav_Changed(inputWebMFileToConvertToWav)
	{
		var file = inputWebMFileToConvertToWav.files[0];
		FileHelper.loadFileAsArrayBuffer
		(
			file,
			(fileAgain, fileContentsAsArrayBuffer) =>
			{
				Globals.Instance.soundRecorder.saveAsWav(fileContentsAsArrayBuffer)
			}
		);
	}
}