import React from "react";
import tile1 from "../../assets/sources/plains-sliced_21.png";
import tile2 from "../../assets/sources/plains-sliced_42.png";
import tile3 from "../../assets/sources/plains-sliced_45.png";
import tile4 from "../../assets/sources/plains-sliced_74.png";
import {
  SpriteGrid,
  SpriteWrapper,
  SpriteImage,
} from "../../styles/SpritesStyles";

const tileImages = [
  { src: tile1, name: "tile1" },
  { src: tile2, name: "tile2" },
  { src: tile3, name: "tile3" },
  { src: tile4, name: "tile4" },
  { src: tile1, name: "tile1" },
  { src: tile2, name: "tile2" },
  { src: tile3, name: "tile3" },
  { src: tile4, name: "tile4" },
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
      <SpriteGrid>
        {tileImages.map((tile, index) => (
          <SpriteWrapper
            key={index}
            onClick={() => onTileSelect(tile)}
            onDragStart={(e) => handleDragStart(e, tile)}
            draggable="true">
            <SpriteImage src={tile.src} alt={tile.name} />
          </SpriteWrapper>
        ))}
      </SpriteGrid>
    </div>
  );
};

export default Sprites;
