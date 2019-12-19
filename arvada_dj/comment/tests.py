from datetime import datetime as dt

from django.test import TestCase
from django.contrib.auth.models import User, Group

from .models import Comment


class CloseCommItemTestCase(TestCase):
    """ Verify comment closing URL works """
    def setUp(self):
        self.mike = User.objects.create(username='mike')
        self.mike.set_password('mike')
        self.mike.save()

        self.test_user = User.objects.create(username='test')
        self.test_user.set_password('test')
        self.test_user.save()

        self.RESPEC = Group.objects.create(name='RESPEC')
        self.RESPEC.user_set.add(self.mike)
        self.RESPEC.save()

        c = Comment.objects.create(pk=1, owner=self.mike, status='unread',
                                   time_stamp=dt.now())
        print(c)
        c.save()

    def test_close_comment_no_login(self):
        # Not logged in, should redirect to login
        response = self.client.get('/close-comm-item/comment/1/')
        self.assertEqual(response.status_code, 302)
        c = Comment.objects.get(pk=1)
        self.assertEqual(c.status, 'unread')

    def test_close_comment_no_group(self):
        # logged in as test, should redirect
        login = self.client.login(username='test', password='test')
        self.assertTrue(login)
        response = self.client.get('/close-comm-item/comment/1/')
        self.assertEqual(response.status_code, 302)
        c = Comment.objects.get(pk=1)
        self.assertEqual(c.status, 'unread')

    def test_close_comment_right_group(self):
        # Logged in as mike (RESPEC), should pass
        login = self.client.login(username='mike', password='mike')
        self.assertTrue(login)
        response = self.client.get('/close-comm-item/comment/1/')
        self.assertEqual(response.status_code, 200)
        c = Comment.objects.get(pk=1)
        self.assertEqual(c.status, 'closed')
