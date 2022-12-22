const s0xFriends = artifacts.require('s0xFriends')
const s0xUsers = artifacts.require('s0xUsers')

contract('s0xFriends', ([admin, alice, bob, user3, user4, user5, user6]) => {
    let s0xUsersContract, s0xFriendsContract

    const Member = 0
    const FriendsFriend = 1
    const FRIEND = 2
    const Family = 3
    const Work = 4
    const Homies = 5
    const Partners = 6
    const Blocked = 7
    const Banned = 8

    before(async () => {
        s0xUsersContract = await s0xUsers.deployed()
        s0xFriendsContract = await s0xFriends.new(s0xUsersContract.address)
    })

    it('Should deploy the contracts succesfully', async () => {
        console.log('The s0xUsersContract is: ', s0xUsersContract.address)
        console.log('The s0xFriendsContract is: ', s0xFriendsContract.address)
        console.log('Alice:', alice)
        console.log('Bob: ', bob)
    })

    it('Alice should relate to Bob as a friend', async () => {
        await s0xFriendsContract.relate(bob, alice, FRIEND, { from: alice })
        const isFriend = await s0xFriendsContract.showRelation(bob, { from: alice })
        console.log('Current relationship between alice and bob is: ', isFriend.AconsidersB, '\n')
        // assert.equal(isFriend, FRIEND, 'Alice and bob are NOT friends and they should be')
    })

    // it('should remove a user as a friend', async () => {
    //     await contract.addFriend(bob, { from: admin })
    //     await contract.removeFriend(bob, { from: admin })
    //     const isFriend = await contract.friends(bob)
    //     assert.isFalse(isFriend, 'bob should not be a friend')
    // })

    // it('should not allow a non-friend to remove a friend', async () => {
    //     await contract.addFriend(user3, { from: admin })
    //     try {
    //         await contract.removeFriend(user3, { from: alice })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should return the correct number of friends', async () => {
    //     await contract.addFriend(alice, { from: admin })
    //     await contract.addFriend(bob, { from: admin })
    //     await contract.addFriend(user3, { from: admin })
    //     const numFriends = await contract.getNumFriends()
    //     assert.equal(numFriends, 3, 'should have 3 friends')
    // })

    // it('should return the correct list of friends', async () => {
    //     const friends = await contract.getFriends()
    //     assert.sameMembers(friends, [alice, bob, user3], 'friends list is incorrect')
    // })

    // it('should not allow a user to add themselves as a friend', async () => {
    //     try {
    //         await contract.addFriend(admin, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should not allow a user to add a friend more than once', async () => {
    //     await contract.addFriend(user4, { from: admin })
    //     try {
    //         await contract.addFriend(user4, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should not allow a user to add a friend more than the maximum allowed', async () => {
    //     await contract.addFriend(alice, { from: admin })
    //     await contract.addFriend(bob, { from: admin })
    //     await contract.addFriend(user3, { from: admin })
    //     await contract.addFriend(user4, { from: admin })
    //     await contract.addFriend(user5, { from: admin })
    //     try {
    //         await contract.addFriend(user6, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should not allow a user to remove a friend that does not exist', async () => {
    //     try {
    //         await contract.removeFriend(user6, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should return the correct number of friends for a user with no friends', async () => {
    //     const numFriends = await contract.getNumFriends({ from: user6 })
    //     assert.equal(numFriends, 0, 'should have 0 friends')
    // })

    // it('should return the correct list of friends for a user with no friends', async () => {
    //     const friends = await contract.getFriends({ from: user6 })
    //     assert.sameMembers(friends, [], 'friends list is incorrect')
    // })

    // it('should not allow a user to remove themselves as a friend', async () => {
    //     try {
    //         await contract.removeFriend(admin, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })

    // it('should not allow a user to add a friend that is already a friend', async () => {
    //     await contract.addFriend(user4, { from: admin })
    //     try {
    //         await contract.addFriend(user4, { from: admin })
    //         assert.fail('should have thrown an error')
    //     } catch (error) {
    //         assert.include(error.message, 'revert', 'error message should contain revert')
    //     }
    // })
})
