// function toggleChatbot() {
//   const bot = document.getElementById('chatbot');
//   bot.style.display = (bot.style.display === 'none') ? 'block' : 'none';
// }

// function sendMessage() {
//   const input = document.getElementById('userInput');
//   const message = input.value.trim();
//   if (message === '') return;

//   const chatlog = document.getElementById('chatlog');
//   chatlog.innerHTML += `<div><b>You:</b> ${message}</div>`;

//   let reply = 'Sorry, I didn’t understand that.';
//   if (message.toLowerCase().includes('movie')) reply = 'You can search your favorite movies above!';
//   if (message.toLowerCase().includes('hello')) reply = 'Hi there! Need help with something?';
//   if (message.toLowerCase().includes('recommend')) reply = 'I recommend watching “Interstellar” or “The Dark Knight”!';

//   chatlog.innerHTML += `<div><b>Bot:</b> ${reply}</div>`;
//   input.value = '';
//   chatlog.scrollTop = chatlog.scrollHeight;
// }
function toggleChatbot() {
  const bot = document.getElementById('chatbot');
  bot.style.display = (bot.style.display === 'none') ? 'block' : 'none';
}

function sendMessage() {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (message === '') return;

  const chatlog = document.getElementById('chatlog');
  chatlog.innerHTML += `<div><b>You:</b> ${message}</div>`;

  getMovieRecommendations(message);
  input.value = '';
  chatlog.scrollTop = chatlog.scrollHeight;
}

function getMovieRecommendations(query) {
  const apiKey = "4f1994b84ce94fac684a89f69b85d759";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const chatlog = document.getElementById('chatlog');
      if (data.results.length > 0) {
        const movie = data.results[0];
        chatlog.innerHTML += `<div><b>Bot:</b> How about watching "${movie.title}"?</div>`;
      } else {
        chatlog.innerHTML += `<div><b>Bot:</b> Sorry, I couldn't find any movies for that.</div>`;
      }
      chatlog.scrollTop = chatlog.scrollHeight;
    })
    .catch(error => console.log(error));
}

// Show popular movies on load
const apiKey = "4f1994b84ce94fac684a89f69b85d759";
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const movieContainer = document.getElementById('movie-container');
    data.results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}" />
        <h4>${movie.title}</h4>
      `;
      movieContainer.appendChild(movieElement);
    });
  })
  .catch(error => console.log(error));