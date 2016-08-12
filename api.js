var
  emotionImages = {
    anger: "http://i.imgur.com/0U8rb3f.gif",
    contempt: "http://i.imgur.com/s8VuL5y.jpg",
    disgust: "http://i.imgur.com/9WPOuHO.gif",
    fear: "http://i.imgur.com/WFMqLbS.jpg",
    happiness: "http://i.imgur.com/MddTbq0.gif",
    neutral: "http://i.imgur.com/Gew0KKT.jpg",
    sadness: "http://i.imgur.com/TKGN4wj.gif",
    surprise: "http://i.imgur.com/cuyCIRD.jpg",
    empty: "http://i.imgur.com/CIubsq7.gif"
  },
  getEmotion = (data_uri, token) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
        setEmotionImage(JSON.parse(this.responseText))
      }
    });

    xhr.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize");
    xhr.setRequestHeader("content-type", "application/octet-stream");
    xhr.setRequestHeader("ocp-apim-subscription-key", token);

    xhr.send(getBlob(data_uri));
  },
  getBlob = (dataURL) => {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  },
  getURLParameter = (name) => {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  },
  setEmotionImage = (faces) => {
    var emotions = faces.map((n) => {
      var best_emotion = null, best_score = null ;
      for (var t in n.scores) {
        if (n.scores.hasOwnProperty(t)) {
          if (best_score <= n.scores[t]) {
            best_score = n.scores[t];
            best_emotion = t;
          }
        }
      }
      return best_emotion;
    });
    var image = (emotions.length != 0) ? emotionImages[emotions[0]] : emotionImages.empty;
    document.getElementById('my_emotion').innerHTML = '<img src="'+image+'"/>';
  };
