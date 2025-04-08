import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../cluster1/wallet/Turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
    try {
        
        const mint = await createMint(connection, keypair, keypair.publicKey, null, 6);
        console.log(`Mint address: ${mint}`)

    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()

/*malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn spl_init
yarn run v1.22.22
$ ts-node ./cluster1/spl_init.ts
Mint address: 7tDgPQ4DVRbDwgKy2GCeTouGeQHQxBURYJcQC9zKxsUs
Done in 9.01s.*/