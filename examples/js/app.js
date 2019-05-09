backend.invoke("say_hello", ["test"])
    .catch(err => {
        console.log(err); // Invalid argument
    })

backend.invoke("say_hello", "Maxim")
    .then(res => {
        alert(res); // Hello Maxim!
    })
    .catch(err => {
        console.log(err);
    })