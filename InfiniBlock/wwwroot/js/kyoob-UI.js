var blocktip;
var stringtype;
function tipmode() {
	var blockstream = "https://blockstream.info/api/";
	//GET block tip
	//function gettipinfo(blocktip, hash, merkleroot) {
	//	$.get(blockstream + "blocks/tip/height", function (data) {
	//		blocktip = `${data}`;
	//		document.getElementById('blocksTB').value = blocktip;
	//		console.log(blocktip);

	//		//GET Root and Hash of TIP
	//		$.get(blockstream + "block-height/" + blocktip, function (data) {
	//			hash = `${data}`;
	//			$.get(blockstream + "block/" + hash, function (block) {
	//				merkleroot = `${block.merkle_root}`;
	//				var timestamp = `${block.timestamp}`;
	//				var ts = timestamp.toString();
	//				var info = `Now Playing: Height ${block.height}	Timestamp: ${ts}<br>				
	//					Merkle Root: ${block.merkle_root}<br>
	//					Hash: ${hash}<br>`;
	//				$(".blockinfo").html(info);

	//				switch (stringtype) {

	//					case "root":
	//						document.getElementById('blockTB').value = merkleroot;
	//						document.getElementById('stringTB').value = merkleroot;
	//						break;
	//					case "hash":
	//						document.getElementById('blockTB').value = hash;
	//						document.getElementById('stringTB').value = hash;
	//						break;
	//				}

	//			});
	//		});
	//	});


	//	return blocktip;
	//}
	//var t = gettipinfo(blocktip);

	//var tipstring = document.getElementById("blockTB").value;
	//console.log(t);





}




function heightplus100k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 100000 + parseInt(h, 10);
	getBlockInfo(h);

}
function heightplus10k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 10000 + parseInt(h, 10);
	getBlockInfo(h);
}
function heightplus1k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 1000 + parseInt(h, 10);
	getBlockInfo(h);
}
function heightplus100() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 100 + parseInt(h, 10);
	getBlockInfo(h);

}
function heightplus10() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = 10 + parseInt(h, 10);
	getBlockInfo(h);
}
function nextheight() {
	var h = document.getElementById("searchTB").value;
	h++;
	document.getElementById("searchTB").value = h;
	getBlockInfo(h);

}
//Genesis
function genesis() {
	var h = 0;
	document.getElementById("searchTB").value = h;
	getBlockInfo(h);

}
//previous height
function prevheight() {
	var h = document.getElementById("searchTB").value;
	h--;
	document.getElementById("searchTB").value = h;
	getBlockInfo(h);


}
function heightminus100k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 100000;
	getBlockInfo(h);
}
function heightminus10k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 10000;
	getBlockInfo(h);
}
function heightminus1k() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 1000;
	getBlockInfo(h);
}
function heightminus100() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 100;
	getBlockInfo(h);
}
function heightminus10() {
	var h = document.getElementById("searchTB").value;
	document.getElementById("searchTB").value = parseInt(h, 10) - 10;
	getBlockInfo(h);
}



