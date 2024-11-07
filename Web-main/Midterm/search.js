document.getElementById("btn_search").addEventListener("click", () => {
    const checkin = new Date(document.getElementById("checkin").value);
    const checkout = new Date(document.getElementById("checkout").value);
    const adults = parseInt(document.getElementById("adults").value) || 0;
    const kids = parseInt(document.getElementById("kids").value) || 0;
    const rooms = document.getElementById("rooms").value.trim();

    if (checkout && checkin && checkout < checkin) {
        alert('Checkout date cannot be earlier than check-in date.');
        return;
    }

    fetch('https://6720dc1498bbb4d93ca66136.mockapi.io/v2/T-room')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(bookings => {
            const filteredBookings = bookings.filter(booking => {
                const arrivalDay = new Date(booking.arrivalDay);
                const outDay = new Date(booking.outDay);
                return (
                    (!checkin || arrivalDay <= checkin) &&
                    (!checkout || outDay >= checkout) &&
                    (adults === 0 || booking.adults >= adults) &&
                    (kids === 0 || booking.kids >= kids) &&
                    (rooms === '' || booking.roomtype === rooms)
                );
            });
            displayResults(filteredBookings);
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
            alert('An error occurred while fetching booking data.');
        });
});

function displayResults(bookings) {
    const divResult = document.getElementById("div_result");
    divResult.innerHTML = '';

    if (bookings.length === 0) {
        divResult.innerHTML = "<p style='color: white'>No results found.</p>";
        return;
    }

    bookings.forEach(booking => {
        const bookingElement = document.createElement("div");
        bookingElement.classList.add("booking-card");
        bookingElement.innerHTML = `
            <h3>Booking ID: ${booking.id}</h3>
            <img src="${booking.image}" id="search_img" />
            <h4>${booking.roomtype}</h4>
            <p>Price: ${booking.price}</p>
            <p>Adults: ${booking.adults}</p>
            <p>Kids: ${booking.kids}</p>
            <p>Check-in Date: ${new Date(booking.arrivalDay).toLocaleDateString()}</p>
            <p>Check-out Date: ${new Date(booking.outDay).toLocaleDateString()}</p>
        `;
        divResult.appendChild(bookingElement);
    });
}

function clearSearch() {
    document.getElementById("checkin").value = "";
    document.getElementById("checkout").value = "";
    document.getElementById("adults").value = "";
    document.getElementById("kids").value = "";
    document.getElementById("rooms").value = "";
}