import React from 'react';
import { AntPath } from 'leaflet-ant-path';
import UserMapStyle from './UserMapStyle';
import { Control } from 'leaflet-draw';

let map;

export default class UserMap extends React.Component { //eslint-disable-line
  constructor() {
    super();
    this.leafletMap = this.leafletMap.bind(this);
    this.setview = this.setview.bind(this);
    this.drawMap = this.drawMap.bind(this);
  }
  componentDidMount() {
    this.leafletMap();
  }

  componentDidUpdate(prevProps) {
    const { coordinates } = this.props.stateUserInfo.location;
    if(prevProps.stateUserInfo.location !== this.props.stateUserInfo.location) {
      this.setview(coordinates[1], coordinates[0]);
    }
  }
  leafletMap() {
    // map = L.map('francMap', {
    //   center: [17.4622, 78.356],
    //   zoom: 13,
    // });
    //
    //   L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJ1ZGh2aXNheXMiLCJhIjoiY2l4aWxnM2xoMDAxMzJ3bzB2ajlpbzJ2eCJ9.L4CdTG9cSB-ADVYQXbH-hw', {
    //     maxZoom: 18,
    //   }).addTo(map);

       const cloudmadeUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHJ1ZGh2aXNheXMiLCJhIjoiY2l4aWxnM2xoMDAxMzJ3bzB2ajlpbzJ2eCJ9.L4CdTG9cSB-ADVYQXbH-hw';
       const cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});
        map = new L.Map('francMap', {layers: [cloudmade], center: new L.LatLng(17.4622, 78.356), zoom: 15 });
    this.drawMap();
  }
  drawMap() {
    // var LeafIcon = L.Icon.extend({
    //     options: {
    //       shadowUrl:
    //           'http://leafletjs.com/docs/images/leaf-shadow.png',
    //       iconSize:     [38, 95],
    //       shadowSize:   [50, 64],
    //       iconAnchor:   [22, 94],
    //       shadowAnchor: [4, 62],
    //       popupAnchor:  [-3, -76]
    //     }
    //   });

      // var greenIcon = new LeafIcon({
      //   iconUrl: 'http://leafletjs.com/docs/images/leaf-green.png'
      //   });

      const drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
          polygon: {
            shapeOptions: {
              color: 'purple'
            },
            allowIntersection: false,
            drawError: {
              color: 'orange',
              timeout: 1000,
            },
            showArea: true,
            metric: false,
            repeatMode: true,
          },
          polyline: false,
          rectangle: false,
          circle: false,
          marker: false,
        },
        edit: {
          featureGroup: drawnItems,
          edit: false,
        }
      });
      map.addControl(drawControl);
      map.on('draw:created', (e) => {
        let geoFence;
        const type = e.layerType,
              layer = e.layer;

        if (type === 'marker') {
          layer.bindPopup('A popup!');
        }
        geoFence = layer.getLatLngs();
        drawnItems.addLayer(layer);
        this.props.userGeoFence(geoFence);
      });
      map.on('draw:deleted', (e) => {
         this.props.userGeoFence([]);
     });
  }

  setview(fLat, fLng) {
    map.setView(new L.LatLng(fLat, fLng), 15);
  }
  render() {
    return (
      <UserMapStyle id="francMap" style={{ height: '100vh' }} />
    );
  }
}
