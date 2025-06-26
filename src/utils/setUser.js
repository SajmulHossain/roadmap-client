const localUser = (loggedIn) => {
    if(loggedIn) {
        localStorage.setItem("user", true);
    }

    if(!loggedIn) {
        localStorage.removeItem("user");
    }
}

export default localUser;