import styled from "styled-components";

export const SpriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 100px);
    gap: 8px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 100px);
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 8px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 100px);
    justify-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 6px;
  }

  justify-items: start;
  justify-content: start;
  align-items: start;
  align-content: start;
  height: auto;
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-color: #000000;
`;

export const SpriteWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  background-color: #000000;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const SelectedTileContainerWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  background-color: #000000;

  @media (max-width: 1024px) {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

export const SelectedTileContainer = styled.div`
  margin-bottom: 20px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  h3 {
    color: #fff;
    margin-bottom: 10px;
  }
  img {
    width: 80px;
    height: 80px;
  }

  @media (max-width: 1024px) {
    img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export const SpriteImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;

  @media (max-width: 1024px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
  }
`;
