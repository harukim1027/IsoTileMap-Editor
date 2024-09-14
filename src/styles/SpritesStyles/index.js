import styled from "styled-components";

export const SpriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  padding: 20px;
  justify-items: start;
  justify-content: start;
  align-items: start;
  align-content: start;
  height: 100%;
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
`;

export const SpriteImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;
