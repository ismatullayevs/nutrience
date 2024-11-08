from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Profile(models.Model):

    # image = models.ImageField(upload_to="posts/",null=True, blank=True,default="user-avatar.png")
    user = models.OneToOneField("User", CustomUser, on_delete=models.CASCADE)
    age = models.IntegerField("Age",blank=False, null=False, default=0)
    height = models.IntegerField("Height", blank=False, null=False, default=0)
    weight = models.FloatField("Weght",blank=False, null=False, default=0)
    gender = models.CharField("Gender",max_length=1, choices = [("M", 'male'), ("F", "Female")])
    goal_weight = models.IntegerField("Weight_Goal")
    goal = models.ForeignKey("Goal",Goal, on_delete=models.CASCADE)
    action_level = models.ForeignKey("Action_level",Action_level, on_delete=models.CASCADE)
    diet_type = models.ForeignKey("Diet_type",Diet, on_delete=models.CASCADE)
    
    # goals = models.CharField(max_length=1, choices=[("1", "Fat loss"), ("2", "Muscle gain"), ("3", "Weight Maintenance")])
    # levels_action = models.CharField(max_length=1, choices=[("1", "Sedentary"),("2", "Lightly"),("3", "Moderately"),("4", "Very active"),("5", "Athlete")])
    # diet_type = models.CharField(max_length=1, choices=[("1","Recommend"), ("2","High Protein"), ("3","Low-Carb")])

    class Meta:
        verbose_name = ("Profile")
        verbose_name_plural = ("Profiles")

    def __str__(self):
        return self.user.email
    

class Goal(models.Model):

    name = models.CharField("Name", max_length=50)

    class Meta:
        verbose_name = ("Goal")
        verbose_name_plural = ("Goals")

    def __str__(self):
        return self.name
    
class Action_level(models.Model):

    name = models.CharField("Name", max_length=50)

    class Meta:
        verbose_name = ("Action")
        verbose_name_plural = ("Actions")

    def __str__(self):
        return self.name
    
class Diet(models.Model):

    name = models.CharField("Name", max_length=50)

    class Meta:
        verbose_name = ("Diet")
        verbose_name_plural = ("Diets")

    def __str__(self):
        return self.name


