var HttpCodes = {}

HttpCodes.OK = 200;
HttpCodes.CREATED = 201;
HttpCodes.ACCEPTED = 202;
HttpCodes.MOVED_PERMANENTLY = 301;
HttpCodes.BAD_REQUEST = 400;
HttpCodes.UNAUTHORIZED = 401;
HttpCodes.FORBIDDEN = 403;
HttpCodes.NOT_FOUND = 404;
HttpCodes.METHOD_NOT_ALLOWED = 405;
HttpCodes.REQUEST_TIMEOUT = 408;
HttpCodes.PAYLOAD_TOO_LARGE = 413;
HttpCodes.INTERNAL_SERVER_ERROR = 500;
HttpCodes.NOT_IMPLEMENTED = 501;
HttpCodes.BAD_GATEWAY = 502;
HttpCodes.SERVICE_UNAVAILABLE = 503;
HttpCodes.GATEWAY_TIMEOUT = 504;

module.exports = HttpCodes;