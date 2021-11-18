// Fetch the summary of the article from our Express API
function parseAndCreatePage(rsp) {
  let s = "";

  s = "<h2>" + "Intresting Photos"+ "(" + rsp.photos.photo.length + ")" + "</<h2>" + "<br/>";
  if ( rsp.photos.photo.length == 0){
    s += "<h3>" + " Sorry, No Images Were Found " + "<br/>";
  }
  // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}_[mstb].jpg
  // http://www.flickr.com/photos/{user-id}/{photo-id}

  for (let i=0; i < rsp.photos.photo.length; i++) {
      photo = rsp.photos.photo[i];
      t_url = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id+ "_" + photo.secret + "_" + "t.jpg";
      p_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
      s +=  '<a href="' + p_url + '">' + '<img alt="'+ photo.title + '"src="' + t_url + '"/>' + '</a>';
  }

  const appDiv = document.getElementById("app");
  appDiv.innerHTML = s;
}

var value;
const fetchSummary = (event) => {
  // const title = event.target.textContent;

 
  fetch(`/api/summary/${event}`)
    .then((res) => res.json())
    .then((data) => {
      let s = '<ul>';
      var averageS = 0;
      for (let i=0; i < data.length; i++) {
        averageS += data[i].score;
        s += '<div> Sentiment: ' + data[i].score + '</div><li>'+ data[i].full_text + '</li><br />';
      }

      s+= '</ul>';
      const appDiv = document.getElementById("app");
      appDiv.innerHTML = s;

      const scoreDiv = document.getElementById("score");
      scoreDiv.innerHTML = '<br /><div> Average Sentiment: ' + averageS/data.length+ '</div>';
      // const test = data;
      // console.log(test);
      // console.log({data: test});
      // const parent = event.target.parentElement;
      // const p = document.createElement("p");
      // p.textContent = data.summary;
      // parent.append(p);

    })
    .catch((error) => console.log(error));
  
  // const base = "https://api.flickr.com/services/rest/?";
  // const query = "&method=flickr.photos.search&api_key=68c9f9254964f5ba4eafa486ddfe19c8&tags=";
  // let country = title;
  // const end = "&per-page=50&format=json&nojsoncallback=1";

  // const url = base + query + country + end ;
  
  // console.log(title)
  // fetch(url)
  //   .then((response) => {
  //     if (response.ok) {
  //       console.log("Working1")
  //       return response.json();
  //     }
  //     throw new Error("Network response was not ok.");
  //   })
  //   .then((rsp) => parseAndCreatePage(rsp))
  //   .catch(function (error) {
  //     console.log("There has been a problem with your fetch operation: ", error.message);
  //   });

};


const test = () => {
  fetchSummary(value);
}
// Add an event listener to each article title
const countriesTitle = document.getElementsByClassName("articleTitle");

for (let title of countriesTitle) {
  title.addEventListener("click", (event) => fetchSummary(event));
}

const live = document.getElementById("submit");
const searchBox = document.getElementById("searchbox");
searchBox.addEventListener('keyup', (e) => {
  value = e.target.value
})

live.addEventListener('click', test);





