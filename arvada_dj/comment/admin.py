from django.contrib import admin
from comment.models import Comment, Response, Question, Assumption

admin.site.register(Comment)
admin.site.register(Response)
admin.site.register(Question)
admin.site.register(Assumption)

# Register your models here.
