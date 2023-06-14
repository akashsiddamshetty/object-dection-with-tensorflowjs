export const drawRect = (
  detection: { [x: string]: any }[],
  ctx: {
    strokeSylt: string;
    font: string;
    fillStyle: string;
    beginPath: () => void;
    fillText: (arg0: any, arg1: any, arg2: any) => void;
    rect: (arg0: any, arg1: any, arg2: any, arg3: any) => void;
    stroke: () => void;
  }
) => {
  detection.forEach((pred: { [x: string]: any }) => {
    const [x, y, width, height] = pred["bbox"];
    const text = pred["class"];
    const color = "green";
    ctx.strokeSylt = color;
    ctx.font = "18px Arial";
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
