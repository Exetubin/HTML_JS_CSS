let images;

async function getImgSources() {
    let url = 'https://picsum.photos/v2/list?page=2&limit=20';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderImages() {
    images = await getImgSources();
    let html = '';

    images.forEach(image => {
        let htmlSegment = `<div class="ImageContainer">
                            <img src="${image.download_url}" onclick="enlargeImage(this.src)" id="${image.id}"" title="(${image.id}) Image by ${image.author}" alt="Image by ${image.author}" width=75>
                            <div class="RemoveImage" title="${image.id}" onclick="testOnly(this.title)">×</div>
                          </div>`;

        html += htmlSegment;
    });

    console.log(images);

    console.log("-----HTML-----");
    console.log(html);


    console.log("-----First Image-----");
    console.log(images[0]);
    console.log("-----Last Image-----");
    console.log(images[images.length - 1]);

    let imgarea = document.querySelector('.ImageArea');
    imgarea.innerHTML = html;
}

function enlargeImage(img) {
  let enlargedimgsection = document.querySelector('#EnlargedImage');
  enlargedimgsection.innerHTML = `<img class="clEnlargedImage" src=` + img + `>`;
}

function testOnly(imageId) {
  let imagesIdx = images.findIndex(obj => {return obj.id === imageId});

  images.splice(imagesIdx, 1);
  document.getElementById(imageId).style.display = 'none';

  console.log("imagesIdx = " + imagesIdx + " DELETED!");
}

renderImages();