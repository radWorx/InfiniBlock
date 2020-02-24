//GET Blockinfo
function getBlockInfo(searchstr) {    
    var blockstream = "https://blockstream.info/api/";
    var stringTB = document.getElementById("stringTB").value;
    function getstring(stringtype, merkleroot, hash, getblocktip) {
        searchstr = document.getElementById("searchTB").value;
        stringtype = document.getElementById("stringtype").value;
        //GET block tip
        $.get(blockstream + "blocks/tip/height", function (data) {
            getblocktip = `${data}`;
            document.getElementById('blocksTB').value = "Highest Block: " + getblocktip;
            if (searchstr < 0) {
                alert("TOO LOW! Please select Height 0 to " + getblocktip);
                document.getElementById("searchTB").value = getblocktip;
            }
            if (searchstr > parseInt(getblocktip)) {
                alert("TOO HIGH! Please select Height 0 to " + getblocktip);
                document.getElementById("searchTB").value = getblocktip;
            }
        });

        //GET Root and Hash of Height
        $.get(blockstream + "block-height/" + searchstr, function (data) {
            hash = `${data}`;
            $.get(blockstream + "block/" + hash, function (block) {
                merkleroot = `${block.merkle_root}`;
                var timestamp = `${block.timestamp}`;
                var ts = timestamp.toString();
                var info = `Now Playing: Height ${block.height}	Timestamp: ${ts}<br>				
				Merkle Root: ${block.merkle_root}<br>
						Hash: ${hash}<br>`;
                $(".blockinfo").html(info);

                switch (stringtype) {

                    case "root":
                        document.getElementById('blockTB').value = merkleroot;
                        document.getElementById('stringTB').value = merkleroot;
                        break;
                    case "hash":
                        document.getElementById('blockTB').value = hash;
                        document.getElementById('stringTB').value = hash;
                        break;
                }
            });
        });


    }
    getstring(searchstr);
    kyoob();
   
    
   }

