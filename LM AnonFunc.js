    createAnonFunction("LIBERTYMUTUAL", function() {
        ss.PLAYERS.forEach(PLAYER=>{
            if (PLAYER.hasOwnProperty("ws")) {
                ss.MYPLAYER = PLAYER;
            }
        });

        H.actor = findKeyWithProperty(ss.MYPLAYER,H.mesh);

        let TARGETED;
        let CROSSHAIRS = new BABYLON.Vector3();
        CROSSHAIRS.copyFrom(ss.MYPLAYER[H.actor][H.mesh].position);
        const horizontalOffset = Math.sin(ss.MYPLAYER[H.actor][H.mesh].rotation.y);
        const verticalOffset = Math.sin(-ss.MYPLAYER[H.pitch]);
        CROSSHAIRS.x += horizontalOffset;
        CROSSHAIRS.y += verticalOffset + 0.4;
        CROSSHAIRS.z += Math.cos(ss.MYPLAYER[H.actor][H.mesh].rotation.y);

        const timecode = Date.now();
        let minValue = 99999;
        ss.PLAYERS.forEach(PLAYER=>{
            if (PLAYER) {
                PLAYER.timecode = timecode;
                if ((PLAYER!==ss.MYPLAYER) && ((ss.MYPLAYER.team==0)||(PLAYER.team!==ss.MYPLAYER.team))) {
                    if ((!PLAYER.generatedESP)) {
                        const boxSize = {width: 0.4, height: 0.65, depth: 0.4};
                        const vertices = [
                            new BABYLON.Vector3(-boxSize.width / 2, 0, -boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0, -boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0 + boxSize.height, -boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0 + boxSize.height, -boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0, boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0, boxSize.depth / 2),
                            new BABYLON.Vector3(boxSize.width / 2, 0 + boxSize.height, boxSize.depth / 2),
                            new BABYLON.Vector3(-boxSize.width / 2, 0 + boxSize.height, boxSize.depth / 2),
                        ];
                        const lines = [];
                        for (let i = 0; i < 4; i++) {
                            lines.push([vertices[i], vertices[(i + 1) % 4]]);
                            lines.push([vertices[i + 4], vertices[(i + 1) % 4 + 4]]);
                            lines.push([vertices[i], vertices[i + 4]]);
                        }
                        const box = BABYLON.MeshBuilder.CreateLineSystem(getScrambled(), { lines }, PLAYER[H.actor].scene);
                        box.renderingGroupId = 1;
                        box.parent = PLAYER[H.actor][H.mesh];
                        const tracers = BABYLON.MeshBuilder.CreateLines('lines', { points: [PLAYER[H.actor][H.mesh].position, CROSSHAIRS] }, PLAYER[H.actor].scene);
                        tracers.alwaysSelectAsActiveMesh = true;
                        tracers.renderingGroupId = 1;

                        PLAYER.box = box;
                        PLAYER.tracers = tracers;
                        PLAYER.generatedESP = true;
                        ESPArray.push([box, tracers, PLAYER]);
                    }
                    PLAYER.tracers.setVerticesData(BABYLON.VertexBuffer.PositionKind, [CROSSHAIRS.x, CROSSHAIRS.y, CROSSHAIRS.z, PLAYER[H.actor][H.mesh].position.x, PLAYER[H.actor][H.mesh].position.y, PLAYER[H.actor][H.mesh].position.z]);
                    PLAYER.box.visibility = enableESP;
                    PLAYER.tracers.visibility = (PLAYER[H.playing] && enableTracers);

                    const distance = Math.hypot(PLAYER[H.x]-ss.MYPLAYER[H.x], PLAYER[H.y]-ss.MYPLAYER[H.y], PLAYER[H.z]-ss.MYPLAYER[H.z]);

                    if (distance < minValue) {
                        TARGETED = PLAYER;
                        minValue = distance;
                    }
                }
            }
            if (RMB && TARGETED && TARGETED[H.playing]) {
                const directionVector={
                    [H.x]: TARGETED[H.x]-ss.MYPLAYER[H.x],
                    [H.y]: TARGETED[H.y]-ss.MYPLAYER[H.y]-0.05,
                    [H.z]: TARGETED[H.z]-ss.MYPLAYER[H.z],
                };
                ss.MYPLAYER[H.yaw]=F.calculateYaw(directionVector);
                ss.MYPLAYER[H.pitch]=F.calculatePitch(directionVector);
            }
        });
        for ( let i=0;i<ESPArray.length;i++) {
            if (ESPArray[i][2] && ESPArray[i][2].timecode==timecode) {
            } else {
                ESPArray[i][0].dispose();
                ESPArray[i][1].dispose();
                ESPArray.splice(i,1);
            }
        }
    });

    createAnonFunction("setPrecision", function (value) {
        return Math.floor(value * 8192) / 8192;
    });

    createAnonFunction("calculateYaw", function (pos) {
        return F.setPrecision(Math.mod(Math.atan2(pos[H.x],pos[H.z]), Math.PI2));
    });

    createAnonFunction("calculatePitch", function (pos) {
        return F.setPrecision(-Math.atan2(pos[H.y],Math.hypot(pos[H.x],pos[H.z]))%1.5);
    });
