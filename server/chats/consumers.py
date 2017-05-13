import json
import logging
from channels.sessions import channel_session
from .models import ChatItem
from topics.models import TopicItem
from channels import Group

log = logging.getLogger(__name__)


@channel_session
def ws_connect(message):
    print(message.reply_channel.name)
    message.reply_channel.send({
        "text": json.dumps({
            "action": "reply_channel",
            "reply_channel": message.reply_channel.name,
        })
    })
    path_particle = message.content['path'].split('/')
    print('path', path_particle)
    if len(path_particle) == 5:
        group_name = path_particle[-1]
        Group(group_name).add(message.reply_channel)



@channel_session
def ws_disconnect(message):
    print('ws disconnected', message.content)
    path_particle = message.content['path'].split('/')
    if len(path_particle) == 5:
        group_name = path_particle[-1]
        print('discard', group_name)
        Group(group_name).discard(message.reply_channel)


@channel_session
def ws_receive(message):
    try:
        data = json.loads(message['text'])
        print(data)
    except ValueError:
        log.debug("ws message isn't json text=%s", message['text'])
        return


def new_chat_receive(chat_id):
    chat_item = ChatItem.objects.get(id=chat_id)
    print('Channel Name : ', chat_item.topic.name)
    Group(chat_item.topic.id).send({
        "text": json.dumps({
            "action": "new_chat_receive",
            "payload": {
                "id": chat_item.id,
                "topic_id": chat_item.topic.id,
                "sender": chat_item.user
            },
            "timestamp": chat_item.timestamp.strftime("%Y-%M-%D %h:%m:%s")
        })
    })

def update_chat_room_member_num(topic_id):
    topic = TopicItem.objects.get(id=topic_id)
    Group(topic.id).send({
        "text": json.dumps({
            "action": "update_chat_room_member_num",
            "payload": {
                "topic_id": topic.id,
                "member_num": topic.member_num
            }
        })
    })
