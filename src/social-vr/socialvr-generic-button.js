import { SOUND_SNAP_ROTATE } from "../systems/sound-effects-system";

function getButtonColor(buttonState) {
  if (!buttonState.active) return "gray";
  if (buttonState.hovered && buttonState.clicked) return "#d3f8d3";
  if (buttonState.hovered && !buttonState.clicked) return "lightgreen";
  if (buttonState.clicked) return "#7659ad";
  return "green";
}

function rerenderButton(buttonEl, buttonState) {
  const color = getButtonColor(buttonState);
  buttonEl.setAttribute("material", { color: color, shader: "flat" });
}

AFRAME.registerComponent("socialvr-generic-button", {
  schema: {
    active: { type: "boolean", default: true },
    clicked: { type: "boolean", default: false },
    hovered: { type: "boolean", default: false }
  },

  init() {
    const self = this;

    // set up event handlers
    this.onClick = this.onClick.bind(this);
    this.el.object3D.addEventListener("interact", this.onClick);
    this.el.object3D.addEventListener("hovered", function() {
      console.log("hovered");
      self.data.hovered = true;
      rerenderButton(self.el, self.data);
    });
    this.el.object3D.addEventListener("unhovered", function() {
      console.log("unhovered");
      self.data.hovered = false;
      rerenderButton(self.el, self.data);
    });
  },

  onClick() {
    console.log("button clicked", this.el);
    NAF.connection.broadcastData("genericButtonClick", { id: this.el.id });
    handleGenericButtonClick(null, null, { id: this.el.id });
    //this.el.emit("genericButtonClick");
    this.el.sceneEl.systems["hubs-systems"].soundEffectsSystem.playPositionalSoundFollowing(
      SOUND_SNAP_ROTATE,
      this.el.object3D
    );
  }
});

export function makeButton(id) {
  const buttonEl = document.createElement("a-box");
  buttonEl.id = id;
  buttonEl.setAttribute("depth", 0.05);
  buttonEl.setAttribute("height", 0.2);
  buttonEl.setAttribute("width", 0.2);
  buttonEl.setAttribute("material", { color: "#3B56DC", shader: "flat" });
  buttonEl.setAttribute("socialvr-generic-button", "");
  buttonEl.setAttribute("is-remote-hover-target", "");
  buttonEl.setAttribute("hoverable-visuals", "");
  buttonEl.setAttribute("tags", "singleActionButton: true");
  buttonEl.setAttribute("css-class", "interactable");
  buttonEl.setAttribute("position", { x: 0, y: 2, z: 0 });

  const textEl = document.createElement("a-entity");
  textEl.setAttribute("text", "value: BUTTON; align: center;");
  textEl.setAttribute("rotation", "0 0 0");
  textEl.setAttribute("position", "0 0 0.025");
  buttonEl.appendChild(textEl);

  const scene = document.querySelector("a-scene");
  scene.appendChild(buttonEl);
}

function handleGenericButtonClick(senderId, dataType, data, targetId) {
  console.log("genericButtonClick", senderId, dataType, data, targetId);
  const buttonEl = document.getElementById(data.id);
  const buttonState = buttonEl.getAttribute("socialvr-generic-button");
  buttonState.clicked = !buttonState.clicked;
  rerenderButton(buttonEl, buttonState);
}

NAF.connection.subscribeToDataChannel("genericButtonClick", handleGenericButtonClick);
