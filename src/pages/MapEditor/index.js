import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { GridHelper, Raycaster, Vector2, Vector3, Plane } from "three";
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

  const MapCanvas = () => {
    const { camera, size, gl } = useThree();
    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const getClickPositionOnPlane = (e) => {
      const canvas = gl.domElement;
      const rect = canvas.getBoundingClientRect();

      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const plane = new Plane(new Vector3(0, 1, 0), 0);
      raycaster.setFromCamera(mouse, camera);

      const point = new Vector3();
      raycaster.ray.intersectPlane(plane, point);

      return point;
    };

    const handlePlaneDown = (e) => {
      if (!selectedTile) {
        console.warn("타일이 선택되지 않았습니다.");
        return;
      }

      const point = getClickPositionOnPlane(e);

      setClickStart(Date.now());
      setIsDragging(false);

      const snappedX = Math.floor(point.x);
      const snappedZ = Math.floor(point.z);

      setDragStart({ x: snappedX, z: snappedZ });
      setDragEnd(null);
      setClickPosition({ x: snappedX, z: snappedZ });
    };

    const handlePlaneMove = (e) => {
      if (!dragStart || !selectedTile) return;
      const point = getClickPositionOnPlane(e);

      const newDragEnd = {
        x: Math.floor(point.x),
        z: Math.floor(point.z),
      };

      setDragEnd(newDragEnd);

      const dragDistanceX = Math.abs(newDragEnd.x - dragStart.x);
      const dragDistanceZ = Math.abs(newDragEnd.z - dragStart.z);

      if (dragDistanceX > 0.2 || dragDistanceZ > 0.2) {
        setIsDragging(true);
      }
    };

    const handlePlaneUp = () => {
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
        const xMin = Math.min(dragStart.x, dragEnd.x);
        const xMax = Math.max(dragStart.x, dragEnd.x);
        const zMin = Math.min(dragStart.z, dragEnd.z);
        const zMax = Math.max(dragStart.z, dragEnd.z);

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
      if (!dragStart || !dragEnd || !isDragging || !selectedTile) return null;

      const xMin = Math.min(dragStart.x, dragEnd.x);
      const xMax = Math.max(dragStart.x, dragEnd.x);
      const zMin = Math.min(dragStart.z, dragEnd.z);
      const zMax = Math.max(dragStart.z, dragEnd.z);

      let selectionTiles = [];
      for (let x = xMin; x <= xMax; x++) {
        for (let z = zMin; z <= zMax; z++) {
          selectionTiles.push(
            <Tile
              key={`${x}-${z}`}
              tile={{
                ...selectedTile,
                position: [
                  x,
                  selectedTile?.name === "tile1"
                    ? 0
                    : selectedTile?.name === "tile4"
                    ? 1
                    : 0.01,
                  z,
                ],
              }}
              opacity={0.5}
            />
          );
        }
      }

      return <>{selectionTiles}</>;
    };

    return (
      <>
        <OrthographicCamera
          makeDefault
          position={[6, 5, 10]}
          zoom={80}
          rotation={[cameraRotation?.x, cameraRotation?.y, 0]}
        />
        <primitive object={new GridHelper(1000, 1000)} renderOrder={0} />
        <mesh
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 1, 0]}
          onPointerDown={handlePlaneDown}
          onPointerMove={handlePlaneMove}
          onPointerUp={handlePlaneUp}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        {tiles.map((tile, index) => (
          <Tile key={index} tile={tile} renderOrder={index + 100} />
        ))}
        <DragSelection />
      </>
    );
  };

  return (
    <EditorContainer>
      <SpritesSection>
        <Sprites onTileSelect={handleTileSelect} />
      </SpritesSection>

      <MapEditorSection>
        <Canvas style={{ background: "black" }}>
          <MapCanvas />
        </Canvas>
      </MapEditorSection>
    </EditorContainer>
  );
};

export default MapEditor;
