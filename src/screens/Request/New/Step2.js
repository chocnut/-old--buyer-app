import React from "react";
import PhotoUpload from "./PhotoUpload";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export default function Step2() {
  return (
    <ActionSheetProvider>
      <PhotoUpload />
    </ActionSheetProvider>
  );
}
