import styled from "styled-components";

export const LoaderContainer = styled.div`
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    left: calc(50vw - 50px);
    bottom: calc(50vh - 50px);
    width: 84px;
    height: 84px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;
