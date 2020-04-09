# A-Frame Character Editor

A character editor in A-Frame kind of like what you see in video games where you get to edit your character.

## Process for setting up a rig

In a nutshell this is what I did:

- Create a character model in MagicaVoxel and export it to Obj
- Create item models the same way
- Import them into the same blender project
- Create an armature for the model in blender
- Place the items on the character model
- In edit mode `Vertex -> Clean Vertices` and `Mesh -> Clean up -> Clean up by distance`
- Attach the items to the armature
- Give them id's so that you can select them from javascript
- Export them using the gltf/glb exporter
- Import them into the project and use them!
