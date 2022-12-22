// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

contract s0xUsers {
    // user data storage for conglomerate
    address private s0x; // s0x admin

    struct Impact {
        uint256 action;
        uint256 connection;
        uint256 liquidity;
    }
    // user profile array // user# => dias%
    mapping(address => bytes) public users;
    mapping(address => bool) public isUser;

    // role // user# => role$
    mapping(address => uint256) public roles;

    // only admin allowed function modifier
    mapping(address => Impact) public impx;
    mapping(address => string) public name;

    error Unauthorized();

    modifier isAdmin() {
        if (msg.sender != s0x) revert Unauthorized();
        _;
    }

    constructor() {
        s0x = msg.sender; // admin initialization
        makeUser(
            s0x,
            '{"name":"s0xAdmin","email":"type.stereo@pm.me","image":"https://ipfs.io/ipfs/QmXNciGvGJGRV2HHE82oLoicvwatB8sqsydxn7P3NSP1nW"}',
            99,
            's0xAdmin'
        ); // admin user account setup
    }

    // takes address , dias , and role to create and store a user profile in user mapping
    function makeUser(
        address _adr,
        bytes memory _dias,
        uint256 _r,
        string memory _name
    ) internal returns (bool) {
        users[_adr] = _dias;
        isUser[_adr] = true;
        roles[_adr] = _r;
        impx[_adr] = Impact(0, 0, 0);
        name[_adr] = _name;
        return true;
    }

    /// @notice takes dias to create guest user profile
    function createUserAccount(
        string memory _dias,
        address _user,
        string calldata _name
    ) external returns (bool) {
        return makeUser(_user, bytes(_dias), 2, _name); // role 2 is Affily8
    }

    // takes address , dias , and role to admin edit and store a user profile in user mapping
    function adminEditUser(
        address _adr,
        string memory _dias,
        uint256 _r
    ) external isAdmin returns (bool) {
        string memory _name = name[_adr];
        return makeUser(_adr, bytes(_dias), _r, _name);
    }

    // takes address , dias , and role to edit and store your user profile in user mapping
    function editUser(string memory _dias) external returns (bool) {
        string memory _name = name[msg.sender];
        return makeUser(msg.sender, bytes(_dias), 2, _name);
    }

    // shows user dias by address input
    function showUser(address _adr) external view returns (string memory) {
        return string(users[_adr]);
    }

    function showImpx(address _adr)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (impx[_adr].action, impx[_adr].connection, impx[_adr].liquidity);
    }

    //@audit: anyone can update this value
    function addedConnection(address _adr) external returns (uint256) {
        return ++impx[_adr].connection;
    }
}
