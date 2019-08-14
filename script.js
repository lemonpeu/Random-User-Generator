const userContainer = document.getElementsByClassName('user-info-container')[0];
const dataContainer = document.getElementsByClassName('user-img-container')[0];
const nameContainer = document.getElementsByClassName('user-name')[0];
const userCity = document.getElementsByClassName('user-city')[0];
const userCountry = document.getElementsByClassName('user-country')[0];
const userPopUp = document.getElementsByClassName('user-popup')[0];
const popUpInfo = document.getElementsByClassName('user-full-information')[0];
const closeIcon = document.getElementsByClassName('icon');
const btnMore = document.getElementById('btn-loadMore');
const btnLess = document.getElementById('btn-loadLess');


let paginaPrincipal = 1;

const principal = () => {
    fetch(`https://randomuser.me/api/?page=${paginaPrincipal}&results=50&seed=abc`)
        .then(response => response.json())
        .then(data => {
            console.log(data.results);
            usersThumbnail(data.results);
        });
};



btnMore.onclick = () => {
    paginaPrincipal++;
    principal();
}

btnLess.onclick = () => {
    if(paginaPrincipal > 1) {
        paginaPrincipal--;
        principal();
    } else {
        paginaPrincipal = 1;
        principal();
    }
}

const usersThumbnail = results => {
    userContainer.innerHTML = "";
    for (const profile of results) {
        let newProfile = dataContainer.cloneNode(true);
        newProfile.children[0].src = profile.picture.large;
        newProfile.children[1].children[0].innerText = `${profile.name.first} ${profile.name.last}`;
        newProfile.children[2].innerText = `City: ${profile.location.city}`;
        newProfile.children[3].innerText = `State: ${profile.location.state}, ${profile.nat}`;
        newProfile.onclick = () => userFullInfo(profile);
        userContainer.appendChild(newProfile);
    }
}



const userFullInfo = (profile) => {
    userPopUp.style.visibility = "visible";
    userPopUp.style.opacity = "0.9";
    userPopUp.innerHTML = "";
    let popUpProfile = popUpInfo.cloneNode(true);
    popUpProfile.children[0].children[1].src = profile.picture.large;
    popUpProfile.children[0].children[2].innerText = `${profile.name.first} ${profile.name.last}`;
    popUpProfile.children[0].children[3].innerText = `City: ${profile.location.city}, State: ${profile.location.state}, ${profile.nat}`;
    popUpProfile.children[0].children[4].innerText = `Email ${profile.email}`;
    popUpProfile.children[0].children[5].innerText = `Age: ${profile.dob.age}`;
    popUpProfile.children[0].children[6].innerText = `Phone: Private. Contact for more info`;
    userPopUp.appendChild(popUpProfile);

    closeIcon[0].onclick = () => {
        userPopUp.style.visibility = "hidden";
        userPopUp.style.opacity = "0";
    };

}

// Works for mobile version

window.onclick = function (event) {
    if (event.target == userPopUp) {
        userPopUp.style.visibility = "hidden";
        userPopUp.style.opacity = "0";
    }
};

principal();