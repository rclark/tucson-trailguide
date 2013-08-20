var map = L.map('map').setView(['32.358648265262275', '-110.81634521484375'], 11);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/clarkdav.map-y00xtqe1/{z}/{x}/{y}.png')
  .addTo(map);