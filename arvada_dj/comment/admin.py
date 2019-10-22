from django.contrib.gis import admin
from comment.models import Comment, Response, Question, Assumption


class AssumptionAdmin(admin.OSMGeoAdmin):
    list_filter = ('status', 'generation', 'num_responses')


class CommentAdmin(admin.OSMGeoAdmin):
    list_filter = ('status', 'generation', 'author', 'num_responses')


class QuestionAdmin(admin.OSMGeoAdmin):
    list_filter = ('status', 'generation', 'num_responses')


class ResponseAdmin(admin.ModelAdmin):
    list_filter = ('author_name',)


admin.site.register(Response, ResponseAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Assumption, AssumptionAdmin)
