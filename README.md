# CG WebGL Summative
Software Methodologies CG WebGL summative assignment.

We were tasked with creating a 3D representation of a lecture theatre using WebGL embedded in a web page.

A live demo of the site can be found [here](http://community.dur.ac.uk/maximilian.clayton-clowes/Lecture/).
## Contents
<!-- MarkdownTOC -->

- [Report](#report)
    - [Meeting Criteria](#meeting-criteria)
    - [Deliverables:](#deliverables)
    - [Screenshots](#screenshots)
    - [Limitations](#limitations)
    - [Resources](#resources)

<!-- /MarkdownTOC -->

## Report
### Meeting Criteria

+ The 3D lecture room should comprise both static and dynamic objects. A static object means its attributes, such as position, orientation, colour, are kept unchanged while your program is running. In contrast, attributes of a dynamic object may change if necessary.
+ Construct a virtual camera and proper light source(s), allowing 3D objects and the virtual environment to be visualised properly.
+ Include simple interaction mechanisms (e.g. using hotkeys), allowing a user to examine the 3D environment by changing the orientation or the position of the virtual camera and to induce changes to dynamic objects.

My scene contains a variety of static objects, from the walls of the room itself to the skybox visable through the room's windows. Also included are a variety of dynamic objects:
+ Blinds - Open and close, adjusting ambient lighting accordingly. Animated; transform shape.
+ A door - Open and close. Animated; rotate shape and translate to offset rotation.

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
Sound
Opening door/blinds includes animation sequences
Lighting




+ Implementation of vertex and fragment shaders (10%)
+ Robustness of the implementation (10%)
+ Extra computer graphics features included [e.g. implement techniques that you have learnt from the lectures but that are not part of the prescribed requirements](5%)

### Deliverables:
+ Justification for the extra computer graphics features included in your implementation

### Screenshots
![Screen1](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot1.jpg)
Screenshot 1 shows the scene during it's brief introduction. The room begins in darkness (ambient light source intensity reduced to 0) and one by one the rows of lights turn on. The chalkboards are textured. Along the right hand wall a door can just be made out, which can be opened.
![Screen2](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot2.jpg)
Screenshot 2 shows the dynamic movement of the blinds as they close (controlled by the user). As the blinds raise and lower the ambient lighting of the scene is raised and lowered accordingly. Outside of the window is a skybox. The lights can be toggled on/off, grouped by rows; only rows 2 and 4 are currently active. On the desk is a note object (see screenshot 3).
![Screen3](https://raw.githubusercontent.com/mcclowes/CG_Summative/master/Screenshot3.jpg)
Screenshot 3 shows the user in close proximty to the aforementioned note object. An overlay view appears containing the note's contents appears, disappearing once the user moves away. By pressing/holding 'm', the colour of the lighting in the room is randomly varied, here appearing red. 

### Limitations
+ The shaders do not including capablity for dealing with shadows so although the lighting appears somewhat convincing, it is not infact realistic. 
+ The current skybox is also poor and could be improved upon.
+ Including 3D objects (e.g. .OBJ files) would be great, but having little experience with 3D modelling/ texturing packages and not wanting to take 3D assets from online, this seemed impractical.

### Resources
+ [WebGL Textbook ](https://sites.google.com/site/webglbook/)
+ [WebGL Textbook examples](https://sites.google.com/site/webglbook/)
+ [FPS Tracking](http://in2gpu.com/2014/05/17/fps-webgl/)
+ [Pointer Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)
