// SPDX-License-Identifier: MIT

// MAINNET CONTRACT ADDRESSES

// GL :: 0xecE922B118eEd554Fb9d3318a81FecB8C8D1bD95
// ICE :: 0x890b24d94075B743a89171E5b8A2d9B9049eBf36
// FROOT :: 0xb2330f3836799B36F0be49Df1043C62d30253479

// TESTNET CONTRACT ADDRESSES

// GREENLIST :: 0x0f6ee895f93a0525747DdD7c5c177fF65DBD7454
// ICE :: 0xec09faf4b1c6F198cFF1535800d55123C8C848bE :: ERC20
// FROOTYCOOLTINGS :: 0x069BF09A8EDb8C1b3AC7f62bA57C601DBaCc6747 :: ERC721

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Greenlist {
    address public admin;

    uint256 public l;
    uint256 public max;
    string public message;
    uint256 public stamp;
    FrootyCoolTingz public FCT;
    mapping(address => bool) public isListed;
    address[1234] public users;
    modifier notListed(address _adr) {
        require(isListed[_adr] == false, "already listed");
        _;
    }

    constructor() {
        admin = msg.sender;
        // isListed[msg.sender] = true; // OFF ON TESTNET
        // users[0] = msg.sender;
        message = "BE FRESH MY FRUITY FRENZ !";
        // l = 1; // Mainnet
        // max = 1234; // Mainnet
        l = 0; // Testnet
        max = 1; // Testnet
    }

    function setFCT(address _fct) external returns (bool) {
        FCT = FrootyCoolTingz(_fct);
        return true;
    }

    function autoStart() internal returns (bool) {
        return FCT.changeMS();
    }

    function getListed() external notListed(msg.sender) returns (bool) {
        require(l < max, "no more greenlist tickets left");
        isListed[msg.sender] = true;
        users[l] = (msg.sender);
        l++;
        if (l == max) autoStart();
        return isListed[msg.sender];
    }

    function makeListing(address _adr) external notListed(_adr) returns (bool) {
        require(admin == msg.sender, "you are not admin");
        isListed[_adr] = true;
        users[l] = (_adr);
        l++;
        if (l == max) autoStart();
        return isListed[_adr];
    }

    function showUsers() external view returns (address[1234] memory) {
        return users;
    }

    function setMsg(string memory _msg) external payable returns (bool) {
        require(msg.value <= 1 * 10**18, "insufficient balance sent");
        require(block.timestamp >= stamp + 60 * 60, "you need to wait");
        message = _msg;
        stamp = block.timestamp;
        return true;
    }

    function setMsgAdmin(string memory _msg) external returns (bool) {
        require(admin == msg.sender, "you are not admin");
        message = _msg;
        stamp = block.timestamp;
        return true;
    }

    function showMsg() external view returns (string memory) {
        return message;
    }

    function withdraw() external returns (uint256) {
        require(admin == msg.sender, "you are not admin");
        payable(admin).transfer(address(this).balance);
        return address(this).balance;
    }
}

contract ICE is ERC20 {
    uint256 public constant digits = 10**18;
    uint256 public constant price = (1 * digits) / 10000; // Testnet :: 10000 // Mainnet :: 10

    address admin;

    modifier onlyA() {
        require(msg.sender == admin);
        _;
    }

    constructor() ERC20("Incredibly Cool Essence", "ICE") {
        admin = msg.sender;
    }

    function _domint(uint256 _amnt, address _adr) internal returns (uint256) {
        _mint(_adr, _amnt);
        return _amnt;
    }

    function _doburn(uint256 _amnt, address _adr) internal returns (uint256) {
        _burn(_adr, _amnt);
        return _amnt;
    }

    function swap(uint256 _amnt, address _adr)
        external
        payable
        returns (uint256)
    {
        require(_amnt >= 10, "MINIMUM 10 ICE");
        require(msg.value >= price * _amnt, "INSUFFICIENT FUNDS PROVIDED");
        return _domint(_amnt, _adr);
    }

    function earn(address _adr) external returns (bool) {
        _domint(1 * 10**18, _adr);
        return true;
    }
}

