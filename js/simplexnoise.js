/*!
	SimplexNoise 1.1.0
	Epistemex 2014-2016
	PUBLIC DOMAIN
 */

"use strict";

/**
 * Create an instance, then call noise3D with normalized x, y and z
 * values.
 *
 * @param {*} [seedArray] - optional seed-array to reconstruct previous random patterns.
 * See seedArray() method to obtain current, or create random values [0,255] for 256 indexes.
 * @constructor
 */
function SimplexNoise(seedArray) {

	this.perm = new Uint8Array(512);
	this.perm12 = new Uint8Array(512);

	// Initialize
	this.seed(seedArray);
}

/**
 * Get a noise value for this position in 3D space. Use normalized
 * values - you can scale the values to get more details. Use z=0 to
 * get a 2D value.
 *
 * NOTE: This implementation will return a value between
 * 0 and 1 and NOT -1 to 1.
 *
 * @param {number} x - x
 * @param {number} y - y
 * @param {number} z - z
 * @returns {number} normalized value [0, 1]
 */
SimplexNoise.prototype = {

	/**
	 * Every triple padded to 4 so we can use shift op.
	 * @private
	 */
	grad: new Int8Array([1,1,0,0, -1,1,0,0, 1,-1,0,0, -1,-1,0,0, 1,0,1,0, -1,0,1,0, 1,0,-1,0, -1,0,-1,0, 0,1,1,0, 0,-1,1,0, 0,1,-1,0, 0,-1,-1,0]),

	/**
	 * Create a new noise value based on x, y and z. Typically normalized but not limited to (ie. scale).
	 *
	 * @param {number} x - Position on x using current permutation.
	 * @param {number} y - Position on y using current permutation.
	 * @param {number} z - Position on z using current permutation. Use 0 for 2D usage.
	 * @returns {number} Note: This implementation returns a normalized value [0.0, 1.0]
	 */
	noise3D: function(x, y, z) {

		var s = (x + y + z) * 0.33333333333,

			i = (x + s)|0,
			j = (y + s)|0,
			k = (z + s)|0,

			t = (i + j + k) * 0.16666666667,

			x0 = x - (i - t),
			y0 = y - (j - t),
			z0 = z - (k - t),

			ii = i & 255,
			jj = j & 255,
			kk = k & 255,

			x1, y1, z1,
			x2, y2, z2,
			x3, y3, z3,

			i1, j1, k1,
			i2, j2, k2,

			n = 0,
			t0, t1, t2, t3,
			g0, g1, g2, g3,

			grad = this.grad,
			perm = this.perm,
			perm12 = this.perm12;

		if (x0 >= y0) {
			if(y0 >= z0) {
				i1 = i2 = j2 = 1;
				j1 = k1 = k2 = 0;
			} // XYZ
			else if(x0 >= z0) {
				i1 = i2 = k2 = 1;
				j1 = k1 = j2 = 0;
			} // XZY
			else {
				i1 = j1 = j2 = 0;
				k1 = i2 = k2 = 1;
			} // ZXY
		}
		else {
			if (y0 < z0) {
				i1 = i2 = j1 = 0;
				k1 = j2 = k2 = 1;
			} // ZYX
			else if (x0 < z0) {
				i1 = k1 = i2 = 0;
				j1 = j2 = k2 = 1;
			} // YZX
			else {
				i1 = k1 = k2 = 0;
				j1 = i2 = j2 = 1;
			} // YXZ
		}

		x1 = x0 - i1 + 0.16666666667;
		y1 = y0 - j1 + 0.16666666667;
		z1 = z0 - k1 + 0.16666666667;

		x2 = x0 - i2 + 0.33333333333;
		y2 = y0 - j2 + 0.33333333333;
		z2 = z0 - k2 + 0.33333333333;

		x3 = x0 - 0.5;
		y3 = y0 - 0.5;
		z3 = z0 - 0.5;

		g0 = perm12[ii +      perm[jj +      perm[kk   ]]];
		g1 = perm12[ii + i1 + perm[jj + j1 + perm[kk+k1]]];
		g2 = perm12[ii + i2 + perm[jj + j2 + perm[kk+k2]]];
		g3 = perm12[ii +  1 + perm[jj +  1 + perm[kk+ 1]]];

		t0 = 0.6 - (x0*x0 + y0*y0 + z0*z0);
		t1 = 0.6 - (x1*x1 + y1*y1 + z1*z1);
		t2 = 0.6 - (x2*x2 + y2*y2 + z2*z2);
		t3 = 0.6 - (x3*x3 + y3*y3 + z3*z3);

		if (t0 >= 0) {
			t0 *= t0;
			n += t0 * t0 * dot(grad, g0, x0, y0, z0);
		}

		if (t1 >= 0) {
			t1 *= t1;
			n += t1 * t1 * dot(grad, g1, x1, y1, z1);
		}

		if (t2 >= 0) {
			t2 *= t2;
			n += t2 * t2 * dot(grad, g2, x2, y2, z2);
		}

		if (t3 >= 0) {
			t3 *= t3;
			n += t3 * t3 * dot(grad, g3, x3, y3, z3);
		}

		function dot(g, i, x, y, z) {return g[i] * x + g[i+1] * y + g[i+2] * z}

		return 16 * n + 0.5; //[0, 1]
	},

	/**
	 * Return current seed-array holding 256 indexes with values in the range [0, 255]
	 * @returns {Uint8Array}
	 */
	getSeedArray: function() {return this.perm.subarray(0, 255)},

	/**
	* Set new seed array or create a new random permutation.
	* @param {*} [seedArray] - Array holding 256 indexes with random values in the range [0, 255]. If not given, new random values will be generated.
	*/
	seed: function(seedArray) {
		// permutations x2
		for (var i = 0; i < 256; i++) {
			this.perm[i] = this.perm[i + 256] = seedArray ? seedArray[i] : Math.random() * 256;
			this.perm12[i] = this.perm12[i + 256] = this.perm[i] % 12 << 2;
		}
	}
};

// Node support
if (typeof exports !== "undefined") exports.SimplexNoise = SimplexNoise;