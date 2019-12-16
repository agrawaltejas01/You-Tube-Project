from django.conf.urls import url
from . import views

urlpatterns = [
    # Blank indicates that this is homepage of this app
    # /word_finder
    url(r'^$', views.index, name = "index"),   
    url(r'^found.html$', views.result ,name = "result") ,
]