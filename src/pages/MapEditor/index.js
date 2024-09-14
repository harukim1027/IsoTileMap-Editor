import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Tile from "../../components/Tile";
import {
  EditorContainer,
  MapEditorSection,
  SpritesSection,
} from "../../styles/MapEditorStyles";
import Sprites from "../../components/Sprites";

const MapEditor = () => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [tiles, setTiles] = useState([]);

  const handleTileSelect = (tileImage) => {
    setSelectedTile(tileImage);
  };

  const handleTilePlace = (position) => {
    if (selectedTile) {
      setTiles([...tiles, { image: selectedTile, position }]);
    }
  };

  return (
    <EditorContainer>
      <SpritesSection>
        <Sprites onTileSelect={handleTileSelect} />
      </SpritesSection>

      <MapEditorSection>
        <h2>Map Editor</h2>
        <Canvas onClick={(e) => handleTilePlace([e.point.x, 0, e.point.z])}>
          <OrbitControls />
          {tiles.map((tile, index) => (
            <Tile key={index} tile={tile} />
          ))}
        </Canvas>
      </MapEditorSection>
    </EditorContainer>
  );
};

export default MapEditor;
