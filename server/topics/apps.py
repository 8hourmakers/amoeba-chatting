from django.apps import AppConfig

INIT_TOPICS = [
    {
        'parent_id': 1,
        'name': '음식',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025654/463b384e-3827-11e7-8eeb-8dd2a5471e0a.png'
    },
    {
        'parent_id': 1,
        'name': '19',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025657/5c71065c-3827-11e7-9372-14dca31b54e5.png'
    },
    {
        'parent_id': 1,
        'name': '덕질',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025658/707cd7ac-3827-11e7-90c1-9c393ef95cb7.png'
    },

    {
        'parent_id': 1,
        'name': '뷰티',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025661/8811ad16-3827-11e7-8e31-0f02217cc8d3.png'
    },

    {
        'parent_id': 1,
        'name': '이슈',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025665/9bdfdd90-3827-11e7-8e04-b17ab3f1b26b.png'
    },

    {
        'parent_id': 1,
        'name': '육아',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025668/b57d1a9c-3827-11e7-8959-b5bb63342e32.png'
    },

    {
        'parent_id': 1,
        'name': '게임',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025671/c89c1e20-3827-11e7-9d90-092b7f837835.png'
    },

    {
        'parent_id': 1,
        'name': '스포츠',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025674/d999c02e-3827-11e7-9858-f2b3b5e34c6f.png'
    },

    {
        'parent_id': 1,
        'name': '스터디',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025642/f3a04f2a-3826-11e7-92ca-a2021b59d1f8.png'
    },

    {
        'parent_id': 1,
        'name': '반려동물',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025683/fb426c9e-3827-11e7-9f32-11311fa7185c.png'
    },

    {
        'parent_id': 1,
        'name': '자동차',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025690/03dd6bce-3828-11e7-8d0e-5e933c14d601.png'
    },

    {
        'parent_id': 1,
        'name': '고민',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025695/2033d7d6-3828-11e7-814d-54f3769f7e55.png'
    },

    {
        'parent_id': 1,
        'name': '다이어트',
        'background_image_url': 'https://cloud.githubusercontent.com/assets/8446067/26025707/4f2430ae-3828-11e7-8da5-ab0768a135d1.png'
    },
]


class TopicsConfig(AppConfig):
    name = 'topics'
    verbose_name = "Amoeba Chatting"

    def ready(self):
        from topics.models import TopicItem
        if not TopicItem.objects.filter(name='ROOT').exists():
            topic_item = TopicItem.objects.create(name='ROOT')
            for each_topic in INIT_TOPICS:
                topic_item = TopicItem.objects.create(
                    name=each_topic['name'],
                    parent_id=each_topic['parent_id'],
                    background_image_url=each_topic['background_image_url']
                )

