from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Profile(models.Model):

    # image = models.ImageField(upload_to="posts/",null=True, blank=True,default="user-avatar.png")
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField("Age",blank=False, null=False, default=0)
    height = models.IntegerField("Height", blank=False, null=False, default=0)
    weight = models.FloatField("Weght",blank=False, null=False, default=0)
    gender = models.CharField("Gender",max_length=1, choices = [("M", 'male'), ("F", "Female")])
    target_weight = models.IntegerField("Weight_Goal")
    goal = models.CharField(max_length=1, choices=[("1", "Fat loss"), ("2", "Muscle gain"), ("3", "Weight Maintenance")])
    activity_level = models.CharField(max_length=1, choices=[("1", "Sedentary"),("2", "Lightly"),("3", "Moderately"),("4", "Very active"),("5", "Athlete")])
    diet_type = models.CharField(max_length=1, choices=[("1","Recommend"), ("2","High Protein"), ("3","Low-Carb")])

    class Meta:
        verbose_name = ("Profile")
        verbose_name_plural = ("Profiles")

    def __str__(self):
        return self.user.email
