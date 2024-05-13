# Añadir y descargar submódulo

```sh
git submodule add https://github.com/jamj2000/nxapp-router.git Tema4/proyectos/nxapp-router
```

# Actualizar todos los submódulos

```sh
git submodule update --remote
git add .
git commit -m "update submodules"
git push
```


# Actualizar un submódulo

```sh
# Dentro de carpeta del submódulo

git fetch
git merge origin/main
```

# Documentación

- https://git-scm.com/book/es/v2/Herramientas-de-Git-Subm%C3%B3dulos 
