import { waitForDOMContentLoaded } from "../utils/async-utils";

import "./components/barge";
import "./components/barge-button-reset";
import "./components/barge-button-stop";
import "./components/barge-button-go";
import "./systems/barge";

function CreateBarge() {
  console.log("[Social VR] Barge System - Created");

  const scene = document.querySelector("a-scene");
  const el = document.createElement("a-entity");

  el.setAttribute("socialvr-barge", "");
  el.addEventListener("barge-registered", function (event) {
    const el = event.detail.bargeEnt.el;
    const bargeSpawn = document.querySelector(".BargeSpawn");

    // Reset Button

    /** 
    const buttonResetEl = document.createElement("a-sphere");
    const buttonResetTextEl = document.createElement("a-entity");

    buttonResetEl.setAttribute("radius", "0.15");
    buttonResetEl.setAttribute("material", "color: #3B56DC");
    buttonResetEl.setAttribute("socialvr-barge-button-reset", "");
    buttonResetEl.setAttribute("is-remote-hover-target", "");
    buttonResetEl.setAttribute("hoverable-visuals", "");
    buttonResetEl.setAttribute("tags", "singleActionButton: true");
    buttonResetEl.setAttribute("css-class", "interactable");
    buttonResetEl.setAttribute("position", {
      x: el.object3D.position.x + (2 - 0.2),
      y: el.object3D.position.y + 1,
      z: el.object3D.position.z
    });

    buttonResetTextEl.setAttribute("text", "value: RESET; align: center;");
    buttonResetTextEl.setAttribute("rotation", "0 270 0");
    buttonResetTextEl.setAttribute("position", "0 0.2 0");

    buttonResetEl.appendChild(buttonResetTextEl);
    el.appendChild(buttonResetEl);
    */

    // Go Button

    /** 
    const buttonGoEl = document.createElement("a-sphere");
    const buttonGoTextEl = document.createElement("a-entity");

    buttonGoEl.setAttribute("radius", "0.15");
    buttonGoEl.setAttribute("material", "color: #32CD32");
    buttonGoEl.setAttribute("socialvr-barge-button-go", "");
    buttonGoEl.setAttribute("is-remote-hover-target", "");
    buttonGoEl.setAttribute("hoverable-visuals", "");
    buttonGoEl.setAttribute("tags", "singleActionButton: true");
    buttonGoEl.setAttribute("css-class", "interactable");
    buttonGoEl.setAttribute("position", {
      x: el.object3D.position.x + (2 - 0.2),
      y: el.object3D.position.y + 1,
      z: el.object3D.position.z + 1 // Right
    });

    // Go Button - Text
    buttonGoTextEl.setAttribute("text", "value: GO; align: center;");
    buttonGoTextEl.setAttribute("rotation", "0 270 0");
    buttonGoTextEl.setAttribute("position", "0 0.2 0");

    buttonGoEl.appendChild(buttonGoTextEl);
    el.appendChild(buttonGoEl);
    */

    // Stop Button

    /** 
    const buttonStopEl = document.createElement("a-sphere");
    const buttonStopTextEl = document.createElement("a-entity");

    buttonStopEl.setAttribute("radius", "0.15");
    buttonStopEl.setAttribute("material", "color: #FF0000");
    buttonStopEl.setAttribute("socialvr-barge-button-stop", "");
    buttonStopEl.setAttribute("is-remote-hover-target", "");
    buttonStopEl.setAttribute("hoverable-visuals", "");
    buttonStopEl.setAttribute("tags", "singleActionButton: true");
    buttonStopEl.setAttribute("css-class", "interactable");
    buttonStopEl.setAttribute("position", {
      x: el.object3D.position.x + (2 - 0.2),
      y: el.object3D.position.y + 1,
      z: el.object3D.position.z - 1 // Left
    });

    // Stop Button - Text
    buttonStopTextEl.setAttribute("text", "value: STOP; align: center;");
    buttonStopTextEl.setAttribute("rotation", "0 270 0");
    buttonStopTextEl.setAttribute("position", "0 0.2 0");

    buttonStopEl.appendChild(buttonStopTextEl);
    el.appendChild(buttonStopEl);
    */

    if (bargeSpawn) {
      el.setAttribute("position", bargeSpawn.getAttribute("position"));
    }
  });

  scene.appendChild(el);
}

function CreateDST() {
  console.log("[Social VR] DST System - Created");
}

function CreateSpeechVis() {
  console.log("[Social VR] Speech Vis System - Created");
}

waitForDOMContentLoaded().then(() => {
  const DSTTableExists = document.querySelectorAll(".DSTTable").length > 0;
  const CVMarkerExists = document.querySelectorAll(".conversationVis").length > 0;

  if (DSTTableExists) {
    CreateDST();
  } else {
    CreateBarge();
  }

  if (CVMarkerExists) {
    CreateSpeechVis();
  }
});
