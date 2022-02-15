import { SOUND_SNAP_ROTATE } from "../../systems/sound-effects-system";

AFRAME.registerComponent("socialvr-barge-button", {
  // start, stop, reset
  schema: {type: "string", default: "start"},

  init: function() {
    this.onClick = this.onClick.bind(this);
    this.el.object3D.addEventListener("interact", this.onClick);
  },

  remove: function() {
    this.el.object3D.removeEventListener("interact", this.onClick);
  },

  onClick: function() {
    this.el.emit(this.data + "BargeEvent");
    this.el.sceneEl.systems["hubs-systems"].soundEffectsSystem.playPositionalSoundFollowing(
      SOUND_SNAP_ROTATE,
      this.el.object3D
    );
  }
});
