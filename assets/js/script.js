"use strict";
var sliderTime = 5000;
var SliderTimerControl = 0;

$(document).ready(function () {

      renderTestimonials(testimonialsARR);
      playSlider();

      SliderTimerControl = setTimeout(playSlider, sliderTime);

      $("#cover-caption h1").fitText(1, { minFontSize: '20px', maxFontSize: '55px' });

      //  Page navigation buttons
      $("a[href^='#']").on('click', function (e) {
            var hash = this.hash;

            $('html, body').animate({
                  scrollTop: $(hash).offset().top
            }, 1000, function () {

                  window.location.hash = hash;
            });
            return false;
      });

      $('.js-wp-1').waypoint(function (direction) {
            $('.js-wp-1').addClass('animated fadeInDown');
      }, {
                  offset: '80%'
            });

      $(".nav-toggle").on("click", function () {
            $("#nav-main").toggleClass("open");
      });

      // Change to next testimonial
      $(".testmionial-slider-left").on("click", function () {
            changeTestimonial("left");
            return false;
      });

      $(".nav-link").on("click", function () {
            $("#nav-main").removeClass("open");
            return false;
      });

      // Change to previous testimonial
      $(".testmionial-slider-right").on("click", function () {

            changeTestimonial("right");
            return false;
      });

      $(".slider-nav-control").on("click", function (e) {
            var thisTestimonial = $(this).attr("data-index-number");
            changeTestimonial("this", thisTestimonial);
            return false;
      });
});

// Testimonial object prototype
function Testimonial(firstname, lastname, title, testimonial, pictureURL) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.fullname = firstname + ' ' + lastname;
      this.title = title;
      this.testimonial = testimonial;
      this.pictureURL = pictureURL;
}

// Create new testimonials
var olofTest = new Testimonial('Olof', 'Larsson', "Student, Javascriptutvecklare - Lernia", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe aut assumenda velit quas impedit sequi illum iste eos voluptatibus provident, recusandae quia! In dolorum debitis accusamus suscipit voluptatem, sapiente id.", "https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/393268_302560479756766_1174175814_n.jpg?oh=d72b86716234548938641377804daac1&oe=58BDFACA");
var niclasTest = new Testimonial('Niclas', 'Sjöstedt', "Projektledare - Elektro team", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe aut assumenda velit quas impedit sequi illum iste eos voluptatibus provident, recusandae quia! In dolorum debitis accusamus suscipit voluptatem, sapiente id.", "https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/14095885_10155384602429852_7106269000411252661_n.jpg?oh=766a77567c1c716bd800eb3dd7a5b656&oe=58C5B208");
var emelieTest = new Testimonial('Emelie', 'Jacobsson', "Lärare - Ekhagen förskola", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe aut assumenda velit quas impedit sequi illum iste eos voluptatibus provident, recusandae quia! In dolorum debitis accusamus suscipit voluptatem, sapiente id.", "https://scontent-fra3-1.xx.fbcdn.net/v/t1.0-9/14702283_10154032622206705_3344385999197099248_n.jpg?oh=9b634b246a43c550bf0e71e130cba24c&oe=58B38EE0");

// Creating array to hold testimonials
var testimonialsARR = [];

// Add testimonial objects to testimonialsARR
testimonialsARR.push(olofTest, niclasTest, emelieTest);

function renderTestimonials(testimonialsArray) {

      for (var i = 0; i < testimonialsArray.length; i++) {
            var testimonialNumber = i + 1;
            // Create testimonial html string
            var testimonialHTML = '<div class="testimonial-slider-item hide col-sm-12">';
            testimonialHTML += '<div class="col-md-3 col-xs-12 offset-sm-1">';
            testimonialHTML += '<img src="' + testimonialsArray[i].pictureURL + '" alt="Picture of ' + testimonialsArray[i].fullname + '">';
            testimonialHTML += '</div>';
            testimonialHTML += '<div class="col-md-8 col-xs-12">';
            testimonialHTML += '<div class="Testimonial-name"><cite>— <strong>' + testimonialsARR[i].fullname + '</strong>, ' + testimonialsARR[i].title + '</cite></div>';
            testimonialHTML += '<blockqoute class="testimonial-message">' + testimonialsArray[i].testimonial + '</blockqoute>';
            testimonialHTML += '</div>';
            testimonialHTML += '</div>';

            // Create slider nav button
            var sliderNavControl = '<a href="" class="current slider-nav-control" data-index-number="' + testimonialNumber + '"><i class="fa fa-circle-o" aria-hidden="true"></i></a>';

            // Render testimonial html string to index
            slider.insertAdjacentHTML('beforeend', testimonialHTML);
            sliderNavControlsContainer.insertAdjacentHTML('beforeend', sliderNavControl);
      }
}

var slider = document.getElementById("slider-container");
var sliderItems = document.getElementsByClassName("testimonial-slider-item");
var sliderNavControlsContainer = document.getElementById("testimonials-slider-nav");
var sliderNavButtons = sliderNavControlsContainer.getElementsByTagName("a");
var sliderButtons = document.getElementsByClassName("testmionial-slider-button");
var counter = 0;

function resetSliderTimer() {
      clearTimeout(SliderTimerControl);
      SliderTimerControl = setTimeout(playSlider, sliderTime);
}

function changeTestimonial(buttonClicked, item) {
      if (buttonClicked === "this") {
            counter = item - 1;
      }

      else if (buttonClicked === "left") {
            counter--;
      }
      else if (buttonClicked === "right") {
            counter++;
      }

      // If counter is smaller than sliderItems.length -1 set 0
      if (counter > sliderItems.length - 1) {
            counter = 0;
      }

      // If counter is smaller than 0 set counter to sliderItems.length - 1
      else if (counter < 0) {
            counter = sliderItems.length - 1;
      }

      for (var i = 0; i < sliderItems.length; i++) {
            // If testimonial is not the one ask for, hide it
            if (i != counter) {
                  $(sliderItems[i]).hide();
                  // Change nav control
                  $(sliderNavButtons[i]).removeClass("current");
            }
      }
      // Show testimonial
      $(sliderItems[counter]).fadeIn();
      // Update nav control
      $(sliderNavButtons[counter]).addClass("current");
      // Reset interval
      resetSliderTimer();
}

function playSlider() {
      changeTestimonial("right");
      resetSliderTimer();
}



