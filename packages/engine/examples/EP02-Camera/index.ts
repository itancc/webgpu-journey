import { renderScene } from "../Share/gpu";

async function createScene(canvas: HTMLCanvasElement) {
  renderScene(canvas, ({ canvasCtx, adapter, device }) => {});
}

export default createScene;
