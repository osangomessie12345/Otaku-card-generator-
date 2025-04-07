    function genererCarte() {  
        const pseudo = document.getElementById("pseudo").value;  
        const nom = document.getElementById("nom").value;  
        const nationalite = document.getElementById("nationalite").value;  
        const statut = document.getElementById("statut").value;  
        const genre = document.getElementById("genre").value;  
        const citation = document.getElementById("citation").value;  
        const file = document.getElementById("photoInput").files[0];  

        if (!pseudo || !nom || !nationalite || !statut || !genre || !citation) {  
            alert("Veuillez remplir tous les champs obligatoires !");  
            return;  
        }  

        if (file) {  
            const reader = new FileReader();  
            reader.onload = function (e) {  
                localStorage.setItem("otakuPhoto", e.target.result);  
                window.location.href = `carte.html?pseudo=${encodeURIComponent(pseudo)}&nom=${encodeURIComponent(nom)}&nationalite=${encodeURIComponent(nationalite)}&statut=${encodeURIComponent(statut)}&genre=${encodeURIComponent(genre)}&citation=${encodeURIComponent(citation)}`;  
            };  
            reader.readAsDataURL(file);  
        } else {   
            window.location.href = `carte.html?pseudo=${encodeURIComponent(pseudo)}&nom=${encodeURIComponent(nom)}&nationalite=${encodeURIComponent(nationalite)}&statut=${encodeURIComponent(statut)}&genre=${encodeURIComponent(genre)}&citation=${encodeURIComponent(citation)}`;  
        }  
    }  

    document.getElementById("photoInput").addEventListener("change", function () {  
        const file = this.files[0];  
        if (file) {  
            const reader = new FileReader();  
            reader.onload = function (e) {  
                const imgPreview = document.getElementById("preview");  
                imgPreview.src = e.target.result;  
                imgPreview.style.display = "block";  
            };  
            reader.readAsDataURL(file);  
        }  
    });  
