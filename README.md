# COSC414 Project Two
The second project of COSC414. Created by Joel, Josh and Liam


## Project Requirements

1. Playing field is on the surface of a sphere centered at the origin

2. Players can drag the sphere with the mouse in order to look for bacteria. 

3. Bacteria grow on the surface of the sphere starting at an arbitrary spot on the surface and growing out uniformly from that spot at a predetermined speed.

4. Clicking on the bacteria eradicates them. 

5. Bacteria can randomly spawn up to a fixed amount. Each bacteria spawned has a different colour. 

6. Bacteria appear as coloured circular patches on the surface of the sphere. (So the only sphere is the playing space??)

7. Bacteria gain points through the delay between them spawning and the play destroying them. They also gain points when they reach a threshold size (after which they stop growing.)

8. Player wins if all bacteria are destroyed before any two bacteria reach their maximum threshold.


## Bonus

1. Poison is administered on a mouseclick (think of a explosion that propagates outwards). Bacteria caught in this poison are also eradicated. 
2. When two bacterial cultures collide, the first one to appear dominates the latter, consuming its mass.
3. When a bacterial culture is destroyed, use a simple particle system to simulate an explosion where the bacteria was destroyed.
4. Lighting is used. Use a GUI to control it.
