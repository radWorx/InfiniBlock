function babc(stringTB) {

    // BA -----------------------------------------------------------------------------
    var audio = document.querySelector("audio");
    var synth = new Tone.MembraneSynth().toMaster();
    var actx = Tone.context;
    var dest = actx.createMediaStreamDestination();
    var recorder = new MediaRecorder(dest.stream);
    var pp = document.getElementById("playpads");
    var gw = document.getElementById("getwallpaper");
    var blockinfostring = document.getElementById("stringTB").value;
    //blockinfostring.value = stringTB;
    pp.disabled = false;
    gw.disabled = false;
    synth.connect(dest);
    synth.toMaster();
    recorder.start();
    var chunks = [];
    var start = 0;
    var end = start + 2;
    var timeout;
    function stoptimeout() {
        clearTimeout(timeout);
    }
    function slicestrg() {
        var s = blockinfostring;
        var slice = s.slice(start, end);
        return slice;
    }
    function nextslice() {
        var nextstart = start++;
        var nextend = end++;
        var nextindex = slicestrg(nextstart, nextend);
        return nextindex;
    }
    function playstr() {
        var s = slicestrg();
        var n = nextslice();
        try {
            synth.triggerAttackRelease(s, "4n");
        }
        catch (err) {
            //    //
        }
        //$(".card").css("box-shadow", "0px 10px 20px" + "#" + s + n);
        //$("body").css("background-color", "#" + s + n);
        //$(".modal-body").css("background-color", "#" + s + n);
        //$(".modal-content").css("box-shadow", "0px 10px 20px" + "#" + s + n);

    }
    function playseq() {
        var n = nextslice();
        timeTime = 120;
        timeout = setTimeout(playseq, timeTime);
        playstr();
        if (n === "") {
            stoptimeout();
            recorder.stop();
        }

    }
    recorder.ondataavailable = function (e) {
        chunks.push(e.data);

    };
    recorder.onstop = function () {

        var blob = new Blob(chunks, { type: 'audio/mpeg' });
        audio.src = URL.createObjectURL(blob);
        blob.name = stringTB;
    };
    playseq();

    // BA --------------------------------------------------------------------------
    // BC --------------------------------------------------------------------------
    pp.addEventListener('click', makeWallpaperModal);
    gw.addEventListener('click', getWallpaper);
    function makeWallpaperModal() {
        $("canvas").remove();
        var payid = stringTB;
        var cstart = 0;
        var cend = cstart + 6;
        var ht = 50;
        var wt = 50;
        for (let i = 0; i < 64; i++) {
            var cp = document.getElementById("colorpadsModal");
            var canvas = document.createElement("canvas");
            var color = payid.slice(cstart, cend);
            var ctx = canvas.getContext("2d");
            canvas.addEventListener('mouseover', playcolor);
            canvas.addEventListener('click', playcolor);
            canvas.id = color;
            canvas.width = wt;
            canvas.height = ht;
            ctx.fillStyle = "#" + color;
            ctx.fillRect(0, 0, wt, ht);
            canvas.innerHTML = color;
            cp.appendChild(canvas);
            cstart++;
            cend++;
        }

    }
    function playcolor() {
        var colorstart = 0;
        var colorend = colorstart + 2;
        var c = this.id;
        var s = c.slice(colorstart, colorend);
        try {
            var synth = new Tone.Synth().toMaster();
            synth.triggerAttackRelease(s, "4n");
            $(".colorpadsModal").css("background-color", "#" + s);
        }
        catch (err) {
            this.height = 0;
            this.weight = 0;
            synth.dispose();
        }
    }

    function getWallpaper() {

        var element = document.getElementById("colorpadsModal");

        html2canvas(element, { backgroundColor: "null", imageTimeout: "0" }).then(canvas => {
            $("canvas").remove();
            element.appendChild(canvas);
        });

    }


    // SET COLOR-----------------------------------------------------------------------
    function colorloop(bc) {
        var start = 0;
        var s = slicestrg();
        var n = nextslice();
        var blockcolors = blockinfostring.slice(start, start + 6);


        console.log("bitcoincolor = " + bitcoincolor);

        while (start < blockinfostring.length) {

            if (blockcolors.length >= 2) {
                var bitcoincolor = "#" + blockcolors;
            }
            else {
                bitcoincolor = "#ffffff";
            }


            start++;
        }


        return bitcoincolor;
    }
    // BC --------------------------------------------------------------------------
    // Babylon ---------------------------------------------------------------------


    var canvas = document.getElementById("renderCanvas");

    var engine = null;
    var scene = null;
    var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        var camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, 1.2, 300, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, true);

        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.groundColor = new BABYLON.Color3(.4, .4, .4);
        var basecolor = "#000000";
        var color = new BABYLON.Color3(1, 0, 0);
        var innercolor = "#c397f7";
       
        
        
        

        var cubecolor = colorloop();
        console.log(cubecolor);

        // INNER CUBE---------------------------------------------------------------------
        var innerBox = BABYLON.MeshBuilder.CreateBox("innerBox", { height: 20, width: 20, depth: 20 }, scene);
        innerBox.position = new BABYLON.Vector3(0,60, 0);
        var mat0 = new BABYLON.StandardMaterial("mat0", scene);
        mat0.diffuseColor = new BABYLON.Color3.FromHexString(cubecolor);
        innerBox.material = mat0;


        //OUTER CUBE------------------------------------------------------------------
        var OnitsBoxMaker = function (name, size, material, edges, scene) {
            var gizmo = BABYLON.Mesh.CreateBox(name, 0, scene, true);         
            //// gizmo.showBoundingBox = true;
            //gizmo.isPickable = false;

            gizmo.slaves = [];
            for (var i = 0; i < 6; i++) {
                gizmo.slaves[i] = BABYLON.Mesh.CreatePlane(name + i, size, scene, true);
                gizmo.slaves[i].parent = gizmo;
                if (edges) {
                    gizmo.slaves[i].enableEdgesRendering();
                    gizmo.slaves[i].edgesWidth = 25.0;
                    gizmo.slaves[i].edgesColor = new BABYLON.Color4(0, 0, 0, 1);
                }
                gizmo.slaves[i].material = new BABYLON.StandardMaterial("mat", scene);
                gizmo.slaves[i].material.diffuseColor = new BABYLON.Color3.FromHexString(cubecolor);
                gizmo.slaves[i].material.alpha = 1;
                var texture = new BABYLON.Texture("images/map2.png", scene);
                gizmo.slaves[i].material.opacityTexture = texture;
            }

            gizmo.slaves[0].position = new BABYLON.Vector3(-size / 2, 75 , 0);
            gizmo.slaves[0].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

            gizmo.slaves[1].position = new BABYLON.Vector3(0, 75, size / 2);
            gizmo.slaves[1].rotation = new BABYLON.Vector3(0, Math.PI, 0);

            gizmo.slaves[2].position = new BABYLON.Vector3(size / 2, 75, 0);
            gizmo.slaves[2].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            // TOP
            gizmo.slaves[3].position = new BABYLON.Vector3(0, 100, 0);
            gizmo.slaves[3].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            //BOTTOM
            gizmo.slaves[4].position = new BABYLON.Vector3(0, size, 0);
            gizmo.slaves[4].rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);

            gizmo.slaves[5].position = new BABYLON.Vector3(0, 75, -size / 2);
            gizmo.slaves[5].rotation = new BABYLON.Vector3(0, 0, 0);

            //gizmo.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, -size / 2), false);

            return gizmo;
        };

        //-----------------------------------------------------------------------------


        // BASE-------------------------------------------------------------------------
        var BaseBoxMaker = function (name, size, material, edges, scene) {
            var gizmo = BABYLON.Mesh.CreateBox(name, 0, scene, true);
            //// gizmo.showBoundingBox = true;
            //gizmo.isPickable = false;

            gizmo.slaves = [];
            for (var i = 0; i < 6; i++) {
                gizmo.slaves[i] = BABYLON.Mesh.CreatePlane(name + i, size, scene, true);
                gizmo.slaves[i].parent = gizmo;
                if (edges) {
                    gizmo.slaves[i].enableEdgesRendering();
                    gizmo.slaves[i].edgesWidth = 25.0;
                    gizmo.slaves[i].edgesColor = new BABYLON.Color4(0, 0, 0, 1);
                }
                gizmo.slaves[i].material = new BABYLON.StandardMaterial("mat", scene);
                gizmo.slaves[i].material.diffuseColor = new BABYLON.Color3.FromHexString(basecolor);
                gizmo.slaves[i].material.alpha = 1;
                
            }

            gizmo.slaves[0].position = new BABYLON.Vector3(-size / 2, size / 2, 0);
            gizmo.slaves[0].rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

            gizmo.slaves[1].position = new BABYLON.Vector3(0, size / 2, size / 2);
            gizmo.slaves[1].rotation = new BABYLON.Vector3(0, Math.PI, 0);

            gizmo.slaves[2].position = new BABYLON.Vector3(size / 2, size / 2, 0);
            gizmo.slaves[2].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            // TOP
            gizmo.slaves[3].position = new BABYLON.Vector3(0, size, 0);
            gizmo.slaves[3].rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            //BOTTOM
            gizmo.slaves[4].position = new BABYLON.Vector3(0, size, 0);
            gizmo.slaves[4].rotation = new BABYLON.Vector3(-Math.PI / 2, 0, 0);

            gizmo.slaves[5].position = new BABYLON.Vector3(0, size / 2, -size / 2);
            gizmo.slaves[5].rotation = new BABYLON.Vector3(0, 0, 0);

            //gizmo.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, -size / 2), false);

            return gizmo;
        };


        var box = OnitsBoxMaker("mybox", 50, null, true, scene);
        //console.log("box = " + box); 

        var basebox = BaseBoxMaker("mybase", 50, null, true, scene);
         //console.log("box = " + box);


        // Our built-in 'ground' shape.
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 150, height: 175 }, scene);
        var backgroundMaterial = new BABYLON.BackgroundMaterial("backgroundMaterial", scene);
        backgroundMaterial.diffuseTexture = new BABYLON.Texture("images/brekkie-art.jpg", scene);
        backgroundMaterial.diffuseTexture.uScale = 1.0;
        backgroundMaterial.diffuseTexture.vScale = 1.0;
        backgroundMaterial.shadowLevel = 0.4;
        ground.material = backgroundMaterial;

        scene.onPointerObservable.add(function (evt) {
            switch (evt.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:

                     console.log("evt.pickInfo:", evt.pickInfo);
                    if (evt.pickInfo.pickedMesh) {
                        console.log("evt.pickInfo.pickedMesh:", evt.pickInfo.pickedMesh.name);
                        //evt.pickInfo.pickedMesh.material.diffuseColor = BABYLON.Color3.Random();
                       
                    }

                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    break;
                case BABYLON.PointerEventTypes.POINTERTAP:
                    break;
                case BABYLON.PointerEventTypes.POINTERDOUBLETAP:
                    break;
            }
        });

        return scene;
    };

    engine = createDefaultEngine();
    if (!engine) throw 'engine should not be null.';
    scene = createScene();

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

    // Babylon ---------------------------------------------------------------------


}