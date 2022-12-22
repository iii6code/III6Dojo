// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.7;

import '../iii6Utils/Math/iii6Math.sol';
import '../iii6Utils/Misc/iii6Relations.sol';
import './s0xUsers.sol';

/**
 * @dev soxFriends is the s0xiety contract that takes care or friendships relations and privacy
 * it inherits iii6Math and iii6Relations
 */
contract s0xFriends is iii6Math, iii6Relations {
    /// @notice User deployed contract
    s0xUsers private user;

    /// @notice Connections
    uint256 c;

    /// @notice Relations
    uint256 r;

    /// @notice address ref user # =>  address privacy user # => Relation Struct
    mapping(address => mapping(address => Relations)) private relationToUser;

    /// @notice address =>  banned from? @audit: this is not used
    mapping(address => bool) public banned;

    /// @notice user address =>  number of followers
    mapping(address => uint256) public followerCount;

    /// @notice user address =>  number of following
    mapping(address => uint256) public myFollowingCount;

    /// @notice smaller address => bigger address =>  number of connection count
    mapping(address => mapping(address => uint256)) public connection;

    /// @notice   =>   => @audit: fill
    mapping(address => mapping(uint256 => address)) public followersByCount;

    /**
     * @dev soxFriends is the s0xiety contract that takes care or friendships relations and privacy
     * @param _usrAdr is the User Contract Adress
     */
    constructor(address _usrAdr) {
        user = s0xUsers(_usrAdr);
    }

    /**
     * @dev shows user account of msg sender
     */
    function showMe() external view returns (string memory) {
        return user.showUser(msg.sender);
    }

    /**
     * @dev shows user account of given address
     * @param _adr address of user account to show
     */
    function showYou(address _adr) external view returns (string memory) {
        return user.showUser(_adr);
    }

    /**
     * @dev shows user relation to msg.sender INTERNAL
     */
    function _detectRelation(uint256 _rel) internal pure returns (Relation rel) {
        if (_rel == 0) rel = Relation.Friend;
        if (_rel == 1) rel = Relation.Family;
        if (_rel == 2) rel = Relation.Work;
        if (_rel == 3) rel = Relation.Homies;
        if (_rel == 4) rel = Relation.Partners;
        if (_rel == 5) rel = Relation.Blocked;
        // @audit: This does not agree with
        /**
            enum Relation {
            Member, // 0
            FriendsFriend, // 1
            Friend, // 2
            Family, // 3
            Work, // 4
            Homies, // 5
            Partners, // 6
            Blocked, // 7
            Banned // 8
         */
    }

    /**
     * @dev shows user msg allowance to msg.sender
     */
    function getMsgAllow(address _sender, address _adr) external view returns (bool) {
        return relationToUser[_sender][_adr].BallowsAmsg;
    }

    /**
     * @dev create user relation from sender to adr INTERNAL
     */
    function relate(
        address _adr,
        address _sender,
        uint256 _rel
    ) external returns (uint256) {
        Relation rel = _detectRelation(_rel);

        followersByCount[_sender][followerCount[_sender]] = _adr;
        ++followerCount[_sender];
        ++myFollowingCount[_adr];

        (address s, address l) = _smaller(_adr, _sender);
        uint256 currentConnection = connection[s][l];

        // 0.- If there is no connection between this user pair
        if (currentConnection == 0) {
            ++c; // 1.- Increment the number of total connections

            connection[s][l] = c; // 2.- Assign the ID of the connection to `c`

            relationToUser[_sender][_adr] = Relations( // 3.- Create the relation from sender to _addr to follow
                r, // id
                true, //AfollowsB
                false, //BfollowsA
                false, //AbansB
                false, //BbansA
                true, // AallowsBmsg
                false, // BallowsAmsg
                rel, //AconsidersB
                Relation.Member //BconsidersA
            );

            ++r; // 4.- Increment the relations count

            user.addedConnection(_sender); // 5.- Increase connection value for Impact struct on impx mapping of user contract
            relationToUser[_adr][_sender] = Relations( // 6.- Create the relation from sender to _addr to follow
                r, // id
                false, //AfollowsB
                true, //BfollowsA
                false, //AbansB
                false, //BbansA
                false, //AallowsBmsg
                true, //BallowsAmsg
                Relation.Member, //AconsidersB
                rel //BconsidersA
            );

            ++r; // 7.- Increment the relations count again

            return (connection[s][l]); // 8.- Return the ID of the connection
        }
        //
        // 0.- If there is a connection between this user pair but its one-sided only
        else if (currentConnection == 1) {
            ++c; // 1.- Increment the number of total connections

            // 1.1.- If _sender considers _adr a Member (0):
            if (relationToUser[_sender][_adr].AconsidersB == Relation.Member) {
                connection[s][l] = c; // 2.- Assign the ID of the connection to `c`

                Relations memory oldRel = relationToUser[_sender][_adr]; // 3.- Get current relation

                relationToUser[_sender][_adr] = Relations( // 4.- Update the relation
                    r, // id
                    true, //AfollowsB
                    oldRel.BfollowsA, //BfollowsA
                    false, //AbansB
                    oldRel.BbansA, //BbansA
                    true, // AallowsBmsg
                    oldRel.BallowsAmsg, // BallowsAmsg
                    rel, //AconsidersB
                    oldRel.BconsidersA //BconsidersA
                );
                ++r; // 5.- Increment relations count

                user.addedConnection(_sender); // 6.- Increase connection value for Impact struct on impx mapping of user contract

                relationToUser[_adr][_sender] = Relations(
                    r, //id
                    oldRel.BfollowsA, // AfollowsB
                    true, //BfollowsA
                    oldRel.BbansA, //AbansB
                    false, // BbansA
                    oldRel.BallowsAmsg, //AallowsBmsg
                    true, // BallowsAmsg
                    oldRel.BconsidersA, //AconsidersB
                    rel // BconsidersA
                );

                ++r;
            }
            return (connection[s][l]);
        }
        // if users are two way connected
        else return (connection[s][l]);
    }

    /**
     * @dev count followers of address
     */
    function doFollowerCount(address _adr) external view returns (uint256) {
        return followerCount[_adr];
    }

    /**
     * @dev count how many users address follows
     * @param _adr address of user
     */
    function doFollowingCount(address _adr) external view returns (uint256) {
        return myFollowingCount[_adr];
    }

    /**
     * @dev shows one specific Followers address
     * @param _adr address of user
     * @param _c follower count pointer of user _adr
     */
    function doShowFollower(address _adr, uint256 _c) external view returns (address) {
        return followersByCount[_adr][_c];
    }

    /**
     * @dev shows relation fom msg.sender to _adr
     * @param _adr address of user
     * @return rel Relations struct
     */
    function showRelation(address _adr) external view returns (Relations memory rel) {
        rel = relationToUser[msg.sender][_adr];
    }

    /**
     * @dev edits one specific Followers address relation status a = msg.sender b = _adr
     * @param _adr address of user
     * @param _fol bool follower
     * @param _msg bool can a msg b
     * @param _ban bool did a ban b
     * @param _rel uint relation gets converted to Relaion enum by _detectRelation()
     */
    function editRelation(
        address _adr,
        bool _fol,
        bool _msg,
        bool _ban,
        uint256 _rel
    ) external returns (Relations memory) {
        return _editRelation(_adr, _fol, _msg, _ban, _rel);
    }

    /**
     * @dev edits one specific Followers address relation status
     * a = msg.sender b = _adr INTERNAL
     * @param _adr address of reciever
     * @param _fol bool a follows b
     * @param _msg bool a allows msgs b
     * @param _ban bool a bans b
     * @param _rel Relation in /iii6Utils/Misc/iii6Relations.sol Relation enum
     * @return rel
     */
    function _editRelation(
        address _adr,
        bool _fol,
        bool _msg,
        bool _ban,
        uint256 _rel
    ) internal returns (Relations memory rel) {
        Relation newRel = _detectRelation(_rel);
        Relations memory hold1 = relationToUser[msg.sender][_adr];
        Relations memory hold2 = relationToUser[_adr][msg.sender];

        /**
         * Relations Struct Scheme
         *
         * @param uint256 id;
         * @param bool AfollowsB;
         * @param bool BfollowsA;
         * @param bool AbansB;
         * @param bool BbansA;
         * @param bool AallowsBmsg;
         * @param bool BallowsAmsg;
         * @param Relation AconsidersB;
         * @param Relation BconsidersA;
         */
        Relations memory relOut = Relations(
            hold1.id,
            _fol,
            hold1.BfollowsA,
            _ban,
            hold1.BbansA,
            _msg,
            hold1.BallowsAmsg,
            newRel,
            hold1.BconsidersA
        );
        Relations memory relIn = Relations(
            hold2.id,
            hold2.AfollowsB,
            _fol,
            hold2.AbansB,
            _ban,
            hold2.AallowsBmsg,
            _msg,
            hold2.AconsidersB,
            newRel
        );
        relationToUser[msg.sender][_adr] = relOut;
        relationToUser[_adr][msg.sender] = relIn;
        rel = relOut;
    }

    function blockAddress(address _adr) external returns (Relations memory) {
        return _editRelation(_adr, false, false, true, 5);
    }
}
