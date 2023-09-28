export const isObject = function (v: any) { return Object.prototype.toString.call(v) === '[object Object]'; };
export const isFunction = function (v: any) { return Object.prototype.toString.call(v) === '[object Function]'; };
export const isNumber = function (v: any) { return Object.prototype.toString.call(v) === '[object Number]'; };
export const isEmptyObject = function (v: any) { return isObject(v) && Object.keys(v).length === 0; };
