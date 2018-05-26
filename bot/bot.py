#При помощи этого бота можно будет проголосовать
import telebot
import web3
bot = telebot.TeleBot('451678818:AAHZvN_Yh5uph4T69JvvDzGQw8mX8h5YA5U')

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
smart_contract = web.eth.contract(address='0x50BF96206d96d51C50A92D0123DE28047Ea7Fa1b',abi=contract_abi)

@bot.message_handler(commands=["start"])
def mes(message):
    keyboard = telebot.types.InlineKeyboardMarkup()
    s_v = telebot.types.InlineKeyboardButton(text="Количество голосов",callback_data='sv')
    keyboard.add(s_v)
    #result = telebot.types.InlineKeyboardButton(text="Приговор",callback_data='result')
    #keyboard.add(result)
    bot.send_message(message.chat.id,'Здравствуйте\nВы можете отслеживать ситуацию, связанную с голосованием',reply_markup=keyboard)

@bot.callback_query_handler(func=lambda call: True)
def func(call):
    if call.data == 'sv':
        sent_value = smart_contract.functions.sent_value().call()
        bot.edit_message_text(chat_id = call.message.chat.id, message_id = call.message.message_id, text = "Всего проголосовали: "+str(sent_value))
    #elif call.data == 'result':
    #    count_of_vote = smart_contract.functions.count_of_vote().call()
    #    bot.edit_message_text(chat_id = call.message.chat.id, message_id = call.message.message_id, text = str(count_of_vote))

if __name__=='__main__':
    bot.polling(none_stop=True)
