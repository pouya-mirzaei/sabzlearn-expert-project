import { getAllCourses } from '../functions/api/top-bar.js';

const $ = document;
const landingTitle = $.querySelector('.landing__title');
const landingCoursesCount = $.querySelector('#courses-count');
const landingMinutesCount = $.querySelector('#minutes-counter');
const landingUsersCount = $.querySelector('#users-counter');

window.addEventListener('load', () => {
  displayNewestCourses();

  let landingText = 'ما به هر قیمتی دوره آموزشی تولید نمی کنیم !';
  let typeIndex = 0;

  typeWriter(landingText, typeIndex);
  makeCounter(40, landingCoursesCount);
  makeCounter(3_320, landingMinutesCount);
  makeCounter(3_071, landingUsersCount);
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function makeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter === max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter++;
  }, 0.5);
}

// courses

async function displayNewestCourses() {
  const courses = await getAllCourses();

  const coursesContainer = document.querySelector('.courses-content').children[0].children[0];
  coursesContainer.innerHTML = '';

  let covers = ['fareelancer.png', 'jango.png', 'js_project.png', 'nodejs.png', 'python.png', 'youtuber.png'];

  courses.slice(0, 6).map((course, i) => {
    coursesContainer.insertAdjacentHTML(
      'beforeend',
      `
    <div class="col-4">
    <div class="course-box">
      <a href="#">
        <img src="images/courses/${covers[i]}" alt="Course img" class="course-box__img" />
      </a>
      <div class="course-box__main">
        <a href="#" class="course-box__title">${course.name}</a>

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
          ${handleCourseRatting(course.courseAverageScore)}

          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${course.price ? course.price : 'رایگان'}</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>

    </div>
  </div>
    `
    );
  });
}

function handleCourseRatting(rating) {
  let fill = rating;
  let white = 5 - fill;

  let result = [];

  for (let i = 0; i < fill; i++) {
    result.push('<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">');
  }
  for (let i = 0; i < white; i++) {
    result.push('<img src="images/svgs/star.svg" alt="rating" class="course-box__star">');
  }

  return result.join('');
}