const API_URL = 'https://671a0554acf9aa94f6a8c48f.mockapi.io/Hotel';

function getHotels(callback) {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function createHotel(hotelData, callback) {
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData)
    })
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function updateHotel(id, hotelData, callback) {
    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData)
    })
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function deleteHotel(id, callback) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}

function handleHotels(error, data) {
    if (error) {
        console.error('Error:', error);
        return;
    }

    const hotelTableBody = document.getElementById('hotelTableBody');
    hotelTableBody.innerHTML = '';

    data.forEach(hotel => {
        const row = `
            <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${hotel.price}</td>
                <td>${hotel.location}</td>
                <td class="actions">
                    <button onclick="editHotel('${hotel.id}', '${hotel.name}', ${hotel.price}, '${hotel.location}')">Edit</button>
                    <button onclick="removeHotel('${hotel.id}')">Delete</button>
                </td>
            </tr>`;
        hotelTableBody.innerHTML += row;
    });
}

window.onload = function() {
    getHotels(handleHotels);
}

function handleSubmit() {
    const hotelId = document.getElementById('hotelId').value;
    const hotelData = {
        name: document.getElementById('hotelName').value,
        price: Number(document.getElementById('hotelPrice').value),
        location: document.getElementById('hotelLocation').value
    };

    if (hotelId) {
        updateHotel(hotelId, hotelData, (error, data) => {
            if (error) {
                console.error('Error updating hotel:', error);
                return;
            }
            resetForm();
            getHotels(handleHotels);
        });
    } else {
        createHotel(hotelData, (error, data) => {
            if (error) {
                console.error('Error creating hotel:', error);
                return;
            }
            resetForm();
            getHotels(handleHotels);
        });
    }
}

function editHotel(id, name, price, location) {
    document.getElementById('hotelId').value = id;
    document.getElementById('hotelName').value = name;
    document.getElementById('hotelPrice').value = price;
    document.getElementById('hotelLocation').value = location;
    document.querySelector('#hotelForm button').textContent = 'Update Hotel';
}

function removeHotel(id) {
    if (confirm('Are you sure you want to delete this hotel?')) {
        deleteHotel(id, (error, data) => {
            if (error) {
                console.error('Error deleting hotel:', error);
                return;
            }
            getHotels(handleHotels);
        });
    }
}

function resetForm() {
    document.getElementById('hotelId').value = '';
    document.getElementById('hotelName').value = '';
    document.getElementById('hotelPrice').value = '';
    document.getElementById('hotelLocation').value = '';
    document.querySelector('#hotelForm button').textContent = 'Add Hotel';
}
