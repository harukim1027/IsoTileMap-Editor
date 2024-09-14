import React, { useState, useEffect } from "react";
import tile1 from "../../assets/sources/plains-sliced_21.png";
import tile2 from "../../assets/sources/plains-sliced_42.png";
import tile3 from "../../assets/sources/plains-sliced_45.png";
import tile4 from "../../assets/sources/plains-sliced_74.png";
import {
  SpriteGrid,
  SpriteWrapper,
  SpriteImage,
  SelectedTileContainer,
  SelectedTileContainerWrapper,
} from "../../styles/SpritesStyles";

const defaultTileImages = [
  { src: tile1, name: "tile1" },
  { src: tile2, name: "tile2" },
  { src: tile3, name: "tile3" },
  { src: tile4, name: "tile4" },
];

const Sprites = ({ onTileSelect }) => {
  const [tileImages, setTileImages] = useState(defaultTileImages);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    const savedTiles = JSON.parse(localStorage.getItem("userTiles")) || [];
    if (savedTiles.length) {
      setTileImages([...defaultTileImages, ...savedTiles]);
    }
  }, []);

  const handleDragStart = (e, tile) => {
    e.dataTransfer.setData("tileImage", tile.src);
    setSelectedTile(tile);
    onTileSelect(tile);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newTile = { src: reader.result, name: `userTile-${Date.now()}` };

      const updatedTiles = [...tileImages, newTile];
      setTileImages(updatedTiles);
      localStorage.setItem("userTiles", JSON.stringify(updatedTiles));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleWrapperClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div>
      <SelectedTileContainer>
        <h3>선택된 타일</h3>

        {selectedTile ? (
          <SelectedTileContainerWrapper>
            <SpriteImage src={selectedTile.src} alt={selectedTile.name} />
          </SelectedTileContainerWrapper>
        ) : (
          <SelectedTileContainerWrapper>
            타일을 선택하세요
          </SelectedTileContainerWrapper>
        )}
      </SelectedTileContainer>
      <hr />
      <SpriteGrid>
        <SpriteWrapper onClick={handleWrapperClick}>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="fileUpload"
            onChange={handleImageUpload}
          />
          <div style={{ cursor: "pointer", color: "#fff", fontSize: 30 }}>
            +
          </div>
        </SpriteWrapper>

        {tileImages.map((tile, index) => (
          <SpriteWrapper
            key={index}
            onClick={() => {
              setSelectedTile(tile);
              onTileSelect(tile);
            }}
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
