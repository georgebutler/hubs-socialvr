AFRAME.registerSystem("socialvr-speech", {
  init() {
    this.activeOrbs = {};
    this.eventLog = [];

    console.log("[Social VR] Speech System - Initialized");
  },

  sessionIDToColor(sessionID) {
    return "#" + sessionID.substring(0, 6);
  },

  getPlayerInfo(sessionID) {
    const playerInfos = APP.componentRegistry["player-info"];

    return playerInfos.find(info => info.playerSessionId === sessionID);
  },

  // keys are "Avatar listing sid"s from Approved Avatars admin tab
  playerInfoToColor(playerInfo) {
    const avatarURL = playerInfo.data.avatarSrc;
    const colorsByAvatar = {
      WUvZgGK: "lightskyblue",
      qpOOt9I: "hotpink",
      "2s2UuzN": "red",
      wAUg76e: "limegreen",
      RczWQgy: "#222",
      xb4PVBE: "yellow",
      yw4c83R: "purple",
      "4r1KpVk": "orange",
      bs7pLac: "darkblue"
    };

    for (const avatarSID of Object.keys(colorsByAvatar)) {
      if (avatarURL.includes(avatarSID)) {
        return colorsByAvatar[avatarSID];
      }
    }

    return sessionIDToColor(playerInfo.playerSessionId);
  },

  logEvent(eventType, e) {
    e.eventType = eventType;
    e.timestamp = Date.now();

    this.eventLog.push(e);
  }
});
