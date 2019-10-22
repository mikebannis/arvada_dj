from django.contrib import admin
from comment.models import Comment, Response, Question, Assumption


class AssumptionAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation', 'num_responses')


class CommentAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation', 'author', 'num_responses')


class QuestionAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation', 'num_responses')


class ResponseAdmin(admin.ModelAdmin):
    list_filter = ('author_name',)


admin.site.register(Response, ResponseAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Assumption, AssumptionAdmin)
