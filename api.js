// Gauk visus albumus
function getAlbums() {
    $.ajax("http://localhost:3000/albums", {
        success: function(data) {
            render(data);
        },
        error: function() {
            console.log('There was a problem with the request.');
        }
    });
}


// Ištrinti vieną albumą
function removeAlbum(id) {
    // Trinam iš HTML
    var element = document.querySelector('.album-' + id);
    element.remove();

    // Trinan iš duomenų bazės
    $.ajax("http://localhost:3000/albums/" + id, {
        type: "DELETE",
        success: function() {
            console.log("Albumas ištrintas sėkmingai");
        },
        error: function() {
            console.log('There was a problem with the request.');
        }
    });
}