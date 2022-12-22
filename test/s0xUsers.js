const s0xUsers = artifacts.require('s0xUsers')
const ethers = require('ethers')

contract('s0xUsers', ([admin, alice, bob]) => {
    let s0xUsersContract

    before(async () => {
        s0xUsersContract = await s0xUsers.deployed()
    })

    it('should create a user account for Alice with the given data', async () => {
        const name = 'Alice'
        const dias =
            '{"name":"John Doe","email":"john.doe@example.com","image":"https://ipfs.io/ipfs/QmXNciGvGJGRV2HHE82oLoicvwatB8sqsydxn7P3NSP1nW"}'
        const tx = await s0xUsersContract.createUserAccount(dias, alice, name)

        // Assert that the user was added to the `users` mapping
        const storedDias = await s0xUsersContract.users(alice)
        assert.equal(ethers.utils.toUtf8String(storedDias), dias)

        // Assert that the user was added to the `isUser` mapping
        assert.isTrue(await s0xUsersContract.isUser(alice))

        // Assert that the user was given the "Affily8" role
        assert.equal(await s0xUsersContract.roles(alice), 2)
    })

    it('should allow the admin to edit a user account', async () => {
        const newUserAccountData =
            '{"name":"Bob","email":"bob@example.com","image":"https://ipfs.io/ipfs/QmXNciGvGJGRV2HHE82oLoicvwatB8sqsydxn7P3NSP1nW"}'
        const newUserRole = 3

        await s0xUsersContract.adminEditUser(alice, newUserAccountData, newUserRole, { from: admin })

        const userRole = await s0xUsersContract.roles(alice)
        assert.equal(userRole, newUserRole, 'The user should have the new role assigned by the admin')

        const userAccountDataFromContract = await s0xUsersContract.showUser(alice)
        assert.equal(
            userAccountDataFromContract,
            newUserAccountData,
            'The contract should store the new user account data'
        )
    })

    it('should show impx', async () => {
        const impx = await s0xUsersContract.showImpx(alice)
        // console.log('Alice IMPX is: ', impx)
    })

    it('should add connection', async () => {
        await s0xUsersContract.addedConnection(alice)
        const resultCall = await s0xUsersContract.addedConnection.call(alice)
        assert.equal(resultCall, 2)
    })
})
