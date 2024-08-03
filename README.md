#  Movie Recommendation Engine

This project is a web application that provides users with random movie recommendations based on selected genres, languages, and other criteria. Users can specify filters such as average vote score and number of votes using sliders, making it easier to discover new and interesting movies.

## Features

- **Select Genre:** Choose from various movie genres to get recommendations.
- **Select Original Language:** Filter movies based on their original language.
- **Filter by Average Vote Score:** Use a slider to set a minimum average vote score for recommended movies.
- **Filter by Number of Votes:** Use a slider to set a minimum number of votes for recommended movies.
- **Responsive Design:** The app is fully responsive and adapts to mobile and desktop screens.
- **Dynamic Movie Details:** Displays detailed information about each recommended movie, including title, genre, director, cast, plot, rating, vote count, runtime, and budget.

## Technologies Used

- **HTML5:** Structure and layout of the app.
- **CSS3:** Styling and responsive design.
- **JavaScript:** Interactivity and API integration.
- **TMDB API:** Fetching movie data and details.

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- Internet connection to fetch movie data from the TMDB API.

### Installation

1. **Clone the Repository:**

   ```
   git clone https://github.com/mihnearad/Movie-Recommendation-Engine
   ```

2. **Navigate to the Project Directory:**

   ```
   cd Movie-Recommendation-Engine
   ```

3. **Set Up the TMDB API Key:**

   - Sign up at [The Movie Database (TMDB)](https://www.themoviedb.org/) to get an API key.
   - Replace `'your_actual_tmdb_api_key'` in `script.js` with your TMDB API key.

   ```javascript
   const apiKey = 'your_actual_tmdb_api_key'; // Replace with your TMDB API Key
   ```

4. **Open `index.html` in Your Browser:**

   You can open the `index.html` file directly in your browser to run the application.

## Usage

- Select a genre and original language from the dropdowns.
- Adjust the sliders to set the minimum average vote score and number of votes.
- Click "Get Recommendation" to receive a random movie suggestion based on your criteria.
- View detailed information about the recommended movie, including its poster and plot summary.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API and movie data.
- All contributors and developers for their valuable input and support.

## Contact

For any inquiries, please contact [contact@mihnea-radulescu.com](mailto:contact@mihnea-radulescu.com).
