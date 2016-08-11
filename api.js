function getEmotion(data_uri) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.projectoxford.ai/emotion/v1.0/recognize");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("ocp-apim-subscription-key", "yourEmotionKey");

  xhr.send({ "url": data_uri });
}

function uploadImage(data_uri) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.imgur.com/3/image");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("Authorization", "Client-ID yourImgurClientID");

  var image = data_uri.split(',')[1];
  image = image.replace(/\+/g, '%2B');
  image = image.replace(/\//g, '%2F');
  image = image.replace(/\=/g, '%3D');
  console.log(image);

  xhr.send({ image: image, type: 'base64' });
}
