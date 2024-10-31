import { renderScene, resizeCanvasToDisplaySize } from "../Share/gpu";
import SCode from "./shader.wgsl?raw";

async function createScene(canvas: HTMLCanvasElement) {
  renderScene(canvas, ({ canvasCtx, adapter, device }) => {
    // 获取canvas画布首选格式
    const presentationFormat = navigator.gpu!.getPreferredCanvasFormat();

    // 画布与设备绑定
    canvasCtx.configure({
      device,
      format: presentationFormat,
    });

    // 创建着色器模块
    const shaderModule = device.createShaderModule({ code: SCode });

    // 创建渲染管线
    const pipeline = device.createRenderPipeline({
      layout: "auto",
      vertex: {
        module: shaderModule,
      },
      fragment: {
        module: shaderModule,
        targets: [{ format: presentationFormat }],
      },
      primitive: {
        topology: "triangle-list",
      },
    });

    // 描述要绘制的纹理以及如何使用它们
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          //从画布上下文获取当前纹理
          view: canvasCtx.getCurrentTexture().createView(),
          clearValue: [0.3, 0.3, 0.3, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };

    const render = () => {
      //制作一个命令编码器来开始对命令进行编码
      const encoder = device.createCommandEncoder();

      //创建一个渲染通道编码器来编码渲染特定的命令
      const pass = encoder.beginRenderPass(renderPassDescriptor);
      pass.setPipeline(pipeline);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
    };

    render();
  });
}

export default createScene;
