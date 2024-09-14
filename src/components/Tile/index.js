import React from "react";
import { TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";

const Tile = ({ tile }) => {
  const texture = useLoader(TextureLoader, tile.image);

  return (
    <mesh position={tile.position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Tile;
