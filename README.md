# Procedural Generation

Procedural generation is a tool that is extremely useful in creating many different kinds of content. The core idea is to create a generative program and feed it random values as parameters. It can be tricky to constrain the influence of the random values while maintaining good variety, but doing it right can produce an endless amount of effects that would be impossible to create by hand!

So how does it work?

At the base of any random number generator is a hash function. The image below links to an interactive implementation of a simple alias-based hash function in desmos. Note that this is a different design than hashes used in cryptography, but serves the same purpose of scrambling input into an seemingly random output. The demo then goes on to show how the hash function can be used to create "fractal noise"

[<img src="https://i.imgur.com/lUngSk2.png">](https://www.desmos.com/calculator/dj2j2slyhl)

Below is an example of a 2D random number generator implemented for the GPU with a shader, and explores a few transformations to create different distributions. This is very efficient and is an essential building block of many effects. This also can be replaced with a pre-generated random texture, which can be used in the exact same way with perhaps less computational cost. The 2D noise is easily interpreted as an image, and looks like the screen of a TV with no antenna. 

[<img src="https://i.imgur.com/bp29iKE.png">](https://www.shadertoy.com/view/4ssXRX)

Here is 3D noise, smoothed and layered at multiple frequencies (as in the desmos example) to synthesize interesting textures on the fly.

[<img src="https://i.imgur.com/QsAZJm6.png">](https://www.shadertoy.com/view/4sc3z2)

From this point on it is okay to treat random number generators as a black-box. Understanding how they work is not necessary to use them, just fun.

This music visualizer demonstrates a more indirect use of 3D fractal noise. Rather than simply dumping the values onto the screen, the noise is used to displace the geometry of a mesh. By mapping the amplitudes of frequencies extracted from the music onto the amplitude of each noise frequency, the geometry becomes responsive to the music in a unique way.

[<img src="https://i.imgur.com/4SfbKfT.png">](http://uwc.graphics/FBM-Triangle-Shredder3.html)

The index.html file in this repository demonstrates the application of noise onto the height displacement of a plane. With just a few iterations a procedural terrain effect is possible. This is a simplified version of the way terrain generation in games like minecraft work.

[<img src="https://i.imgur.com/riIxqXm.png">](https://computer-graphics-and-pretty-pictures.github.io/Procedural-Generation/)

Inigo Quilez's famous "elevated" terrain

[<img src="https://i.imgur.com/WLs7YJF.png">](https://www.shadertoy.com/view/MdX3Rr)

It turns out lots of beautiful things in nature can be recreated just as wrapper around some noise.

[<img src="https://i.imgur.com/vOdFhw7.png">](https://www.shadertoy.com/view/ll2SWd)

[<img src="https://i.imgur.com/YCfoKPP.png">](https://www.shadertoy.com/view/Ms2SD1)

[<img src="https://i.imgur.com/KPtdqhl.png">](https://www.shadertoy.com/view/MsVXWW)

Procedural generation can be used for a lot more than just visual effects. Here is an example of randomly generated music, using some of the same principals.

[<img src="https://i.imgur.com/dE6FAjs.png">](https://www.shadertoy.com/view/ldXBzH)
