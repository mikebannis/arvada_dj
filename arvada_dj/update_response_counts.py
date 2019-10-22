"""
Update response counts for all models. Run with:

$ python manage.py shell < update_response_counts.py
"""

from comment.models import Question, Comment, Assumption


def update(c):
    print('Updating', c)
    c.num_responses = len(c.responses.all())
    print('\t', c.num_responses, ' responses')
    c.save()


cs = Comment.objects.all()
for c in cs:
    update(c)

cs = Assumption.objects.all()
for c in cs:
    update(c)

cs = Question.objects.all()
for c in cs:
    update(c)
