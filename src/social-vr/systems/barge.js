AFRAME.registerSystem("socialvr-barge", {
  init() {
    this.barge = null;

    console.log("[Social VR] Barge System - Initialized")
  },

  register(ent) {
    if (this.barge != null) {
      this.barge.remove();
    }

    this.barge = ent;
    ent.el.emit("barge-registered", { bargeEnt: ent });
  },

  unregister() {
    this.barge = null;
  }
});
