const images = [
    { src: 'modern sofa.jpg', alt: 'Modern Sofa' },
    { src: 'table.jpeg', alt: 'Dining Table' },
    { src: 'chair.webp', alt: 'Lounge Chair' }
  ];
  
  let current = 0; // Keeps track of the current image index
  
  // Function to update the carousel image based on the current index
  function updateCarousel() {
    // Get the carousel images container and ensure we have the images in place
    const carouselImages = document.getElementById("carousel-images");
  
    // Clear the previous images inside the container
    carouselImages.innerHTML = ''; 
  
    // Dynamically add the images from the 'images' array
    images.forEach((image, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt;
      imgElement.style.display = index === current ? 'block' : 'none'; // Show only the current image
      carouselImages.appendChild(imgElement);
    });
  
    // Disable prev/next buttons if at the start/end
    document.getElementById('prevBtn').disabled = current === 0;
    document.getElementById('nextBtn').disabled = current === images.length - 1;
  }
  
  // Function to show the next image
  function nextImage() {
    if (current < images.length - 1) {
      current++;
      updateCarousel();
    }
  }
  
  // Function to show the previous image
  function prevImage() {
    if (current > 0) {
      current--;
      updateCarousel();
    }
  }
  
  // Initialize carousel by updating it on page load
  window.onload = updateCarousel;
  
  
  // Task 3: Fetch a Joke from API
  async function getJoke() {
    try {
      const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
      const data = await res.json();
      document.getElementById("joke").innerText = `${data.setup} — ${data.punchline}`;
    } catch (error) {
      document.getElementById("joke").innerText = "Oops! Couldn't load a joke.";
    }
  }
  
  // Task 4: Quiz Logic (Correct/Incorrect)
  document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const answers = {
      q1: "Oak",
      q2: "Sleeping",
      q3: "Modern",
      q4: "Metal"
    };
  
    let score = 0;
  
    for (let key in answers) {
      const selected = document.querySelector(`input[name="${key}"]:checked`);
      if (selected && selected.value === answers[key]) {
        score++;
      }
    }
  
    const result = document.getElementById("quizResult");
    result.textContent = `You got ${score} out of 4 correct!`;
  });
  