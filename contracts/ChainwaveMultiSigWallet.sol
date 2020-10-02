pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract ChainwaveMultiSigWallet {
    
    address[] public approvers;
    uint public quorum;
    
    struct Transfer{
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }
    
    Transfer[] public transfers;
    
    struct QuorumProposal{
        uint id;
        uint quorum;
        uint approvals;
        bool passed;
    }

    QuorumProposal[] public quorumProposals;
    
    mapping(address => mapping(uint => bool)) public approvals;

    mapping(address => mapping(uint => bool)) public quorumApprovals;
    
    constructor(address[] memory _approvers, uint _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }
    
    function getApprovers() external view returns (address[] memory){
        return approvers;
    }
    
     function getTransfers() external view returns (Transfer[] memory){
        return transfers;
    }

    function getQuorumProposals() external view returns (QuorumProposal[] memory){
        return quorumProposals;
    }

    function proposeQuorum(uint newQuorum) external onlyApprover() {
         quorumProposals.push(
             QuorumProposal(
              quorumProposals.length,
              newQuorum,
              0,
              false
            ));
    }

    function approveQuorumProposal(uint id) external onlyApprover(){
       require(quorumProposals[id].passed == false, "Error: Quorum proposals has already been passed");
       require(quorumApprovals[msg.sender][id] == false, "Error: Cannot approve a quorum proposal twice");
       
       quorumApprovals[msg.sender][id] == true;
       quorumProposals[id].approvals ++;
       
       if(quorumProposals[id].approvals >= quorum){
           quorumProposals[id].passed = true;
           uint newQuorum = quorumProposals[id].quorum;
           quorum = newQuorum;
       }
    } 

    function createTransfer(uint amount, address payable to) external onlyApprover() {
         transfers.push(
             Transfer(
              transfers.length,
              amount,
              to,
              0,
              false
            ));
    }
    
   function approveTransfer(uint id) external onlyApprover(){
       require(transfers[id].sent == false, "Error: Transfer has already been sent");
       require(approvals[msg.sender][id] == false, "Error: Cannot approve a transfer twice");
       
       approvals[msg.sender][id] == true;
       transfers[id].approvals ++;
       
       if(transfers[id].approvals >= quorum){
           transfers[id].sent = true;
           address payable to = transfers[id].to;
           uint amount = transfers[id].amount;
           to.transfer(amount);
       }
   } 
   
   receive() external payable {}
    
   modifier onlyApprover(){
       bool allowed = false;
       for(uint i = 0; i < approvers.length; i++){
           if(approvers[i] == msg.sender){
               allowed = true;
           }
       }
       require(allowed == true);
       _;
   }

    
}