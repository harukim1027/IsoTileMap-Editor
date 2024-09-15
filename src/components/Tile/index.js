import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader, ClampToEdgeWrapping, RepeatWrapping } from "three";

const Tile = ({ tile, renderOrder }) => {
  const texture = useLoader(TextureLoader, tile.src);

  if (!tile.src) {
    console.error("타일 이미지가 존재하지 않습니다:", tile);
    return null;
  }

  texture.wrapS = texture.wrapT = ClampToEdgeWrapping;

  let geometryArgs = [1, 1];
  let rotation = [-Math.PI / 2, 0, 0];

  if (tile.name === "tile1") {
    rotation = [0, 0, 0];
    texture.wrapS = texture.wrapT = RepeatWrapping;
  } else if (tile.name === "tile4") {
    geometryArgs = [1, 2];
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
  } else if (tile.name === "tile2" || tile.name === "tile3") {
    texture.wrapS = texture.wrapT = ClampToEdgeWrapping;
  }

  return (
    <mesh
      position={tile.position}
      rotation={tile.name === "tile1" ? [0, 0, 0] : [-Math.PI / 20, 0, 0]}
      renderOrder={renderOrder || 100}>
      <planeGeometry args={geometryArgs} />
      <meshBasicMaterial map={texture} transparent={true} alphaTest={0.5} />
    </mesh>
  );
};

export default Tile;
