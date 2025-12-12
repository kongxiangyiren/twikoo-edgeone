// @ts-expect-error
import twikoo from 'tkserver/mongo.js';

export default defineEventHandler(async event => {
  process.env.TWIKOO_IP_HEADERS = JSON.stringify(['headers.eo-connecting-ip']);

  const { req, res } = event.node;
  req.method = req.method?.toUpperCase();
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    // @ts-expect-error
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (e) {
    // @ts-expect-error
    req.body = {};
  }

  // @ts-expect-error
  res.status = function (code: number) {
    this.statusCode = code;
    return this;
  };
  // @ts-expect-error
  res.json = function (json: any) {
    if (!res.writableEnded) {
      this.writeHead(200, { 'Content-Type': 'application/json' });
      this.end(JSON.stringify(json));
    }
    return this;
  };
  return await twikoo(req, res);
});
