#При помощи этого бота можно будет проголосовать
import telebot
import web3
bot = telebot.TeleBot('451678818:AAHZvN_Yh5uph4T69JvvDzGQw8mX8h5YA5U')
keyboard = telebot.types.InlineKeyboardMarkup()
#abi смарт контракта
contract_abi = [
	{
		"constant": True,
		"inputs": [],
		"name": "count_of_vote",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": False,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": True,
		"inputs": [],
		"name": "sent_value",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": False,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": False,
		"inputs": [],
		"name": "null_count",
		"outputs": [],
		"payable": False,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": True,
		"inputs": [
			{
				"name": "_i",
				"type": "uint8"
			}
		],
		"name": "voters_value",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": False,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": False,
		"inputs": [
			{
				"name": "_sent",
				"type": "bool"
			}
		],
		"name": "voting",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": False,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
#Web3(localhost - ganache)
web = web3.Web3(web3.Web3.HTTPProvider('http://127.0.0.1:8545'))
#Смарт контракт
smart_contract = web.eth.contract(address='0x0440e6e1569fb7d5198eD743d8BF3D7d5F5d2cFE',abi=contract_abi)

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
        pass


if __name__=='__main__':
    bot.polling(none_stop=True)
