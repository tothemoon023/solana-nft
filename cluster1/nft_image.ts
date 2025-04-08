import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair,signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({address:"https://devnet.irys.xyz/"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        //1. Load image
        //2. Convert image to generic file.
        //3. Upload image

        const image =await readFile("cluster1/family.jpg");
        const genericFile= createGenericFile(image,"family.jpg",
            {contentType:"image/jpg"}
        );

        const [myUri] = await umi.uploader.upload([genericFile]);
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

/*malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn nft_image
yarn run v1.22.22
$ ts-node ./cluster1/nft_image.ts
Your image URI:  https://arweave.net/9khXwh5oW2iZBtWjYSrrDgfNVqrfWRdmXYwPuwZdyqEY
Done in 34.05s. */