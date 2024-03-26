---
title: Larga vida a los filtros de instagram;
subtitle: Tratamiento de imágenes en Javascript Canvas;
date: 2024-03-25;
img: assets/posts/images/charli-lines.png;
tags: js,canvas;
---
Buscando un poco de inspiración me encontré con un <a href="https://www.figma.com/community/plugin/1333908306878255000/ruri-lines" target="_blank">plugin chulísimo para figma</a>, que hace maravillas con líneas y logos y de todo. En mi inspiradora confianza, me dije a mí mismo:  Esto, tan difícil no tiene que ser. Y aquí estamos.

<img src="assets/posts/lines/1691081997342.webp" />

## Cómo funciona

Para poder implementarlo sobre la web, la solución más sencilla es utilizar el <a href="https://developer.mozilla.org/es/docs/Web/API/Canvas_API" target="_blank">canvas</a> del navegador.

En una página nueva, subes una fotos, te pones a leer los píxeles de la imagen, el color en rgb de cada píxel y procesar las líneas en base a la intensidad (0-255) de ese color. 

Por ejemplo, para la imagen de este mismo post, tendríamos la siguiente generación:

<img src="assets/posts/lines/demo.png" />

Me gusta la idea de tener un control algo más amplio en la generación de líneas: grosor, colores, intensidad... Así se puede probar con fotos reales, no solo con iconos, letras y degradados, que era la idea original. 

## Futuro

Para un futuro me gustaria trabajar en el suavizado de las líneas, porque ahora me parecen un poco agresivas que te voy a decir, y quizá mejorar el rendimiento, porque para imágenes de día a día tampoco es lo más rápido del mundo. 

## Demo
Tienes la demo completa <a href="https://daiant.github.io/charli-lines/" target="_blank">aquí</a>, y las críticas por <a href="https://github.com/daiant/charli-lines" target="_blank">allá (github)</a>.