import React, { useEffect } from "react";

const MicAuth = ({ micPermissionStatus }) => {
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micPermissionStatus(true);
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream to release resources
    };

    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          checkMicrophonePermission();
        } else if (permissionStatus.state === "denied") {
          micPermissionStatus(false);
        } else {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === "granted") {
              checkMicrophonePermission();
            } else {
              micPermissionStatus(false);
            }
          };
        }
      });
  }, []);

  return;
};

export default MicAuth;
