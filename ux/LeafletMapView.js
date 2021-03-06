Ext.define('Ext.ux.LeafletMapView', {
	extend: 'Ext.Component',
	alias: 'widget.leafletmapview',
	config:{
		initialLocation: null,
		initialZoomLevel: null,
		map: null,
		useCurrentLocation: false,
		tileLayerUrl: 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png',
		tileLayerKey: 'd2d84aa0aa9e4230be2215b53642174b',
		tileLayerStyle: 997,
		tileMaxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
	},
	afterRender: function(t, eOpts){
		this.callParent(arguments);

		var leafletRef = window.L;
		if (leafletRef == null){
			this.update("No leaflet library loaded");
		} else {
			var map = L.map(this.getId());
			this.setMap(map);

			var initialLocation = this.getInitialLocation();
			var initialZoomLevel = this.getInitialZoomLevel();
			if (initialLocation && initialZoomLevel){
				map.setView(initialLocation, initialZoomLevel);
			} else {
				map.fitWorld();
			}

			L.tileLayer(this.getTileLayerUrl(), {
				key: this.getTileLayerKey(),
				styleId: this.getTileLayerStyle(),
				maxZoom: this.getTileMaxZoom(),
				attribution: this.getAttribution()
			}).addTo(map);

			if (this.getUseCurrentLocation() == true){
				map.locate({
					setView: true
				});
			}
		}
	},
	onResize: function(w, h, oW, oH){
		this.callParent(arguments);
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}
});