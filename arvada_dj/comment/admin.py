from django.contrib import admin
from comment.models import Comment, Response, Question, Assumption

class AssumptionAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation')

class CommentAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation', 'author')

class QuestionAdmin(admin.ModelAdmin):
    list_filter = ('status', 'generation')

admin.site.register(Response)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Assumption, AssumptionAdmin)

