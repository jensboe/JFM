from django.db import models


class Member(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)

    @property
    def fullname(self) -> str:
        return f'{self.firstname} {self.lastname}'

    def __str__(self) -> str:
        return self.fullname
