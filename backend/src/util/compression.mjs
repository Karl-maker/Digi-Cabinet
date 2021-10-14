import zlib from "zlib";

function compressorCheck(compression) {
  //inject import
  return function dataCompress(req, res) {
    if (req.headers["x-no-compression"]) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  };
}

function compressorStrategy(contentType) {
  //Compress customize based on type of req. https://www.npmjs.com/package/compression
  //If it's JSON exit ASAP to not spend time here
  let strategy;

  switch (contentType) {
    case "DEFAULT":
      strategy = zlib.Z_DEFAULT_STRATEGY;
      break;
    case "RLE":
      strategy = zlib.Z_RLE;
      break;
    case "FILTERED":
      strategy = zlib.Z_FILTERED;
      break;
    case "FIXED":
      strategy = zlib.Z_FIXED;
      break;
    case "HUFFMAN":
      strategy = zlib.Z_HUFFMAN_ONLY;
      break;
    default:
      strategy = zlib.Z_DEFAULT_STRATEGY;
      break;
  }
  return strategy;
}

export { compressorCheck, compressorStrategy };
