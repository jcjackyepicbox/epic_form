export function getClientIP(req) {
  try {
    var IPs =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    if (IPs.indexOf(':') !== -1) {
      IPs = IPs.split(':')[IPs.split(':').length - 1];
    }

    return IPs.split(',')[0];
  } catch (err) {
    throw err;
  }
}
