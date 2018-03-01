# Procedural Generation

Procedural generation is a tool that is extremely useful in creating many different kinds of content. The core idea is to create a generative program and feed it random values as parameters. It can be tricky to constrain the influence of the random values while maintaining good variety, but doing it right can produce an endless amount of effects that would be impossible to create by hand!

So how does it work?

At the base of any random number generator is a hash function. Here is an interactive implementation of a simple alias-based hash function in desmos. This demo also shows how the hash function can be used to create "fractal noise"

Desmos

Below is an example of a 2D random number generator implemented for the GPU with a shader. This is very efficient and is an essential building block of many effects. This also can be replaced with a pre-generated random texture, which can be used in the exact same way with perhaps less computational cost.

Shadertoy hash

Here is 3D noise, smoothed and layered at multiple frequencies (as in the desmos example) to synthesize interesting textures on the fly.

Shadertoy fractal noise

This music visualizer demonstrates a more indirect use of 3D fractal noise. Rather than simply dumping the values onto the screen, the noise is used to displace the geometry of a mesh. By mapping the amplitudes of frequencies extracted from the music onto the amplitude of each noise frequency, the geometry becomes responsive to the music in a unique way.

Music Visualizer

The Index.html file in this repository demonstrates the application of noise onto the height displacement of a plane. With just a few iterations a procedural terrain effect is possible.

Demo Terrain

Inigo Quilez's famous "elevated" terrain

Shadertoy Terrain

Clouds Shadertoy

Procedural generation can be used for a lot more than just visual effects. Here is an example of randomly generated music, using some of the same principals.

Shadertoy Music Generator
