// script.js

const apiKey = "f157fa7a4c265d4b4b4035a2dad50ea6"; // Replace with your TMDB API Key
const genreSelect = document.getElementById("genre");
const languageSelect = document.getElementById("language");
const voteAverageSlider = document.getElementById("vote-average");
const voteCountSlider = document.getElementById("vote-count");
const voteAverageDisplay = document.getElementById("vote-average-display");
const voteCountDisplay = document.getElementById("vote-count-display");
const getMovieButton = document.getElementById("get-movie");
const movieDetails = document.getElementById("movie-details");

// Update slider displays
voteAverageSlider.addEventListener("input", () => {
  voteAverageDisplay.textContent = voteAverageSlider.value;
});

voteCountSlider.addEventListener("input", () => {
  voteCountDisplay.textContent = voteCountSlider.value;
});

// Function to fetch available languages from TMDB
async function fetchLanguages() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
    );
    if (!response.ok)
      throw new Error(`Error fetching languages: ${response.status}`);
    const data = await response.json();

    data.forEach((language) => {
      const option = document.createElement("option");
      option.value = language.iso_639_1;
      option.textContent = language.english_name;
      languageSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error fetching languages:", error);
  }
}

// Fetch genres from TMDB
async function fetchGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    if (!response.ok)
      throw new Error(`Error fetching genres: ${response.status}`);
    const data = await response.json();

    if (data.genres) {
      data.genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.name;
        genreSelect.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
}

// Function to fetch a random movie by genre, language, and additional filters
async function fetchRandomMovie(
  genreId,
  language,
  voteAverageGte,
  voteCountGte
) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&with_original_language=${language}&vote_average.gte=${voteAverageGte}&vote_count.gte=${voteCountGte}&sort_by=popularity.desc`
    );

    if (!response.ok)
      throw new Error(`Error discovering movies: ${response.status}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      const movieDetailsData = await fetchMovieDetails(
        randomMovie.id,
        language
      );
      displayMovieDetails(movieDetailsData);
    } else {
      movieDetails.innerHTML = "<p>No movies found for the given criteria.</p>";
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    movieDetails.innerHTML =
      "<p>Failed to fetch movie data. Please try again later.</p>";
  }
}

// Function to fetch movie details and credits
async function fetchMovieDetails(movieId, language) {
  try {
    // Fetch movie details
    const movieResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&with_original_language=${language}`
    );
    if (!movieResponse.ok)
      throw new Error(`Error fetching movie details: ${movieResponse.status}`);
    const movieDetails = await movieResponse.json();

    // Fetch movie credits
    const creditsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    );
    if (!creditsResponse.ok)
      throw new Error(
        `Error fetching movie credits: ${creditsResponse.status}`
      );
    const credits = await creditsResponse.json();

    // Add credits to movie details
    movieDetails.credits = credits;
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details and credits:", error);
  }
}

function displayMovieDetails(movie) {
  const director =
    movie.credits?.crew?.find((person) => person.job === "Director")?.name ||
    "N/A";
  const actors =
    movie.credits?.cast
      ?.slice(0, 5)
      .map((actor) => actor.name)
      .join(", ") || "N/A";

  movieDetails.innerHTML = `
      <h2>${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  } Poster">
      <p><strong>Genre:</strong> ${
        movie.genres.map((genre) => genre.name).join(", ") || "N/A"
      }</p>
      <p><strong>Director:</strong> ${director}</p>
      <p><strong>Actors:</strong> ${actors}</p>
      <p><strong>Plot:</strong> ${movie.overview || "N/A"}</p>
      <p><strong>Rating:</strong> ${movie.vote_average || "N/A"}/10</p>
      <p><strong>Vote Count:</strong> ${movie.vote_count || "N/A"}</p>
      <p><strong>Runtime:</strong> ${movie.runtime || "N/A"} minutes</p>
      <p><strong>Budget:</strong> $${formatNumber(movie.budget) || "N/A"}</p>
  `;

  movieDetails.classList.add("show");
}

// Function to format large numbers with commas
function formatNumber(num) {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
}

// Event listener for the button
getMovieButton.addEventListener("click", () => {
  const selectedGenre = genreSelect.value;
  const selectedLanguage = languageSelect.value || "en";
  const voteAverage = voteAverageSlider.value;
  const voteCount = voteCountSlider.value;
  movieDetails.classList.remove("show");

  if (selectedGenre) {
    fetchRandomMovie(selectedGenre, selectedLanguage, voteAverage, voteCount);
  } else {
    movieDetails.innerHTML = "<p>Please select a genre first.</p>";
  }
});

// Fetch genres and languages on page load
fetchGenres();
fetchLanguages();
