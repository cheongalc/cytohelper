function init () {
	let master = document.getElementById('tableMaster');
	let replicateNum = 3;
	for (i = 0; i < replicateNum; i++) {
		let table = document.createElement('table');
		table.id = `t${i}`;
		master.appendChild(table);
		for (r = 0; r < 2; r++) {
			let row = table.insertRow(-1);
			for (c = 0; c < 2; c++) {
				let cell = row.insertCell();
				cell.id = `t${i}r${r}c${c}`;
				cell.classList.add('cell');
				cell.contentEditable = 'true';
			}
		}
	}
}