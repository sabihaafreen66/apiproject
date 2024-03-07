const API_URL = 'https://crudcrud.com/api/06e9eb08e9f44869b988c0a0e444e01c/feedback';

// Handle star rating selection
const starInputs = document.querySelectorAll('.rating input[type="radio"]');
starInputs.forEach(starInput => {
    starInput.addEventListener('click', () => {
        const rating = starInput.value;
        starInputs.forEach(input => {
            input.checked = (input.value <= rating);
        });
    });
});

// Fetch feedback data from CRUD API endpoint
function fetchFeedback() {
    axios.get(API_URL)
        .then(response => {
            const feedbackData = response.data;
            displayFeedback(feedbackData);
        })
        .catch(error => {
            console.error('Error fetching feedback data:', error);
        });
}

// Display feedback data on the screen
function displayFeedback(feedbackData) {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = '';

    feedbackData.forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        feedbackItem.innerHTML = `
            <p>User: ${feedback.username}</p>
            <div class="rating">
                ${getRatingStars(feedback.rating)}
            </div>
            <p>Feedback: ${feedback.feedback}</p>
            <button onclick="editFeedback('${feedback._id}')">Edit</button>
            <button onclick="deleteFeedback('${feedback._id}')">Delete</button>
        `;
        feedbackList.appendChild(feedbackItem);
    });
}

// Generate HTML for rating stars with filled stars
function getRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<input type="radio" id="star${i}" name="starRating" value="${i}" ${i <= rating ? 'checked' : ''}>
                  <label for="star${i}"><i class="fas fa-star"></i></label>`;
    }
    return stars;
}

// Submit feedback form
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const feedback = Object.fromEntries(formData.entries());

    axios.post(API_URL, feedback)
        .then(() => {
            fetchFeedback(); // Refresh feedback list after submission
            this.reset(); // Clear form fields
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
        });
});

// Edit feedback
function editFeedback(feedbackId) {
    // Implement edit functionality
    console.log('Edit feedback:', feedbackId);
}

// Delete feedback
function deleteFeedback(feedbackId) {
    axios.delete(`${API_URL}/${feedbackId}`)
        .then(() => {
            fetchFeedback(); // Refresh feedback list after deletion
        })
        .catch(error => {
            console.error('Error deleting feedback:', error);
        });
}

// Initial fetch of feedback data
fetchFeedback();