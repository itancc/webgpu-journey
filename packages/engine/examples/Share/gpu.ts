export type RenderCallback = (context: {
  canvasCtx: GPUCanvasContext;
  adapter: GPUAdapter;
  device: GPUDevice;
}) => void;

export function renderLoop(renderCallback = () => void 0, once = false) {
  if (once) return renderCallback();
  const render = () => {
    renderCallback();
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

export async function renderScene(
  canvas: HTMLCanvasElement,
  callback: RenderCallback
) {
  // 获取适配器
  const adapter = await navigator.gpu?.requestAdapter({
    powerPreference: "high-performance",
  });
  const device = await adapter?.requestDevice();
  if (!adapter || !device) {
    throw new Error("need a browser that supports WebGPU");
  }

  const context = canvas.getContext("webgpu");
  if (!context) {
    throw new Error("need a browser that supports WebGPU");
  }
  callback({
    canvasCtx: context,
    adapter,
    device,
  });
}

export function resizeCanvasToDisplaySize(
  canvas: HTMLCanvasElement,
  renderCallback = () => void 0
) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const contentBoxSize: ResizeObserverSize = Array.isArray(
        entry.contentBoxSize
      )
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      const { inlineSize, blockSize } = contentBoxSize;
      if (canvas.width !== inlineSize || canvas.height !== blockSize) {
        canvas.width = inlineSize;
        canvas.height = blockSize;
        renderCallback();
      }
    }
  });
  observer.observe(canvas);
}
