let currentIndex = 0;
const carouselImages = document.getElementById('carouselImages');
const dots = document.querySelectorAll('.dot');
let interval = setInterval(nextSlide, 5000); // Every 5 seconds
// Function to update the carousel's position and dots
function updateCarousel() {
  carouselImages.style.transform = `translateX(-${currentIndex * 100}vw)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Next slide function
function nextSlide() {
  // Move to the next index and loop back if needed
  currentIndex = (currentIndex + 1) % dots.length;
  updateCarousel();
}

// Previous slide function
function prevSlide() {
  // Move to the previous index and loop back if needed
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateCarousel();
}

// Attach event listeners to the arrow buttons
document.querySelector('.arrow.right').addEventListener('click', nextSlide);
document.querySelector('.arrow.left').addEventListener('click', prevSlide);

// Initialize the carousel
updateCarousel();