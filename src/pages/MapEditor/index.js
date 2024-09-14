import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { GridHelper } from "three";
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [cameraRotation, setCameraRotation] = useState({
    x: -Math.PI / 18,
    y: Math.PI / 9,
  });
  const [clickStart, setClickStart] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);

  const handleTileSelect = (tile) => {
    setSelectedTile(tile);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setCameraRotation((prev) => ({
          ...prev,
          x: prev?.x - 0.1,
        }));
      } else if (e.key === "ArrowDown") {
        setCameraRotation((prev) => ({
          ...prev,
          x: prev?.x + 0.1,
        }));
      } else if (e.key === "ArrowLeft") {
        setCameraRotation((prev) => ({
          ...prev,
          y: prev?.y - 0.1,
        }));
      } else if (e.key === "ArrowRight") {
        setCameraRotation((prev) => ({
          ...prev,
          y: prev?.y + 0.1,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePlaneDown = (e) => {
    if (!selectedTile) {
      console.warn("타일이 선택되지 않았습니다.");
      return;
    }

    const { point } = e;
    setClickStart(Date.now());
    setIsDragging(false);
    setDragStart({
      x: Math.floor(point?.x * 10) / 10 + 0.5,
      z: Math.floor(point?.z * 10) / 10 + 0.5,
    });
    setDragEnd(null);
    setClickPosition({
      x: Math.floor(point?.x * 10) / 10 + 0.5,
      z: Math.floor(point?.z * 10) / 10 + 0.5,
    });
  };

  const handlePlaneMove = (e) => {
    if (!dragStart || !selectedTile) return;
    const { point } = e;
    const newDragEnd = {
      x: Math.floor(point?.x * 10) / 10 + 0.5,
      z: Math.floor(point?.z * 10) / 10 + 0.5,
    };

    setDragEnd(newDragEnd);

    const dragDistanceX = Math.abs(newDragEnd?.x - dragStart?.x);
    const dragDistanceZ = Math.abs(newDragEnd?.z - dragStart?.z);

    if (dragDistanceX > 0.2 || dragDistanceZ > 0.2) {
      setIsDragging(true);
    }
  };

  const handlePlaneUp = (e) => {
    const clickDuration = Date.now() - clickStart;

    if (clickDuration < 200 && !isDragging && clickPosition) {
      const zPosition =
        selectedTile?.name === "tile1"
          ? 0
          : selectedTile?.name === "tile4"
          ? 1
          : 0.01;
      const newTile = {
        ...selectedTile,
        position: [clickPosition?.x, zPosition, clickPosition?.z],
      };
      setTiles([...tiles, newTile]);
    } else if (dragStart && dragEnd && isDragging) {
      const xMin = Math.min(dragStart?.x, dragEnd?.x);
      const xMax = Math.max(dragStart?.x, dragEnd?.x);
      const zMin = Math.min(dragStart?.z, dragEnd?.z);
      const zMax = Math.max(dragStart?.z, dragEnd?.z);

      let newTiles = [];
      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          const zPosition =
            selectedTile?.name === "tile1"
              ? 0
              : selectedTile?.name === "tile4"
              ? 1
              : 0.01;
          newTiles.push({
            ...selectedTile,
            position: [x, zPosition, z],
          });
        }
      }
      setTiles([...tiles, ...newTiles]);
    }

    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  };

  const DragSelection = () => {
    if (!dragStart || !dragEnd || !isDragging) return null;

    const xMin = Math.min(dragStart?.x, dragEnd?.x);
    const xMax = Math.max(dragStart?.x, dragEnd?.x);
    const zMin = Math.min(dragStart?.z, dragEnd?.z);
    const zMax = Math.max(dragStart?.z, dragEnd?.z);

    const width = xMax - xMin + 1;
    const depth = zMax - zMin + 1;

    return (
      <mesh position={[(xMin + xMax) / 2, 0.01, (zMin + zMax) / 2]}>
        <boxGeometry args={[width, 0.01, depth]} />
        <meshBasicMaterial color="lightblue" transparent={true} opacity={0.5} />
      </mesh>
    );
  };

  return (
    <EditorContainer>
      <SpritesSection>
        <Sprites onTileSelect={handleTileSelect} />
      </SpritesSection>

      <MapEditorSection>
        <Canvas
          style={{ background: "black" }}
          onPointerMissed={() => {
            console.log("3D 객체를 클릭하지 않았습니다.");
          }}
          onPointerUp={handlePlaneUp}>
          <OrthographicCamera
            makeDefault
            position={[6, 5, 10]}
            zoom={50}
            rotation={[cameraRotation?.x, cameraRotation?.y, 0]}
          />
          <primitive object={new GridHelper(20, 20)} />
          <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            onPointerDown={handlePlaneDown}
            onPointerMove={handlePlaneMove}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial visible={false} />
          </mesh>

          <DragSelection />

          {tiles.map((tile, index) => (
            <Tile key={index} tile={tile} />
          ))}
        </Canvas>
      </MapEditorSection>
    </EditorContainer>
  );
};

export default MapEditor;
