import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({token, secret}: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split('.');

  const signature = generateSignature({ header: headerSent, payload: payloadSent, secret })

  if (signature !== signatureSent) {
    throw new Error(`Invalid JWT Token`)
  }

  const decodedPayload = JSON.parse(
    Buffer
      .from(payloadSent, 'base64url')
      .toString('utf-8')
  );

  if (Date.now() > decodedPayload.exp) {
    throw new Error(`Invalid JWT Token`)
  }


  return decodedPayload;
}
