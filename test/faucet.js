const wvs = 1e8

describe('Faucet', () => {
    before(async() => {
        await setupAccounts({
            faucet: 0.1 * wvs,
            recipient: 0.1 * wvs
        })
        const compiledDapp = compile(file('faucet.ride'))
        const dAppTx = setScript({script: compiledDapp}, accounts.faucet)
        await broadcast(dAppTx)
        await waitForTx(dAppTx.id)
    })

    it('should correct faucet execution', async () => {
        const tx = invokeScript({
            dApp: address(accounts.faucet),
            call: {
                function: "faucet",
            }
        }, accounts.recipient);

        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('should reject faucet', async () => {
        const tx = invokeScript({
            dApp: address(accounts.faucet),
            call: {
                function: "faucet",
            }
        }, accounts.recipient);

        await expect(broadcast(tx)).rejectedWith()
    })
})
