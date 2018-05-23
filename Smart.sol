pragma solidity ^0.4.22;
//Vote
//8 - max
contract Vote {
    mapping(uint256 => string) voters; //Список голосующих
    mapping(uint256 => bool) sentence; // Голоса
    uint256 sent_counter = 0; // Счетчик голосов
    
    function voting(bool _sent){
        sentence[sent_counter] = _sent;
        sent_counter += 1;
    } 
    
    function check_vote() constant returns(bool){ // Проверка количества проголосовавших
        
        if (sent_counter >= 8){
            return true;
        }
        else{
            return false;
        }
}
    function vote_value() returns(uint256){
        return sent_counter;
    }
    
    function null_count() private{
        sent_counter = 0;
    }

}
