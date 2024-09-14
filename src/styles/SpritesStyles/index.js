import styled from "styled-components";

export const SpriteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-gap: 10px;
  padding: 10px;
`;

export const SpriteImage = styled.img`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;
