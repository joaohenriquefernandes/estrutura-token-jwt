import { generateSignature } from './generateSignature';

interface ISignOptions {
 data: Record<string, any>;
 exp:number;
 secret:string;
}

export function sign({data, exp, secret}: ISignOptions) {

  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const payload = {
    ...data,
    iat: Date.now(),
    exp: exp,
  };

  const base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url');

  const base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');

  const signature = generateSignature({ header: base64EncodedHeader, payload: base64EncodedPayload, secret: secret });

  return `${base64EncodedHeader}.${base64EncodedPayload}.${signature}`;
}
