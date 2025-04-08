import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../cluster1/wallet/Turbin3-wallet.json"

import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const mint = generateSigner(umi);

(async () => {
    let tx = createNft(umi,{
        mint,
        name: "testRug",
        symbol:"kut_token",
        uri:"https://devnet.irys.xyz/2MY4SeQiawUvZA3u7E3mkWc6eisRpJfpq8ffw5SCP2rb",
        sellerFeeBasisPoints: percentAmount(5)

    })
    let result = await tx.sendAndConfirm(umi);
    const signature = base58.encode(result.signature);
    
    console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    console.log("Mint Address: ", mint.publicKey);
})();

/*malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn nft_mint
yarn run v1.22.22
$ ts-node ./cluster1/nft_mint.ts
Succesfully Minted! Check out your TX here:
https://explorer.solana.com/tx/5CxXSVbTgfjgYFdiiXnEZ6SEj8wvd1iQEN7d2kJyQJGFaUEmxoPhGzUEzVsKcDVDZ6tnFx4B5vbHsKm1wnHED8YK?cluster=devnet
Mint Address:  t77hHwXBbf23Se4wRaREJ8Gyf1fseUsq11WV17jqaok
Done in 21.45s.*/