import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import wallet from "../cluster1/wallet/Turbin3-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("7tDgPQ4DVRbDwgKy2GCeTouGeQHQxBURYJcQC9zKxsUs");

(async () => {
    try {
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey )
        console.log(`Your ata is: ${ata.address.toBase58()}`);

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 1n * token_decimals )
        console.log(`Your mint txid: ${mintTx}`);
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()


/*malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn spl_mint
yarn run v1.22.22
$ ts-node ./cluster1/spl_mint.ts
Your ata is: BhzZzVbTN93HVZaC3LxiGYEX2xSYzfp6ZJH3agdK7chA
Your mint txid: XvKb8opjXpLo1jUQ2RYgji67gZNcuwfWCGiJTikvo3iTJxhuzxABFA8V5mEp9zopdk8nastzVswowxNsXkJY69y
Done in 11.24s.*/
