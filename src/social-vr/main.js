import { waitForDOMContentLoaded } from "../utils/async-utils";

import "./components/barge";
import "./components/barge-button"
import "./systems/barge";

function CreateDST() {
  console.log("[Social VR] DST System - Created");
}

function CreateSpeechVis() {
  console.log("[Social VR] Speech Vis System - Created");
}

function CreateBarge() {
  console.log("[Social VR] Barge System - Created");

  const bargeEl = document.createElement("a-entity");
  bargeEl.setAttribute("socialvr-barge", "");
  return bargeEl;
}

function InitPhases() {
  console.log("[Social VR] Toggle System - Created");

  const phase1 = document.querySelector(".phase-1");

  if (phase1) {
    console.log("[Social VR] Toggle System - Found Phase 1!");

    for (let i = 0; i < phase1.children.length; i++) {
      phase1.children[i].setAttribute("visible", false);
    }
  } else {
    console.warn("[Social VR] Toggle System - Could not find Phase 1!");
  }

  /*
  window.beginPhaseTesting = function() {
    if (phase <= 0) {
      phase = 1;
      const phase1 = document.querySelector(".phase-1");

      if (phase1) {
        for (let i = 0; i < phase1.children.length; i++) {
          phase1.children[i].setAttribute("visible", true);
        }

        console.log("[Social VR] Toggle System - You are now on Phase 1.");
      } else {
        console.warn("[Social VR] Toggle System - Could not find Phase 1!");
      }
    } else {
      console.warn("[Social VR] Toggle System - You have already begun the phase testing.");
    }
  };
  */
}

function _TogglePhase1() {
  const phase1 = document.querySelector(".phase-1");

  if (phase1) {
    for (let i = 0; i < phase1.children.length; i++) {
      phase1.children[i].setAttribute("visible", true);
    }
  } else {
    console.warn("[Social VR] Toggle System - Could not find Phase 1!");
  }
}

waitForDOMContentLoaded().then(() => {
  const scene = document.querySelector("a-scene");

  const DSTTableExists = document.querySelectorAll(".DSTTable").length > 0;
  const CVMarkerExists = document.querySelectorAll(".conversationVis").length > 0;
  let phase = 0;

  if (DSTTableExists) {
    CreateDST();
  } else {
    const bargeEl = CreateBarge();
    scene.appendChild(bargeEl);
  }

  if (CVMarkerExists) {
    CreateSpeechVis();
  }

  const environmentScene = document.querySelector("#environment-scene");

  environmentScene.addEventListener("model-loaded", ({ detail: { model } }) => {
    InitPhases();

    // Client
    environmentScene.addEventListener("advancePhaseEvent", function() {
      _TogglePhase1();
      NAF.connection.broadcastData("advancePhase", {});
    });

    // Broadcast Event
    NAF.connection.subscribeToDataChannel("advancePhase", _TogglePhase1);

    window.startPhaseTesting = function() {
      phase = 1;
      environmentScene.emit("advancePhaseEvent");
      console.log(`[Social VR] Toggle System - Current Phase: ${phase}`);
    };
  });
});
