// Form inputs
var artist = document.getElementById("artist");
var album = document.getElementById("album");
var releaseDate = document.getElementById("releaseDate");
var image = document.getElementById("image");

// Another elements
var modalElement = document.getElementById("newAlbum");
var submitBtn = document.querySelector(".modal .modal-footer > .btn-primary");
var closeBtn = document.querySelector(".modal .modal-footer > .btn-default");
var addAnotherLink = document.querySelector("#newAlbum .success-message a");
var removeAlbumLinks;

// Save data
var albumListElement = document.getElementsByClassName("album-list")[0];

// Print all albums from json
getAlbums();

// Add button event
submitBtn.addEventListener("click", addAlbum);
addAnotherLink.addEventListener("click", resetForm);

// Clean form, reset modal
$('#newAlbum').on('hidden.bs.modal', function(e) { resetForm(); });


function addAlbum() {
    // Result
    var obj = {};

    if (album.value === "" || artist.value === "" || releaseDate.value === "" || image.value === "") {
        modalElement.classList.add("form-has-errors");
    } else {
        obj.album = album.value;
        obj.artist = artist.value;
        obj.releaseDate = releaseDate.value;
        obj.image = image.files[0].name;

        // Save HTML
        var node = document.createElement('div');

        node.innerHTML = createAlbumHtml(obj);

        albumListElement.appendChild(node);

        // Close modal
        modalElement.classList.add("album-is-saved");
        modalElement.classList.remove("form-has-errors");
    }

}

function resetForm() {
    // Clean form
    album.value = "";
    artist.value = "";
    releaseDate.value = "";
    image.value = "";

    // Show form,button and hide success button
    modalElement.classList.remove("album-is-saved");
    modalElement.classList.remove("form-has-errors");
}

// Return HTML
function createAlbumHtml(albumObj) {
    var html = "";
    
    html += '<div class="album clearfix panel panel-default album-' + albumObj.id + '">';
    html += '   <div class="panel-body">';
    html += '       <img src="uploads/' + albumObj.image + '" alt="" class="pull-left">';
    html += '       <a href="https://www.youtube.com/results?search_query=' + albumObj.artist + '+' + albumObj.album + '" target="_blank"  class="btn btn-default pull-right">Play <span class="glyphicon glyphicon glyphicon-volume-up" aria-hidden="true"></span></a>';
    html += '       <h3>' + albumObj.artist + ' - ' + albumObj.album + '</h3>';
    html += '       <p>' + albumObj.releaseDate + '</p>';
    html += '       <a href="#" class="btn-delete-album pull-right text-danger" data-album-id="'+ albumObj.id +'">Trinti</a>';
    html += '   </div>';
    html += '</div>';

    return html;
}

// Show all albums
function render(albums) {
    var html = "";

    if (albums.length !== 0) {
        for(var i = 0; i < albums.length; i++) {
            html += createAlbumHtml(albums[i]);
        }
        albumListElement.innerHTML = html;

        // Add "Delete" function
        registerDeleteEvents();
    } else {
        albumListElement.innerHTML = "Dar neturi albumų";
    }
}


// Connect album delete function with buttons
function registerDeleteEvents() {
    var id;
    removeAlbumLinks = document.querySelectorAll(".btn-delete-album");

    removeAlbumLinks.forEach(function(element, index) {
        element.addEventListener("click", function() {
            id = parseInt(this.getAttribute('data-album-id'));
            removeAlbum(id);
        })
    });
}
