import * as Encrypter from 'crypto-js';

const { CRYPTO_PASS } = process.env;

export default class Crypto {
	static encrypt(dataToEncrypt: string) {
		return Encrypter.AES.encrypt(dataToEncrypt, CRYPTO_PASS).toString();
	}
	static decrypt(dataToDecrypt: string) {
		const bytes = Encrypter.AES.decrypt(dataToDecrypt, CRYPTO_PASS);
		return bytes.toString(Encrypter.enc.Utf8);
	}
}
