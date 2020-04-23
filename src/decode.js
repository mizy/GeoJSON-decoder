const decoder = {

	options:{
		precision : 5,
		factor : Math.pow(10, 5),
		dimension : 2
	},
	
	decode: function (encoded, options=this.options) {

		var flatPoints = this.decodeDeltas(encoded, options),
			points = [];

		for (var i = 0, len = flatPoints.length; i + (options.dimension - 1) < len;) {
			var point = [];

			for (var dim = 0; dim < options.dimension; ++dim)
				point.push(flatPoints[i++]);

			points.push(point);
		}

		return points;
	},

	decodeDeltas: function(encoded, options) {

		var numbers = this.decodeFloats(encoded, options),
			lastNumbers = [];

		for (var i = 0, len = numbers.length; i < len;)
			for (var d = 0; d < options.dimension; ++d, ++i)
				numbers[i] = Math.round((lastNumbers[d] = numbers[i] + (lastNumbers[d] || 0)) * options.factor) / options.factor;

		return numbers;
	},

	decodeFloats: function(encoded, options) {

		var numbers = this.decodeSignedIntegers(encoded);
		for (var i = 0, len = numbers.length; i < len; ++i)
			numbers[i] /= options.factor;

		return numbers;
	},

	decodeSignedIntegers: function(encoded) {

		var numbers = this.decodeUnsignedIntegers(encoded);

		for (var i = 0, len = numbers.length; i < len; ++i)
			numbers[i] = (numbers[i] & 1) ? ~(numbers[i] >> 1) : (numbers[i] >> 1);

		return numbers;
	},

	decodeUnsignedIntegers: function(encoded) {
		
		var numbers = [],
			current = 0,
			shift = 0;

		for (var i = 0, len = encoded.length; i < len; ++i) {
			var b = encoded.charCodeAt(i) - 63;

			current |= (b & 0x1f) << shift;

			if (b < 0x20) {
				numbers.push(current);
				current = 0;
				shift = 0;
			} else
				shift += 5;
		}

		return numbers;
	}
}
export default decoder;