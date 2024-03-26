import * as CryptoJS from "crypto-js";

class tokenGenerator {

  private _secretKey: string;
  private _alg: string = "HS256";
  private _typ: string = "JWT";


  constructor(secretKey: string) {
    this._secretKey = secretKey;
  }

  public async generateToken(APIkey: string) {
    try{
      const header = this.generateHeader();
      const payload = this.generatePayload(APIkey);
      const signature = this.generateSignature(header, payload, this._secretKey);
      return `${header}.${payload}.${signature}`;
    }catch(error) {
      throw error
    }
  }


  generateHeader(): string {
    const header = {
      alg: this._alg,
      typ: this._typ
    }

    return this.base64UrlEncode(JSON.stringify(header));

  }

  private generatePayload(key: string) {

    const payload = {
      sub: key,
    }
    return this.base64UrlEncode(JSON.stringify(payload));
  }

  private generateSignature(header: string, payload: string, signatureKey: string) {
    const dataToSign = `${header}.${payload}`;
    const signature = CryptoJS.HmacSHA256(dataToSign, signatureKey);
    return this.base64url(signature);
  }

  private base64url(source: any) {
    let base64: string = CryptoJS.enc.Base64.stringify(source);
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  private base64UrlEncode(data: string) {
    let base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

}

export default tokenGenerator;
