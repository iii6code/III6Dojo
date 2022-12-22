// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import './s0xUsers.sol';
import { iii6Math, s0xFriends, iii6Relations } from './s0xFriends.sol';
import './s0xGroups.sol';

/**
 * @dev the s0xFactory creates the s0xial user friend and group interface and
 * functions as central administration hub for all s0xial interactions
 */
contract s0xFactory is s0xUsers, iii6Math, iii6Relations {
    s0xFriends public friends;
    s0xGroups public groups;
    address private fAdr;
    mapping(address => uint256) public groupCount;
    mapping(address => mapping(uint256 => address)) public groupByCount;
    mapping(address => uint256) public myGroupCount;
    mapping(address => mapping(uint256 => address)) public myGroupByCount;

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    constructor() s0xUsers() iii6Math() {
        friends = new s0xFriends(address(this));
        fAdr = address(friends);
    }

    function _getState(uint256 _state) internal pure returns (GroupType state) {
        if (_state == 0) state = GroupType.FaceToFace;
        else if (_state == 1) state = GroupType.Private;
        else if (_state == 2) state = GroupType.Closed;
        else if (_state == 3) state = GroupType.Shared;
        else if (_state == 4) state = GroupType.Public;
        else if (_state == 5) state = GroupType.Open;
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function _makeGroup(
        string memory _name,
        uint256 _state,
        string memory _p
    ) internal returns (address) {
        GroupType state;
        state = _getState(_state);

        groups = new s0xGroups(address(this), fAdr, bytes(_name), state, msg.sender, _p);
        groupByCount[msg.sender][groupCount[msg.sender]] = address(groups);
        groupCount[msg.sender]++;
        return address(groups);
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function _addUserToGroup(
        address _adr,
        address _group,
        string memory _p
    ) internal returns (address) {
        groups = s0xGroups(_group);
        groups.addUser(msg.sender, _adr, _p);
        groupByCount[_adr][groupCount[_adr]] = address(groups);
        groupCount[_adr]++;
        return _adr;
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function _delUserFromGroup(address _adr, address _group) internal returns (address) {
        groups = s0xGroups(_group);
        for (uint256 i = 0; i < groupCount[_adr]; i++) {
            if (groupByCount[_adr][i] == _group) {
                groupByCount[_adr][i] = address(0);
                groups.removeUser(msg.sender, _adr);
            }
        }
        groupCount[_adr]--;
        return _adr;
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function addUserToGroup(
        address _adr,
        address _group,
        string memory _p
    ) external returns (address) {
        return _addUserToGroup(_adr, _group, _p);
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function delUserFromGroup(address _adr, address _group) external returns (address) {
        return _delUserFromGroup(_adr, _group);
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function createGroup(
        string calldata _name,
        uint256 _state,
        string calldata _p,
        address[] calldata _usrs
    ) external returns (address) {
        address adr = _makeGroup(_name, _state, _p);
        for (uint256 i = 0; i < _usrs.length; i++) {
            _addUserToGroup(_usrs[i], adr, _p);
        }
        return adr;
    }

    /**
     * @dev the s0xFactory creates the s0xial user friend and group interface and
     * functions as central administration hub for all s0xial interactions
     * the constructor creates a friends instance and stores the address of the contract
     */
    function createConvo(string calldata _name, address _usr) external returns (address) {
        address adr = _makeGroup(_name, 0, '');
        address usr = _addUserToGroup(_usr, adr, '');
        return usr;
    }
}
