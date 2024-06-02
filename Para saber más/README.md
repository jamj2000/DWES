

# Arrastrar y Soltar (Drag & Drop)

- [React DnD](https://react-dnd.github.io/react-dnd/docs/overview)
- [DnD Kit](https://docs.dndkit.com/)

A diferencia de muchas bibliotecas de arrastrar y soltar, **DnD Kit** no está construido intencionalmente sobre la API de arrastrar y soltar HTML5. Esta fue una decisión arquitectónica deliberada, que conlleva desventajas que debe conocer antes de decidir usarla. Para la mayoría de las aplicaciones web, creemos que los beneficios superan las desventajas.

La API de arrastrar y soltar de HTML5 tiene algunas limitaciones severas. No es compatible con dispositivos táctiles, lo que significa que las bibliotecas que se construyen sobre ella deben exponer una implementación completamente diferente para admitir dispositivos táctiles.

La principal desventaja de que **DnD Kit** no use la API de arrastrar y soltar de HTML5 es que no podrá arrastrar desde el escritorio o entre ventanas. 
Si el caso de uso de arrastrar y soltar que tiene en mente implica este tipo de funcionalidad, definitivamente querrá usar una biblioteca que esté construida sobre la API de arrastrar y soltar de HTML5. 
Le recomendamos que consulte [`react-dnd`](https://react-dnd.github.io/react-dnd/about) para obtener una biblioteca de React que tenga un backend de arrastrar y soltar de HTML5 nativo.
