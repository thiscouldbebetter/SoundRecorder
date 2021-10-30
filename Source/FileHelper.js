
class FileHelper
{
	static loadFileAsArrayBuffer(fileToLoad, callback)
	{
		var fileReader = new FileReader();
		fileReader.onload = (fileLoadedEvent) =>
		{
			var fileContentsAsArrayBuffer = fileLoadedEvent.target.result;
			callback(fileToLoad, fileContentsAsArrayBuffer);
		};
		fileReader.readAsArrayBuffer(fileToLoad);
	}

	static saveBlobAsFile(blobToSave, fileNameToSaveAs)
	{
		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.href = window.URL.createObjectURL(blobToSave);
		downloadLink.click();
	}

	static saveBytesToFile(bytesToSave, filenameToSaveTo)
	{
		var numberOfBytes = bytesToSave.length;
		var bytesAsArrayBuffer = new ArrayBuffer(numberOfBytes);
		var bytesAsUIntArray = new Uint8Array(bytesAsArrayBuffer);
		for (var i = 0; i < numberOfBytes; i++)
		{
			bytesAsUIntArray[i] = bytesToSave[i];
		}

		var bytesAsBlob = new Blob
		(
			[ bytesAsArrayBuffer ],
			{type:"application/type"}
		);

		var downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(bytesAsBlob);
		downloadLink.download = filenameToSaveTo;
		downloadLink.click();
	}
}
