import telebot
import web3
//При помощи этого бота можно будет проголосовать 
bot = telebot.TeleBot('451678818:AAHZvN_Yh5uph4T69JvvDzGQw8mX8h5YA5U')
@bot.message_handler(commands=["start"])
def mes(message):
    bot.send_message(message.chat.id,'Здравствуйте')

if __name__=='__main__':
    bot.polling(none_stop=True)
