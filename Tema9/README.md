> DESARROLLO WEB EN ENTORNO SERVIDOR

# Tema 9: Desarrollo de aplicaciones Web híbridas <!-- omit in toc -->
> PWA: PROGRESSIVE WEB APP. WEB MANIFEST. SERVICE WORKER.



--- 

# Introducción

En este tema veremos como convertir nuestra aplicación web en una PWA.

Una aplicación web progresiva (PWA) es una aplicación creada utilizando tecnologías de plataforma web, pero que proporciona una experiencia de usuario similar a la de una aplicación específica de una plataforma.

Al igual que un sitio web, una PWA puede ejecutarse en múltiples plataformas y dispositivos desde una única base de código. Al igual que una aplicación específica de una plataforma, se puede instalar en el dispositivo, puede funcionar sin conexión y en segundo plano, y puede integrarse con el dispositivo y con otras aplicaciones instaladas.


# PWA

## Generar manifest.json e iconos

![generator](assets/pwa-manifest-generator.png)

![download](assets/download-manifest.png)

![put into public](assets/public-manifest.png)

## 




## Instalar / desinstalar

![install](assets/install.png)


![installed](assets/installed.png)


![uninstall](assets/uninstall.png)



# Otras propiedades de metadata

La propiedad `manifest` forma parte del objeto `metadata`. Puedes encontrar otras propiedades como [openGraph](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph), [robots](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#robots), ... en el siguiente enlace:

- https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields




# Referencias

- [Web App Manifest Generator: simicart](https://www.simicart.com/manifest-generator.html/)
- [Web App Manifest Generator: netlify](https://manifest-gen.netlify.app/) 
- [Web App Manifest Generator: progressier](https://progressier.com/pwa-manifest-generator) 
- [MDN PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web Manifest](https://developer.mozilla.org/es/docs/Web/Manifest)
- [Video - Crear PWA de forma muy sencilla](https://youtu.be/Sb0_k0gaWX0?si=178qFPPH5DzuVs2h)