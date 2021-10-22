
class FileHelper
{     
    static saveBlobAsFile(blobToSave, fileNameToSaveAs)
    {
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.URL.createObjectURL(blobToSave);
        downloadLink.click();
    }
}
