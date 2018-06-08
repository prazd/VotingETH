pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;
//Vote
//8 - max
contract Vote {
    
    mapping(uint8 => address) voters;    // Список голосующих
    mapping(uint8 => bool) sentence;     // Голоса
    uint8 sent_counter;                  // Счетчик голосов
    string name_of_vote;                 // Имя дела
    address[] adr_vot;                   // Адреса проголосовавших
    mapping(string => address[]) archive;      // Архив
    
     function archive_info(string _info) public view returns(address[]){  // Обратиться к архиву
        return archive[_info];
    }
    
    function start_of_vote(string _sv){        // Начать голосование,назначить дело 
        name_of_vote = _sv;
        sent_counter = 0;
    }
    
    function n_v() public constant returns(string){     // Узнать дело по которому ведется голосование
        return name_of_vote;
    }
    
    function voting(bool _sent) public returns(string) {         // Отдать голос
        require(sent_counter < 8);
        for(uint8 cou_acc = 0;cou_acc<sent_counter;cou_acc++){   // Проверка, на наличие аккаунта в словаре для проголосовавших
            if(voters[cou_acc] == msg.sender){
                return "You have already voted ";
            }
        }
        sentence[sent_counter] = _sent;
        voters[sent_counter] = msg.sender;
        adr_vot.push(msg.sender);                            // Адрес проголосовавшего в массив
        sent_counter++;
    } 
    
    function sent_value() view returns(uint8){           // Количество голосов
        return sent_counter;
    }
    
    function voters_value(uint8 _i) view returns(address){   // Проголосовавшие по 1
            return voters[_i];

    }
    
    function full_voters_value() view returns(address[]){    // Проголосовавшие Список
            return adr_vot;
    }
    
    function vote(uint8 _v) view returns(bool){              // Голоса
            return sentence[_v];
    }
    
    function null_count(){                                   // Завершение голосования
        archive[name_of_vote] = adr_vot;
    }
    
    function count_of_vote() view returns(string){           // Подсчет голосов
        if(sent_counter == 8){
           
           uint8 loose;
           uint8 win;
           
           for(uint8 i = 0; i < 8; i++){   
               if(sentence[i] == false){
                  loose++;
               }
               else if(sentence[i] == true){
                    win++;
               }
           }           
           if(loose > win){
                    return 'Виновен';
               }
           else if(loose == win){
                    return 'Равное количество голосов за и против'; 
           }
           
           else{
                    return 'Невиновен';
         }
    }
         
         
        else {
             
             uint8 now_loose;
             uint8 now_win;
             
             for(uint8 now_i = 0; now_i < sent_counter;now_i++){
                 if(sentence[now_i] == false){
                     now_loose++;
                 }
                 else if(sentence[now_i] == true){
                     now_win++;
                 }
            }
            if(now_loose > now_win){
                return 'Пока большинство за то, что виновен';
            }
            else if(now_loose == now_win){
                return 'Пока что равное количество голосов за и против';
            }
            else {
                return 'Пока большинство за то, что невиновен';
                 }
         }
     }

}

