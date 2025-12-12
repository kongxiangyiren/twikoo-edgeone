// @ts-expect-error

import twikoo from 'tkserver/mongo';
// const server = http.createServer();

// server.on('request', async function (request, response) {
//   // try {
//   //   const buffers = [];
//   //   for await (const chunk of request) {
//   //     buffers.push(chunk);
//   //     console.log(chunk);

//   //   }
//   //   request.body = JSON.parse(Buffer.concat(buffers).toString());
//   // } catch (e) {
//   //   request.body = {};
//   // }
//   // @ts-expect-error
//   response.status = function (code: number) {
//     this.statusCode = code;
//     return this;
//   };
//   // @ts-expect-error
//   response.json = function (json: any) {
//     if (!response.writableEnded) {
//       this.writeHead(200, { 'Content-Type': 'application/json' });
//       this.end(JSON.stringify(json));
//     }
//     return this;
//   };
//   return await twikoo(request, response);
// });

// export default {
//   fetch: (request: Request) => {
//     const { req, res } = toReqRes(request);

//     process.env.TWIKOO_IP_HEADERS = JSON.stringify(['headers.eo-connecting-ip']);
//     // @ts-expect-error
//     req.body = request.body;
//     server.emit('request', req, res);
//     return toFetchResponse(res);
//   }
// };

export default defineEventHandler(async event => {
  process.env.TWIKOO_IP_HEADERS = JSON.stringify(['headers.eo-connecting-ip']);

  const { req, res } = event.node;
  try {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
      console.log(chunk);
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
