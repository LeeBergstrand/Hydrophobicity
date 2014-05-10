/*************************************************************************\
| Javascript for Hydrobobicity                                            |
| Date: 13-04-29                                                          |
| Created by: Lee Bergstrand			                                  |
| File IO code from http://www.html5rocks.com/en/tutorials/file/dndfiles/ |
\*************************************************************************/

//===========================================================================================
// Global Variables
//===========================================================================================
var FastaString = ""
var FastaHeader = ""
var FastaSeq    = ""
var AAseq = []
var AATable = {}

//===========================================================================================
// Funtions:
//===========================================================================================
function handleFileSelect(event) 
{	
	var file = event.target.files[0]; // FileList object.
	parseFile(file);
}
//-------------------------------------------------------------------------------------------
function handleDropzoneFileSelect(event) 
{
	event.stopPropagation();
	event.preventDefault();
	
	var file = event.dataTransfer.files[0]; // FileList object.
	parseFile(file);
}
//-------------------------------------------------------------------------------------------
function handleDragOver(event) 
{
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
//-------------------------------------------------------------------------------------------
function parseFile(file) 
{
	var reader = new FileReader();
	reader.onload = function(e) 
	{
		FastaString = reader.result;
		alert(FastaString)
		FastaExtraction(FastaString) 
	}
	reader.readAsText(file);
}
//-------------------------------------------------------------------------------------------
function FastaExtraction(FastaString) 
{
	var FastaComponents = FastaString.split(/\n/g)

	FastaHeader = FastaComponents[0]
	console.log(FastaHeader)
	for(var x = 1; x < FastaComponents.length; x++)
	{
		FastaSeq += FastaComponents[x];
	}
	console.log(FastaSeq)
}
//===========================================================================================
// Onload Code
//===========================================================================================
function onLoad() 
{
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) 
	{
	  	// Great success! All the File APIs are supported.
	} 
	else 
	{
		alert('The File APIs are not fully supported in this browser.');
	}
	
	document.getElementById('files').addEventListener('change', handleFileSelect, false);
	
	var dropZone = document.getElementById('dropZone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleDropzoneFileSelect, false);
}