contract FrootyCoolTingz is ERC721 {
    // Public Constants
    uint256 public constant price = 5 * 10**14; // PRICE VAL Testnet
    // uint256 public constant price = 5 * 10**18; // PRICE VAL Mainnet
    uint256 public constant num = 1; // MAX MINTS / WALLET
    // MAINNET
    /* *
    uint256 public constant max = 5555; // MAX TOTAL MINTS
    uint256 public constant sloz = 1234; // MAX FREE MINTS
    // */
    // TESTNET
    /* */
    uint256 public constant max = 5; // MAX TOTAL MINTS
    uint256 public constant sloz = 1; // MAX FREE MINTS
    // */
    // Public Variables
    address public owner; // CONTRACT OWNER
    address iceAdr;
    uint256 public minted; // TOKENS MINTED 1-5000
    string public nam; // TOKEN NAME
    string public sym; // TOKEN SYMBOL
    uint256 public slots; // SLOZ USED 1-1234
    bool public start; // ALLOWS MINT TO START
    // Public Mappings
    mapping(uint256 => bytes) public dias; // TOKEN ID SHOWS DIAS BYTES OBJECT
    mapping(uint256 => uint256) public tid; // TOKEN ID SHOWS DIAS ID
    mapping(uint256 => string) public status;
    mapping(uint256 => address) public ownedBy;
    mapping(address => uint256) private minter;
    ICE public ice;
    Greenlist public GLC;

    modifier onlyO() {
        // ONLY OWNER CAN USE MOD FUNX
        require(msg.sender == owner);
        _;
    }

    constructor(address _ICE, address _Greenlist)
        ERC721("Frooty Cool Tingz", "FROOT")
    {
        // INIT CONTRACT SET PUB VARS
        minted = 1;
        slots = 0;
        owner = msg.sender;
        nam = "Frooty Cool Tingz";
        sym = "FROOT";
        // EVMOS
        /*  *
        ice = ICE(0x890b24d94075B743a89171E5b8A2d9B9049eBf36);
        GLC = Greenlist(0xecE922B118eEd554Fb9d3318a81FecB8C8D1bD95);
        // */
        // TESTNET EVMOS
        /* */
        ice = ICE(_ICE);
        GLC = Greenlist(_Greenlist);
        // */
    }

    function isOwner(address _adr) external view returns (bool) {
        // SHOWS BOOL OF OWNERSTATUS OF ADDRESS
        if (_adr == owner) return true;
        else return false;
    }

    function mint(
        uint256 _amnt,
        uint256[] memory _diasIDs,
        string[] memory _diasOBJs
    ) external payable returns (uint256) {
        // INITIATES THE MINT OF UP TO 7 TOKENS IF ALLOWED
        require(minted < max - (sloz - slots), "SOLD OUT");
        require(msg.value >= _amnt * price, "INSUFFICIET FUNDS");
        require(start == true, "MINT IS NOT YET LIVE");
        _doMint(_amnt, msg.sender, _diasIDs, _diasOBJs);
        uint256 o = block.timestamp % 9;
        for (uint256 i; i <= o; i++) ice.earn(msg.sender);
        return minted;
    }

    function greenMint(uint256[] memory _diasIDs, string[] memory _diasOBJs)
        external
        returns (uint256)
    {
        // INITIATES THE MINT OF UP TO 7 TOKENS IF ALLOWED
        require(minted < max, "SOLD OUT");
        require(start == true, "MINT IS NOT YET LIVE");
        bool boo = GLC.isListed(msg.sender);
        require(boo == true, "YOU ARE NOT GREENLISTED");
        require(slots <= sloz, "ALL SLOTS HAVE BEEN MINTED");
        _doMint(1, msg.sender, _diasIDs, _diasOBJs);
        ice.earn(msg.sender);
        if (block.timestamp % 9 == 0 || block.timestamp % 9 == 9)
            ice.earn(msg.sender);
        slots++;
        return minted;
    }

    function setStatus(uint256 _id, string memory _status)
        external
        payable
        returns (bool)
    {
        require(ownedBy[_id] == msg.sender, "YOU ARE NOT THE HOLDER");
        require(start == false, "MINT IS STILL IN PROGRESS");
        require(msg.value >= 1 * 10**18);
        ice.earn(msg.sender);
        if (block.timestamp % 9 == 0 || block.timestamp % 9 == 9)
            ice.earn(msg.sender);
        status[_id] = _status;
        return true;
    }

    function changeMintState() external onlyO returns (bool) {
        return cMS();
    }

    function cMS() internal returns (bool) {
        return start = !start;
    }

    // ONLY TESTNET
    /* */
    function changeMS() external returns (bool) {
        return cMS();
    }

    // */

    function mintOne(
        address _adr,
        uint256 _diasID,
        string memory _diasOBJ
    ) internal returns (uint256) {
        // INTERNAL // MINTS ONE TOKEN
        _mint(_adr, minted);
        tid[minted] = _diasID;
        dias[minted] = bytes(_diasOBJ);
        minter[_adr] = minted;
        minted++;
        if (minted == max + 1) cMS();
        return minted;
    }

    function _doMint(
        uint256 _amnt,
        address _adr,
        uint256[] memory _diasIDs,
        string[] memory _diasOBJs
    ) internal returns (uint256) {
        require(
            balanceOf(_adr) + _amnt <= num,
            "EXCEEDED MAX MINTABLE TOKENS PER WALLET"
        );
        require(minted + _amnt <= max, "NOT ENOUGH SUPPLY");
        // INTERNAL // MINTS UP TO 7 TOKENS IN ONE TX
        mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
        if (_amnt >= 2) {
            mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
            if (_amnt >= 3) {
                mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
                if (_amnt >= 4) {
                    mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
                    if (_amnt >= 5) {
                        mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
                        if (_amnt >= 6) {
                            mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
                            if (_amnt >= 7) {
                                mintOne(_adr, _diasIDs[0], _diasOBJs[0]);
                            }
                        }
                    }
                }
            }
        }
        return minted;
    }

    function holder(uint256 _id) external view returns (address) {
        // SHOWS OWNER OF TOKEN BY TID
        return ownerOf(_id);
    }

    function clearSloz() external returns (bool) {
        slots = 1234;
        return true;
    }

    function flush() external returns (uint256) {
        // WITHDRAW ALL ETHER FROM CONTRACT
        payable(owner).transfer(address(this).balance);
        return address(this).balance;
    }

    function flushERC20(address _erc) external returns (uint256) {
        // WITHDRAW ALL COIN FROM CONTRACT
        ERC20 coin = ERC20(_erc);
        coin.transferFrom(address(this), owner, coin.balanceOf(address(this)));
        return coin.balanceOf(address(this));
    }

    function flushERC721(address _erc, uint256 _id) external returns (uint256) {
        // WITHDRAW ALL NFT FROM CONTRACT
        ERC721 coin = ERC721(_erc);
        coin.transferFrom(address(this), owner, _id);
        return _id;
    }
}
