import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../cluster1/wallet/Turbin3-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("7tDgPQ4DVRbDwgKy2GCeTouGeQHQxBURYJcQC9zKxsUs");

// Recipient address
const to = new PublicKey("F3hXDDWbEFGyUmo5VHeV7fDXwZ8NwNZSdjmKLJuJsAWB");

(async () => {
    try {
        const from_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey )
        const to_ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint,to)
        const signature= await transfer(connection,keypair,from_ata.address,to_ata.address,keypair,1);
        console.log(`Transaction signature: ${signature}`);
        
        // Get the token account of the fromWallet address, and if it does not exist, create it

        // Get the token account of the toWallet address, and if it does not exist, create it

        // Transfer the new token to the "toTokenAccount" we just created
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    
    }
})();

/*malika@AZAM:~/q2builder_cohort/solana-starter$ cd ts
malika@AZAM:~/q2builder_cohort/solana-starter/ts$ yarn spl_transfer
yarn run v1.22.22
$ ts-node ./cluster1/spl_transfer.ts
Transaction signature: 2wgT2Y1TZ1AtGJQSSwU3MRit2pqHc6t4pKJCyUMWQbB8pnMYBmdHS95u7RXr9EdKk7ts8n6cLDuJemFyQQW63Hpa
Done in 11.40s.*/