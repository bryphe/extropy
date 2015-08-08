module Extropy {

    export class BinaryUtility {
        // From: http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        public static base64StringToBlob(b64Data, contentType, sliceSize?): Blob {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        }

        public static blobToBase64String(blob: Blob): Q.Promise<string> {
            var promise = Q.defer<string>();
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                promise.resolve(reader.result);
            };

            return promise.promise;
        }

        public static blobToText(blob: Blob): Q.Promise<string> {
            var promise = Q.defer<string>();
            var reader = new FileReader();
            reader.readAsText(blob);
            reader.onloadend = () => {
                promise.resolve(reader.result);
            };

            return promise.promise;
        }

        // From Mozilla docs:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
        public static base64StringToArrayBuffer(sBase64: string, nBlocksSize?: number) {

            var
                sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
                nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, taBytes = new Uint8Array(nOutLen);

            for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
                nMod4 = nInIdx & 3;
                nUint24 |= BinaryUtility.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
                if (nMod4 === 3 || nInLen - nInIdx === 1) {
                    for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
                        taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
                    }
                    nUint24 = 0;

                }
            }
            return taBytes;
        }

        private static b64ToUint6(nChr) {

            return nChr > 64 && nChr < 91 ?
                nChr - 65
                : nChr > 96 && nChr < 123 ?
                nChr - 71
                : nChr > 47 && nChr < 58 ?
                nChr + 4
                : nChr === 43 ?
                62
                : nChr === 47 ?
                63
                :
                0;

        }


    }
}

