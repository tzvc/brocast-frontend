export const computeNewPosWithOffset = (offsetX, offsetY, pos) => {
  return [
    pos[0] +
      ((offsetY / 6371000) * (180 / Math.PI)) /
        Math.cos((pos[1] * Math.PI) / 180),
    pos[1] + (offsetX / 6371000) * (180 / Math.PI)
  ];
};
