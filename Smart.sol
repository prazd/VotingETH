pragma solidity ^0.4.22;
//Vote
//8 - max

contract Vote {
    
    mapping(uint8 => address) voters; //Список голосующих
    mapping(uint8 => bool) sentence; // Голоса
    uint8 sent_counter = 0; // Счетчик голосов
    
    function voting(bool _sent) public returns(string) { //Отдать голос
        require(sent_counter < 8);
        uint8 cou_acc;
        for(cou_acc = 0;cou_acc<sent_counter;cou_acc++){ //Проверка, на наличие аккаунта в словаре для проголосовавших
            if(voters[cou_acc] == msg.sender){
                return "You have already voted ";
            }
        }
        sentence[sent_counter] = _sent;
        voters[sent_counter] = msg.sender;
        sent_counter++;
    } 
    
    function sent_value() constant returns(uint8){             // Количество голосов
        return sent_counter;
    }
    
    function voters_value(uint8 _i) view returns(address){     // Проголосовавшие по 1
        int i;
        for(i = 0; i < sent_counter;i++){
            return voters[_i];
        }
    }
    
    function null_count()  {                                   // Завершение голосования
        sent_counter = 0;
    }
    
    function count_of_vote() view returns(string){             //Подсчет голосов
        uint8 loose;
        uint8 win;
        uint8 i;
        for(i = 0;i<8;i++){
            if(sentence[i] == false){
                loose++;
            }
            else if(sentence[i] == true){
                win++;
            }
            
            if(loose>win){
                return 'Виновен';
            }
            else{
                return 'Невиновен';
            }
        }
    }
    
}
