AFRAME.registerSystem("socialvr-barge", {
  init() {
    this.barge = null;

    console.log("[Social VR] Barge System - Initialized")
  },

  register(el) {
    if (this.barge != null) {
      this.barge.remove();
    }
    this.barge = el;
  },

  unregister() {
    this.barge = null;
  },
});
