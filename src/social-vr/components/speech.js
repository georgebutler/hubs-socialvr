import { Vector3 } from "three";

AFRAME.registerComponent("socialvr-speech", {
    schema: {
        width: { type: "number", default: 0.2 },
        height: { type: "number", default: 0.5 },
    },

    init() {
        this.geometry = new THREE.BoxBufferGeometry(this.data.width, this.data.height, this.data.depth);
        this.material = new THREE.MeshStandardMaterial({ color: "#AAA" });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.el.setObject3D("mesh", this.mesh);
    },

    remove() {
        this.el.removeObject3D("mesh");
    },

    tick(t, dt) {
    }
})
