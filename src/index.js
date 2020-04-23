import encoder from './encode';
import decoder from './decode';

const GeoJSONEncode = {
	decoder,
	encoder,

	encode(data){
		let json = JSON.parse(JSON.stringify(data));
		return this.encodeFeatures(json)
	},

	encodeFeatures(json){
		if(json.type==="Feature"){
			return this.encodeFeature(json)
		}else if(json.type==="FeatureCollection"){
			const features = json.features.map(each => {
				return this.encodeFeatures(each)
			});
			json.features = features;
			return json;
		}else{
			return this.encodeFeature(json);
		}

	},

	encodeFeature(feature){
		const coords = feature.geometry.coordinates;
		let res = coords;
		switch(feature.geometry.type){
			case 'Point':
                break;
            case 'LineString':
                res = !Array.isArray(coords[0]) ? coords : [encoder.encode(coords)];
				break;
			case 'MultiPoint':
                res = !Array.isArray(coords[0]) ? coords : [encoder.encode(coords)];
                break;
            case 'MultiLineString':
                res = !Array.isArray(coords[0][0]) ? coords : coords.map(item=>(encoder.encode(item)));
                break;
            case 'Polygon':
				res = !Array.isArray(coords[0][0]) ? coords : coords.map(item=>(encoder.encode(item)));
                break;
            case 'MultiPolygon':
				res = !Array.isArray(coords[0][0][0]) ? coords : coords.map(item=>item.map(each=>(encoder.encode(each))));

                break;
		}
		feature.geometry.coordinates = res;
		return feature;
	},


	decode(data){
		let json = JSON.parse(JSON.stringify(data));
		return this.decodeFeatures(json)
	},

	decodeFeatures(json){
		if(json.type==="Feature"){
			return this.decodeFeature(json)
		}else if(json.type==="FeatureCollection"){
			const features = json.features.map(each => {
				return this.decodeFeatures(each)
			});
			json.features = features;
			return json;
		}else{
			return this.decodeFeature(json);
		}

	},

	decodeFeature(feature){
		const coords = feature.geometry.coordinates;
		let res = coords;
		switch(feature.geometry.type){
			case 'Point':
                break;
            case 'LineString':
                res = Array.isArray(coords[0]) ? coords : decoder.decode(coords[0]);
				break;
			case 'MultiPoint':
                res = Array.isArray(coords[0]) ? coords : decoder.decode(coords[0]);
                break;
            case 'MultiLineString':
                res = Array.isArray(coords[0][0]) ? coords : coords.map(item=>(decoder.decode(item)));
                break;
            case 'Polygon':
				res = Array.isArray(coords[0][0]) ? coords : coords.map(item=>(decoder.decode(item)));
                break;
            case 'MultiPolygon':
				res = Array.isArray(coords[0][0][0]) ? coords : coords.map(item=>item.map(each=>(decoder.decode(each))));

                break;
		}
		feature.geometry.coordinates = res;
		return feature;
	},

}
export default GeoJSONEncode;