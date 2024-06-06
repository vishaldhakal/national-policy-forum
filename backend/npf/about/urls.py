from django.urls import path
from . import views

urlpatterns = [
    path("faq/", views.FAQListCreate.as_view(), name="faq_list_create"),
    path(
        "faq/<int:pk>/",
        views.FAQRetrieveUpdateDestroy.as_view(),
        name="faq_retrieve_update_destroy",
    ),
    path(
        "testimonial/",
        views.TestimonialListCreate.as_view(),
        name="testimonial_list_create",
    ),
    path(
        "testimonial/<int:pk>/",
        views.TestimonialRetrieveUpdateDestroy.as_view(),
        name="testimonial_retrieve_update_destroy",
    ),
    path("our-team/", views.OurTeamListCreate.as_view(), name="our_team_list_create"),
]
