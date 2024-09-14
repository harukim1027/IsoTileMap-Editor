import React from "react";
import Sprites from "../../components/Sprites";

const MapEditor = () => {
  return (
    <div className="editor-container">
      <div className="sprites-section">
        <Sprites />
      </div>
      <div className="map-editor-section">
        <h2>Map Editor</h2>
      </div>
    </div>
  );
};

export default MapEditor;
