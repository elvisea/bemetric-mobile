import { Buffer } from "buffer";

const removeBytes = (value: string) => {
  const bufferValue = Buffer.from(value, "base64");

  if (bufferValue[1] === 0x04) {
    const newBufferValue = Buffer.allocUnsafe(bufferValue.length - 4);
    bufferValue.copy(newBufferValue, 0, 4, bufferValue.length);
    return newBufferValue.toString("base64");
  } else if (bufferValue[1] === 0x14) {
    const newBufferValue = Buffer.allocUnsafe(bufferValue.length - 6);
    bufferValue.copy(newBufferValue, 0, 6, bufferValue.length);
    return newBufferValue.toString("base64");
  } else {
    return value;
  }
};

export { removeBytes };
