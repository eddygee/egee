var map, 
	myLatlng = new google.maps.LatLng(27.01509,-80.838318),
	Raleigh =  new google.maps.LatLng(35.786244,-78.665864),
	Miami = new google.maps.LatLng(25.814727,-80.225372),
	myOptions,
	stylez,
	image = 'http://www.egee.me/wp-content/themes/egee/images/helloMarker.png',
	marker;

function initMap() {
stylez = [ 
{
	featureType: "landscape",
	stylers: [ 
		{ lightness: -75},
		{ gamma: 0.95 },
		{ hue: "#11ff00" }
	] 
},{
	featureType: "road.highway",
	stylers: [
		{ visibility: "simplified" }
	] 
 },{
	featureType: "administrative.locality",
	stylers: [
		{ visibility: "simplified" },
		{ lightness: 48 },
		{ gamma: 0.58 },
		{ saturation: 85 },
		{ hue: "#0800ff" }
	]
},{
	featureType: "administrative.province",
	stylers: [ { gamma: 0.87 },
		{ saturation: 75 },
		{ hue: "#ff0008" },
		{ lightness: 33 },
		{ visibility: "on" }
	] 
},{
	 featureType: "poi.school",
	 elementType: "geometry",
	 stylers: [
	 	{ saturation: 89 },
		{ hue: "#ff0008" },
		{ lightness: -45 } ] }
	]
;
		
	myOptions = {
	  zoom: 6,
	  center: myLatlng,
	  panControl: false,
	  zoomControl: true,
	  scaleControl: true,
	  scrollwheel: false,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	var styledMapOptions = {
		name: "La Moulade"
	};
	var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
	map.mapTypes.set("hiphop", jayzMapType);
	map.setMapTypeId("hiphop");
	
	marker = new google.maps.Marker({
		position: Miami,
		map: map,
		icon: image,
		animation: google.maps.Animation.BOUNCE
	});
	google.maps.event.addListener(marker, 'click', toggleBounce);
}
	

function toggleBounce() {
	myOptions.zoom = 13;
	myOptions.center = Raleigh;
	//alert( myOptions.zoom );
	map = new google.maps.Map(document.getElementById("map"), myOptions);
	var styledMapOptions = {
		name: "EGee"
	};
	var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
	map.mapTypes.set("hiphop", jayzMapType);
	map.setMapTypeId("hiphop");
	
	marker = new google.maps.Marker({
		position: Raleigh,
		map: map,
		icon: image
	});
}

google.maps.event.addDomListener(window, 'load', initMap);