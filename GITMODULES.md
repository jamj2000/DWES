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



# Eliminar un submódulo

- https://gist.github.com/myusuf3/7f645819ded92bda6677

1. Eliminar la línea correspondiente en `.gitmodules`.
2. Ejecutar `git add .gitmodules`
3. Eliminar la sección correspondiente en `.git/config`.
4. Ejecutar `git rm --cached path_to_submodule` (no trailing slash).
5. Ejecutar `rm -rf .git/modules/path_to_submodule` (no trailing slash).
6. Ejecutar `git commit -m "Removed submodule"`
7. Eliminar archivos con `rm -rf path_to_submodule`.


# Documentación

- https://git-scm.com/book/es/v2/Herramientas-de-Git-Subm%C3%B3dulos 
