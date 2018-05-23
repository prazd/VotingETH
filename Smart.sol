pragma solidity ^0.4.22;
//Vote
//8 - max
contract Vote {
    
    mapping(uint8 => address) voters; //Список голосующих
    mapping(uint8 => bool) sentence; // Голоса
    uint8 sent_counter = 0; // Счетчик голосов
    int i; //Счетчик для цикла
    
    function voting(bool _sent){
        sentence[sent_counter] = _sent;
        voters[sent_counter] = msg.sender;
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


    function sent_value() returns(uint8){
        return sent_counter;
    }
    
    function voters_value(uint8 _i) returns(address){
        return voters[_i];
    }
    
    function null_count() private{
        sent_counter = 0;
    }

}