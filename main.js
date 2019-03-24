let replicateNum = prompt('How many replicates of counting?');
let dilutionFactor = prompt('Dilution factor?');

function compute() {
	let totalData = [];
	let filledReplicates = replicateNum;
	for (t = 0; t < replicateNum; t++) {
		let liveCells = [], deadCells = [];
		for (r = 0; r < 4; r++) {
			for (c = 0; c < 2; c++) {
				let currCell = document.getElementById(`t${t}r${r}c${c}`);
				let val = currCell.value;
				if (val == '') continue;
				val = parseInt(val);
				if (r % 2 == 0) {
					// current cells are live cells
					liveCells.push(val);
				} else {
					// current cells are dead cells
					deadCells.push(val);
				}
			}
		}
		let totalLive = sumArray(liveCells);
		let totalCells = totalLive + sumArray(deadCells);
		let avgViableCells = totalLive / 4;
		let viableCellPercentage = totalLive / totalCells;
		let viableCellDensity = avgViableCells * 10000 * dilutionFactor;
		totalData.push([liveCells, deadCells, avgViableCells, viableCellPercentage, viableCellDensity]);
	}
	let totalViableCellPercentage = totalViableCellDensity = 0;
	for (t = 0; t < replicateNum; t++) {
		if (totalData[t][0].length == 0) filledReplicates--;
		if (!isNaN(totalData[t][3])) {
			totalViableCellPercentage += totalData[t][3];
		}
		if (totalData[t][4] != 0) {
			totalViableCellDensity += totalData[t][4];
		}
	}
	let avgViableCellPercentage = totalViableCellPercentage / filledReplicates;
	let avgViableCellDensity = totalViableCellDensity / filledReplicates;
	let formattedAvgViableCellDensity = (avgViableCellDensity.toPrecision(5)).replace('e+', '&times;10<sup>')+'</sup>cells/mL';
	document.getElementById('pOutput').innerHTML = `${(avgViableCellPercentage*100).toPrecision(5)}%`;
	document.getElementById('dOutput').innerHTML = formattedAvgViableCellDensity;
	console.log(avgViableCellPercentage);
}

function init () {
	let master = document.getElementById('master');
	initHeader(master);
	initBody(master);
	initFooter(master);
}

function initHeader(elem) {
	let header = `<div class='header flex-container'><span>cyto-helper</span></div>`;
	elem.innerHTML += header;
}

function initBody(elem) {
	for (t = 0; t < replicateNum; t++) {
		let div = document.createElement('div');
		div.classList.add('table');
		div.classList.add('flex-container');
		let table = document.createElement('table');
		for (r = 0; r < 4; r++) {
			let row = table.insertRow(-1);
			for (c = 0; c < 2; c++) {
				let cell = row.insertCell(-1);
				let input = document.createElement('input');
				input.type = 'number';
				input.id = `t${t}r${r}c${c}`;
				if (r % 2 == 0){
					input.classList.add('live');
					input.placeholder = 'Live';
				} else { 
					input.classList.add('dead');
					input.placeholder = 'Dead';
				}
				input.addEventListener('focus', compute);
				cell.appendChild(input);
			}
		}
		div.appendChild(table);
		elem.appendChild(div);
	}
}

function initFooter(elem) {
	let footer = 
	`<div class="result flex-container">
		<div>Average % viable cells:<br><span id='pOutput'>NIL</span></div>
		<div>Average viable cell density:<br><span id='dOutput'>NIL</span></div>
	</div>`;
	elem.innerHTML += footer;
}

function detectKeyDown(e) {
	let x = e.which | e.keyCode;
	if (x == 9) {
		// Tab is being pressed
		compute();
	}
}


function sumArray(arr) {
	if (arr.length == 0) return 0;
	else return arr.reduce((t,n)=>{return t+n});
}

function computeViableCellsPercentage(liveCells, deadCells) {
	let totalLive = sumArray(liveCells);
	let totalCells = totalLive + sumArray(deadCells);
	return totalLive / totalCells;
}