import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/"}));
umi.use(signerIdentity(signer));

(async () => {
    try {
      // Follow this JSON structure
      // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
  
      const image =
        "https://devnet.irys.xyz/9khXwh5oW2iZBtWjYSrrDgfNVqrfWRdmXYwPuwZdyqEY";
      const metadata = {
        name: "testRug ",
        symbol: "kut_token",
        description: "our life",
        image: image,
        attributes: [{ trait_type: 'Rarity', value: 'Rare' }],
        properties: {
          files: [
            {type: "image/jpg",
                uri: image
              },
            ],
          },
          creators: [],
        };
        const myUri = await umi.uploader.uploadJson(metadata);
    
        console.log("Your metadata URI: ", myUri);
      } catch (error) {
        console.log("Oops.. Something went wrong", error);
      }
    })();

    /*malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn nft_metadata
yarn run v1.22.22
$ ts-node ./cluster1/nft_metadata.ts
Your metadata URI:  https://arweave.net/2MY4SeQiawUvZA3u7E3mkWc6eisRpJfpq8ffw5SCP2rb
Done in 38.34s.*/
