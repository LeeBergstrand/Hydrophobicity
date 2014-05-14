/*************************************************************************\
| Javascript for Hydrobobicity                                            |
| Date: 13-04-29                                                          |
| Created by: Lee Bergstrand			                          		  |
| File IO code from http://www.html5rocks.com/en/tutorials/file/dndfiles/ |
\*************************************************************************/

//===========================================================================================
// Global Variables
//===========================================================================================
var FastaString = "";
var FastaHeader = "";
var AAseq = [];
var AALabels = [];
var pH2Enabled = true;
var pH7Enabled = true;
var AAHydrobobityPh2 = [];
var AAHydrobobityPh7 = [];

var AATablePh2 = {A: 47, R: -26, N: -41, D: -18, C: 52, Q: -18, E: 8, G: 0, H: -42, I: 100, L: 00, K: -37, M: 74, F: 92,     
                  P: -46, S: -7, T: 13, W: 84, Y: 49, V: 79}

var AATablePh7 = {A: 41, R: -14, N: -28, D: -55, C: 49, Q: -10, E: -31, G: 0, H: 8, I: 99, L: 97, K: -23, M: 74, F: 100, 
                  P:-46, S:-5, T:13, W:97, Y:63, V:76}
					
var AAOneLetterToThreeLetter = {A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly',
                                H: 'His', I: 'Ile', L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', 
                                T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val'}
					
//===========================================================================================
// Funtions:
//===========================================================================================
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

	AAseq = [];
	AALabels = [];
	AAHydrobobityPh2 = [];
	AAHydrobobityPh7 = [];

	reader.onload = function(e) 
	{
		FastaString = reader.result;
		FastaExtraction(FastaString);
		generateAAHydrobobityArrays(AAseq);
		generateChart(); 
	}
	reader.readAsText(file);
}
//-------------------------------------------------------------------------------------------
function FastaExtraction(FastaString) 
{
	var FastaSeq = "";
	var FastaComponents = FastaString.split(/\n/g);

	FastaHeader = FastaComponents[0];
	console.log(FastaHeader);
	for(var x = 1; x < FastaComponents.length; x++)
	{
		FastaSeq += FastaComponents[x];
	}
	AAseq = FastaSeq.toUpperCase().split('');
	console.log(AAseq);
}
//-------------------------------------------------------------------------------------------
function generateAAHydrobobityArrays(AAseq) 
{
	for(var x = 1; x < AAseq.length; x++)
	{
		if (AAseq[x] in AATablePh2)
		{
			AAHydrobobityPh2.push(AATablePh2[AAseq[x]]);
			AAHydrobobityPh7.push(AATablePh7[AAseq[x]]);
			AALabels.push(AAOneLetterToThreeLetter[AAseq[x]])
		}
		else
		{
			alert("Ambiguous Amino Acid Found!");
			AAHydrobobityPh2.push(0);
			AAHydrobobityPh7.push(0);
			AALabels.push("?");
		}
	}
	console.log(AAHydrobobityPh2);
	console.log(AAHydrobobityPh7);
	console.log(AALabels);
}
//-------------------------------------------------------------------------------------------
function generateChart()
{
	// Get the context of the canvas element we want to select
	var myChart = $("#myChart")[0];
	var ctx = myChart.getContext("2d");

	// Reset and clear canvas
	myChart.width = AAseq.length * 25;
	myChart.height = parseInt($("#canvasContainer").css("height")) * 0.95;
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	if (!(pH2Enabled || pH7Enabled)) {
		return; // No need to bother with the rest if no datasets are enabled
	}

	var data = {
			labels : AALabels,
			datasets : []
	}

	// Set enabled chart datasets
	if (pH2Enabled) {
		data.datasets[data.datasets.length] = {
							fillColor : "rgba(40,174,219,0.5)",
							strokeColor : "rgba(40,174,219,1)",
							pointColor : "rgba(40,174,219,1)",
							pointStrokeColor : "#fff",
							data : AAHydrobobityPh2
						      };
	}

	if (pH7Enabled) {
		data.datasets[data.datasets.length] = {
							fillColor : "rgba(220,41,59,0.5)",
							strokeColor : "rgba(220,41,59,1)",
							pointColor : "rgba(220,41,59,1)",
							pointStrokeColor : "#fff",
							data : AAHydrobobityPh7
						      };
	}

	var options = {animation: false};
	var myNewChart = new Chart(ctx).Line(data, options);
}
//-------------------------------------------------------------------------------------------
function toggleDataset(dataset) {
	if (dataset == "pH2") {
		pH2Enabled = !pH2Enabled;
	}
	else if (dataset == "pH7") {
		pH7Enabled = !pH7Enabled;
	}

	generateChart();
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
	
	var dropZone = $("#dropZone")[0];
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleDropzoneFileSelect, false);
}