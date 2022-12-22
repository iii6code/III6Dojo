// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import './s0xUsers.sol';
import { s0xFriends, iii6Relations, iii6Math } from './s0xFriends.sol';
import '../iii6Utils/Misc/Errors/iii6Errors.sol';

contract s0xGroups is iii6Math, iii6Relations, iii6Errors {
    s0xUsers private user; // user contract reference
    s0xFriends private friend; // friend contract reference
    address public owner; // owner address
    string public name; // group name
    string p;
    uint256 public m; // member count
    uint256 private c; // content count
    GroupType public mode; // 0-private (no invite), 1-bothchecked, 2-ulike, 3-likeu, 4-bothcheckedofulike, 5-public, 9-secret, 99-admin

    mapping(uint256 => address) public members; // address by id
    mapping(address => uint256) public mNum; // id by address
    mapping(address => uint256) public myContent; // content count by address
    mapping(address => mapping(uint256 => bytes)) public content; // content by address => myContent counter
    mapping(uint256 => bytes) public cntnt; // contentt by cid
    mapping(uint256 => uint256) public r; // replys by cntnt id c
    mapping(uint256 => mapping(uint256 => bytes)) public replys; // replys by cid => rply id => reply content
    mapping(address => uint256) public myRplyCount; // reply count  by useraddress
    mapping(address => mapping(uint256 => bytes)) public myReplys; // reply content by address and myrplycount
    mapping(address => bool) public invite;

    constructor(
        address _user,
        address _friend,
        bytes memory _name,
        GroupType _mode,
        address _o,
        string memory _p
    ) {
        mode = _mode;
        user = s0xUsers(_user);
        friend = s0xFriends(_friend);
        owner = _o;
        p = _p;
        name = string(_name);
        m = 1;
        _addUser(owner);
    }

    function _addUser(address _adr) internal returns (address) {
        members[m] = _adr;
        mNum[_adr] = m;
        m++;
        return _adr;
    }

    function addUser(
        address _sender,
        address _adr,
        string memory _pin
    ) external returns (address ad) {
        /**
         * @dev FACE TO FACE PRIVATE CHAT
         * if sender and receiver know another
         * and ref user is alone new user gets
         * added to face to face chat
         */
        if (mode == GroupType.FaceToFace) {
            if (m > 2) revert All_Slots_Taken();
            if (_sender != owner) revert Unauthorized();
            if (!friend.getMsgAllow(owner, _adr)) revert Not_Friends();
            ad = _addUser(_adr);
        }
        /**
         * @dev PRIVATE GROUP
         * if owner and receiver know another
         * new user gets added
         */
        else if (mode == GroupType.Private) {
            if (_sender != owner || !friend.getMsgAllow(owner, _adr) || !friend.getMsgAllow(_adr, owner))
                revert Unauthorized();
            // add user to group
            ad = _addUser(_adr);
        }
        /**
         * @dev Password Protected PRIVATE Group
         */
        else if (mode == GroupType.Closed) {
            if (!friend.getMsgAllow(_sender, _adr) || !friend.getMsgAllow(_adr, _sender)) revert Unauthorized();
            if (_stringEqual(_pin, p)) {
                ad = _addUser(_adr);
            } else revert Unauthorized();
        }
        /**
         * @dev Friends Invite Friends Public Group
         */
        else if (mode == GroupType.Shared || mode == GroupType.Public) {
            if (friend.getMsgAllow(_sender, _adr) == false || friend.getMsgAllow(_adr, _sender) == false)
                revert Unauthorized();
            ad = _addUser(_adr);
        }
        /**
         * @dev public group
         */
        else if (mode == GroupType.Open) {
            ad = _addUser(_adr);
        }
        /**
         * @dev open group
         */
        else revert Unauthorized();
    }

    function removeUser(address _sender, address _adr) external returns (address) {
        if (mode == GroupType.FaceToFace) revert Min_Requirements_Not_Met();
        if (_sender != owner) revert Unauthorized();
        members[mNum[_adr]] = address(0);
        mNum[_adr] = 0;
        return _adr;
    }

    function addContent(address _sender, string memory _cnt) external returns (string memory) {
        content[_sender][myContent[_sender]] = bytes(_cnt);
        ++myContent[_sender];
        cntnt[c] = bytes(_cnt);
        ++c;
        return _cnt;
    }

    function addReplyToContent(
        address _sender,
        string memory _rply,
        uint256 _c
    ) external returns (uint256) {
        replys[_c][r[_c]] = bytes(_rply);
        myReplys[_sender][myRplyCount[_sender]] = bytes(_rply);
        ++myRplyCount[_sender];
        return ++r[_c];
    }

    function _showContent(uint256 _contentId) internal view returns (string memory, string[] memory) {
        string[] memory repliers;
        for (uint256 i = 0; i < r[_contentId]; i++) {
            repliers[i] = string(replys[_contentId][r[_contentId]]);
        }
        return (string(cntnt[_contentId]), repliers);
    }

    function showContent(uint256 _contentId) external view returns (string memory, string[] memory) {
        return _showContent(_contentId);
    }
}
