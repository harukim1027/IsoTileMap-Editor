import React from "react";
import tile1 from "../../assets/sources/plains-sliced_21.png";
import tile2 from "../../assets/sources/plains-sliced_42.png";
import tile3 from "../../assets/sources/plains-sliced_45.png";
import tile4 from "../../assets/sources/plains-sliced_74.png";
import { SpriteGrid, SpriteImage } from "../../styles/SpritesStyles";

const tileImages = [
  { src: tile1, name: "tile1" },
  { src: tile2, name: "tile2" },
  { src: tile3, name: "tile3" },
  { src: tile4, name: "tile4" },
];

const Sprites = ({ onTileSelect }) => {
  const handleDragStart = (e, tile) => {
    e.dataTransfer.setData("tileImage", tile.src);
    onTileSelect(tile);
  };

  return (
    <div>
      <h3>Sprites</h3>
      <SpriteGrid>
        {tileImages.map((tile, index) => (
          <SpriteImage
            key={index}
            src={tile.src}
            alt={tile.name}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, tile)}
            onClick={() => onTileSelect(tile)}
          />
        ))}
      </SpriteGrid>
    </div>
  );
};

export default Sprites;
