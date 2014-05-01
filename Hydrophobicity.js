/*************************************************************************\
| Javascripts for Hydrobobicity                                           |
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

function handleFileSelect(evt) 
{
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++)
    {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
//-------------------------------------------------------------------------------------------

function handleFileSelect(evt) 
{
	evt.stopPropagation();
	evt.preventDefault();
	
	var files = evt.dataTransfer.files; // FileList object.
	
	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++) 
	{
	  output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
	              f.size, ' bytes, last modified: ',
	              f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
	              '</li>');
	}
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
//-------------------------------------------------------------------------------------------

function handleDragOver(evt) 
{
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

//===========================================================================================
// Onload Code
//===========================================================================================

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

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);