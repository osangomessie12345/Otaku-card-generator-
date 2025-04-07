   function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        pseudo: params.get("pseudo"),
        nom: params.get("nom"),
        nationalite: params.get("nationalite"),
        statut: params.get("statut"),
        genre: params.get("genre"),
        citation: params.get("citation")
      };
    }

    const data = getQueryParams();
    document.getElementById("pseudoAffiche").textContent = data.pseudo || "---";
    document.getElementById("nomAffiche").textContent = data.nom || "---";
    document.getElementById("nationaliteAffiche").textContent = data.nationalite || "---";
    document.getElementById("statutAffiche").textContent = data.statut || "---";
    document.getElementById("genreAffiche").textContent = data.genre || "---";
    document.getElementById("citationAffiche").textContent = data.citation || "---";

    const photoData = localStorage.getItem("otakuPhoto");
    if (photoData) {
      document.getElementById("photoAffiche").src = photoData;
    }

    const cardData = JSON.stringify(data);
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(cardData)}`;
    document.getElementById("qrCode").src = qrCodeUrl;

    localStorage.removeItem("otakuPhoto");

    function downloadCarte() {
      const card = document.getElementById("carteOtaku");
      const images = card.getElementsByTagName("img");
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imagePromises).then(() => {
        html2canvas(card, {
          scale: 3,
          useCORS: true,
          allowTaint: false
        }).then(canvas => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "Carte_Otaku.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }).catch(error => {
          console.error("Erreur de capture :", error);
        });
      });
                                                   }
