import { Vector3 } from "three";

AFRAME.registerComponent("socialvr-speech", {
    schema: {
        width: { type: "number", default: 4 },
        height: { type: "number", default: 1 },
    },

    init() {
        this.geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.depth);
        this.material = new THREE.MeshStandardMaterial({ color: "#AAA" });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.el.setObject3D("mesh", this.mesh);

            // Client
    this.el.addEventListener("startSpeechEvent", this.startBarge.bind(this));
    this.el.addEventListener("stopSpeechEvent", this.stopBarge.bind(this));

    // Broadcast Event
    NAF.connection.subscribeToDataChannel("startSpeechEvent", this._startBarge.bind(this));
    NAF.connection.subscribeToDataChannel("stopSpeechEvent", this._stopBarge.bind(this));
    },

    remove() {
        this.el.removeObject3D("mesh");
    },

    tick(t, dt) {
    },

    _startSpeech(senderId, dataType, data, targetId) {
        this.system.logEvent("startSpeech", data);

        const activeOrb = this.system.activeOrbs;
        const playerInfo = this.system.getPlayerInfo(data.speaker);
        const newOrb = this.system.spawnOrb(MIN_ORB_SIZE, this.system.playerInfoToColor(playerInfo));

        if (activeOrb) {
            activeOrb.el.setAttribute("finished");
        }

        this.system.activeSpeechOrbs[data.speaker] = newOrb;
    },

    _stopSpeech(senderId, dataType, data, targetId) {
        
    },

    startSpeech() {
        this._startSpeech(null, null, {});
        NAF.connection.broadcastData("startSpeech", {});
    },

    stopSpeech() {
        this._stopSpeech(null, null, {});
        NAF.connection.broadcastData("stopSpeech", {});
    }
})
