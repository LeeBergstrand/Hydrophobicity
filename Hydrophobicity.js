/*************************************************************************\
| Javascript for Hydrobobicity                                            |
| Date: 13-04-29                                                          |
| Created by: Lee Bergstrand			                                  |
| File IO code from http://www.html5rocks.com/en/tutorials/file/dndfiles/ |
\*************************************************************************/

//===========================================================================================
// Global Variables
//===========================================================================================





//===========================================================================================
// Funtions:
//===========================================================================================
function handleFileSelect(event) 
{
	event.stopPropagation();
	event.preventDefault();
	var files = event.dataTransfer.files; // FileList object.
}
//-------------------------------------------------------------------------------------------
function handleDragOver(event) 
{
	event.stopPropagation();
	event.preventDefault();
	event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//===========================================================================================
// Onload Code
//===========================================================================================

function onLoad(event) 
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
	dropZone.addEventListener('drop', handleFileSelect, false);
}


