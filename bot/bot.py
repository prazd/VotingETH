#При помощи этого бота можно будет проголосовать
import telebot
import web3
import settings
#Bot
bot = settings.bot
#global
keyboard = telebot.types.InlineKeyboardMarkup()
#abi смарт контракта
contract_abi = settings.abi
#Web3(localhost - ganache)
web = settings.web
#Смарт контракт
smart_contract = web.eth.contract(address='0x91bB47B76BAeFad227bcEA1194f0d396EA21602D',abi=contract_abi)

@bot.message_handler(commands=["start"])
def mes(message):
    global keyboard
    s_v = telebot.types.InlineKeyboardButton(text="Количество голосов",callback_data='sv')
    keyboard.add(s_v)
    result = telebot.types.InlineKeyboardButton(text="Приговор",callback_data='result')
    keyboard.add(result)
    addr_vote = telebot.types.InlineKeyboardButton(text='Проголосовали', callback_data='vote')
    keyboard.add(addr_vote)
    bot.send_message(message.chat.id,'Здравствуйте\nВы можете отслеживать ситуацию, связанную с голосованием',reply_markup=keyboard)

@bot.callback_query_handler(func=lambda call: True)
def func(call):
    if call.data == 'sv':
        keyb =  telebot.types.InlineKeyboardMarkup()
        sent_value = smart_contract.functions.sent_value().call()
        bot.send_message(chat_id=call.message.chat.id,text = "Всего проголосовали: "+str(sent_value), reply_markup=keyboard)
    elif call.data == 'result':
        count_of_vote = smart_contract.functions.count_of_vote().call()
        bot.send_message(chat_id=call.message.chat.id,text = str(count_of_vote), reply_markup=keyboard)
    elif call.data == 'vote':
        voters = ''
        val = smart_contract.functions.sent_value().call()
        for i in range(val):
                ch = smart_contract.functions.vote(i).call()
                voters += str(smart_contract.functions.voters_value(i).call())+":"+str(ch)+'\n'
        bot.send_message(chat_id=call.message.chat.id,text = "Аккаунты проголосовавших и результаты\n(True - невиновен,False - виновен)\n"+ voters, reply_markup=keyboard)


if __name__=='__main__':
    bot.polling(none_stop=True)
