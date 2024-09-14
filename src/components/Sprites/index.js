import React from "react";
import tile1 from "../../assets/sources/plains-sliced_21.png";
import tile2 from "../../assets/sources/plains-sliced_42.png";
import tile3 from "../../assets/sources/plains-sliced_45.png";
import tile4 from "../../assets/sources/plains-sliced_74.png";
import { SpriteGrid, SpriteImage } from "../../styles/SpritesStyles";

const tileImages = [tile1, tile2, tile3, tile4];

const Sprites = ({ onTileSelect }) => {
  return (
    <div>
      <h3>Sprites</h3>
      <SpriteGrid>
        {tileImages.map((src, index) => (
          <SpriteImage
            key={index}
            src={src}
            alt={`Tile ${index + 1}`}
            onClick={() => onTileSelect(src)}
          />
        ))}
      </SpriteGrid>
    </div>
  );
};

export default Sprites;
