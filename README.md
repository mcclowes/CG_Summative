# CG_Summative
Software Methodologies CG Web GL summative assignment



+ The 3D lecture room should comprise both static and dynamic objects. A static object means its attributes, such as position, orientation, colour, are kept unchanged while your program is running. In contrast, attributes of a dynamic object may change if necessary.
+ Construct a virtual camera and proper light source(s), allowing 3D objects and the virtual environment to be visualised properly.
+ Include simple interaction mechanisms (e.g. using hotkeys), allowing a user to examine the 3D environment by changing the orientation or the position of the virtual camera and to induce changes to dynamic objects.

My scene contains a variety of both static and dynamic objects. 

Transformation operations are present in both the generation of static objects

Texture mapping is applyed at specific locations. I previously applied textures to all surfaces but found that the overall appearance was not enhanced by this overuse of textures.

Drawing of shapes utilising for loops to minimise code and increase efficiency

+ Modeling of dynamic objects (the use of simple shapes, transformation operations, texture mapping, and interaction mechanisms) (35%)
+ Modeling of the virtual environment (the use of static and dynamic objects, transformation 
operations, scene graph, virtual camera, light source(s), and interaction mechanisms) (20%)

Interaction:
proximity
keys - notably, concurrent buttons
time
camera movement



+ Implementation of vertex and fragment shaders (10%)
+ Robustness of the implementation (10%)
+ Extra computer graphics features included [e.g. implement techniques that you have learnt from the lectures but that are not part of the prescribed requirements](5%)

# Deliverables:
+ A list of the limitations of your implementation
+ Description of the attached three different screen shots of your implementation
+ Justification for the extra computer graphics features included in your implementation
+ A list of the public domain packages / source code that you have used in your coursework

# Screenshots
![Screen1](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot1.jpg)
Screenshot 1 shows the scene during it's brief introduction. The room begins in darkness (ambient light source intensity reduced to 0) and one by one the rows of lights turn on. The chalkboards are textured.
![Screen2](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot2.jpg)
Screenshot 2 shows the dynamic movement of the blinds as they close (controlled by the user). As the blinds raise and lower the ambient lighting of the scene is raised and lowered accordingly. Outside of the window is a skybox. The lights can be toggled on/off, grouped by rows. 
![Screen3](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot3.jpg)

# Limitations

