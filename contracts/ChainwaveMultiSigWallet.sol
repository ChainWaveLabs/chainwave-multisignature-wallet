pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ChainwaveMultiSigWallet {
    address[] public approvers;
    uint256 public quorum;

    struct Transfer {
        uint256 id;
        uint256 amount;
        address payable to;
        uint256 approvals;
        bool sent;
    }

    Transfer[] public transfers;

    struct QuorumProposal {
        uint256 id;
        uint256 quorum;
        uint256 approvals;
        bool passed;
    }

    QuorumProposal[] public quorumProposals;

    struct ApproverProposal {
        uint256 id;
        address newApprover;
        bool adding;
        uint256 approvals;
        bool passed;
    }

    ApproverProposal[] public approverProposals;

    mapping(address => mapping(uint256 => bool)) public approvals;
    mapping(address => mapping(uint256 => bool)) public quorumApprovals;
    mapping(address => mapping(uint256 => bool)) public approverApprovals;

    /////////////EVENTS

    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }

    function getApprovers() external view returns (address[] memory) {
        return approvers;
    }

    function getTransfers() external view returns (Transfer[] memory) {
        return transfers;
    }

    function getQuorumProposals()
        external
        view
        returns (QuorumProposal[] memory)
    {
        return quorumProposals;
    }

    function getApproverProposals()
        external
        view
        returns (ApproverProposal[] memory)
    {
        return approverProposals;
    }

    function proposeApproverChange(address approverAddr, bool adding)
        external
        onlyApprover()
    {
        bool approverIsPresent = false;

        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == approverAddr) {
                approverIsPresent = true;
            } 
        }

        if (adding && !approverIsPresent) {
            approverProposals.push(
                ApproverProposal(
                    approverProposals.length,
                    approverAddr,
                    adding,
                    0,
                    false
                )
          );
        } 
        
        else if (!adding && approverIsPresent) {      
          approverProposals.push(
            ApproverProposal(
                approverProposals.length,
                approverAddr,
                adding,
                0,
                false
            )
            );
        }

    }

    function approveApproverProposal(uint256 id) external onlyApprover() {
        require(
            approverProposals[id].passed == false,
            "Error: Approver proposals has already been passed"
        );
        require(
            approverApprovals[msg.sender][id] == false,
            "Error: Cannot approve an Approver proposal twice"
        );

        approverApprovals[msg.sender][id] == true;
        approverProposals[id].approvals++;

        if (approverProposals[id].approvals >= quorum) {
            approverProposals[id].passed = true;

            //if passed, we get the address and the action (add or remove) and then do it
            if (approverProposals[id].adding == true) {
               approvers.push( approverProposals[id].newApprover);
            } else if (approverProposals[id].adding == false) {
                delete  approverProposals[id];
            }
      
        }
    }

    function proposeQuorum(uint256 newQuorum) external onlyApprover() {
        quorumProposals.push(
            QuorumProposal(quorumProposals.length, newQuorum, 0, false)
        );
    }

    function approveQuorumProposal(uint256 id) external onlyApprover() {
        require(
            quorumProposals[id].passed == false,
            "Error: Quorum proposals has already been passed"
        );
        require(
            quorumApprovals[msg.sender][id] == false,
            "Error: Cannot approve a quorum proposal twice"
        );

        quorumApprovals[msg.sender][id] == true;
        quorumProposals[id].approvals++;

        if (quorumProposals[id].approvals >= quorum) {
            quorumProposals[id].passed = true;
            uint256 newQuorum = quorumProposals[id].quorum;
            quorum = newQuorum;
        }
    }

    function createTransfer(uint256 amount, address payable to)
        external
        onlyApprover()
    {
        transfers.push(Transfer(transfers.length, amount, to, 0, false));
    }

    function approveTransfer(uint256 id) external onlyApprover() {
        require(
            transfers[id].sent == false,
            "Error: Transfer has already been sent"
        );
        require(
            approvals[msg.sender][id] == false,
            "Error: Cannot approve a transfer twice"
        );

        approvals[msg.sender][id] == true;
        transfers[id].approvals++;

        if (transfers[id].approvals >= quorum) {
            transfers[id].sent = true;
            address payable to = transfers[id].to;
            uint256 amount = transfers[id].amount;
            to.transfer(amount);
        }
    }

    receive() external payable {}

    modifier onlyApprover() {
        bool allowed = false;
        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                allowed = true;
            }
        }
        require(allowed == true);
        _;
    }
}
