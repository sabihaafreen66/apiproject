const apiUrl = 'https://crudcrud.com/api/6e8ec520e4cd4347b633adfea8849b94/dishes'; // Your CRUD CRUD API endpoint

// Function to fetch dishes and display them in respective tables
async function fetchAndDisplayDishes() {
    try {
        const response = await axios.get(apiUrl);
        const dishes = response.data;

        dishes.forEach(dish => {
            const tableId = `table${dish.tableNumber}`;
            const tableDiv = document.getElementById(tableId);
            const dishDiv = document.createElement('div');
            dishDiv.textContent = `${dish.name} - ₹${dish.price}`;
            dishDiv.innerHTML += `<button onclick="deleteDish('${dish._id}')">Delete</button>`;
            tableDiv.appendChild(dishDiv);
        });
    } catch (error) {
        console.error('Error fetching dishes:', error);
    }
}

// Function to delete a dish
async function deleteDish(id) {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        location.reload(); // Reload the page to reflect changes
    } catch (error) {
        console.error('Error deleting dish:', error);
    }
}

// Event listener for form submission
document.getElementById('addDishForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const dishName = document.getElementById('dishName').value;
    const price = document.getElementById('price').value;
    const tableNumber = document.getElementById('tableNumber').value;

    try {
        const response = await axios.post(apiUrl, { name: dishName, price: price, tableNumber: tableNumber });
        const newDish = response.data;

        const tableId = `table${tableNumber}`;
        const tableDiv = document.getElementById(tableId);
        const dishDiv = document.createElement('div');
        dishDiv.textContent = `${newDish.name} - ₹${newDish.price}`;
        dishDiv.innerHTML += `<button onclick="deleteDish('${newDish._id}')">Delete</button>`;
        tableDiv.appendChild(dishDiv);
    } catch (error) {
        console.error('Error adding dish:', error);
    }
});

// Fetch and display dishes when the page loads
fetchAndDisplayDishes();
