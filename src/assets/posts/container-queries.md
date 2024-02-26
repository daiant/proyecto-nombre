---
title: Como el CSS moderno te puede salvar la vida;
subtitle: Guía rápida de las container queries;
date: 2024-02-26;
img: /assets/monstera.png;
tags: css;
---
Desde hace un tiempo llevo queriendo investigar acerca de las *container queries*. Y no es para menos: es una mejora que se ha estado pidiendo desde hace varios años. Ahora que finalmente se acepta en <a href="https://caniuse.com/css-container-queries" target="_blank">la mayoría de dispositivos</a>, vamos a explicar brevemente su funcionamiento, cómo te puede servir y cómo me ha servido a mí

## Qué son las container queries
Las *container queries* son una manera de organizar los elementos en base a su propio tamañano, en vez de usar como referencia el *viewport*, o el ancho, del navegador. Si, por ejemplo, un contenedor se queda sin espacio por culpa de los elementos a su alrededor, podríamos ocultar ciertos elementos, reorganizarlos o hacer la letra más pequeña de manera independiente a la página.


## Usando @container
Para comenzar a utilizar las reglas de contenedores, es necesario declarar un **contexto de contención** para que el navegador sepa las dimensiones del componente. Los contextos se definen con la propiedad `container-type`, que acepta como valores `size`, `inline-size` o `normal`.

```css
your-component {
  container-type: inline-size;
}

@container (max-width: 900px) {
  background-color: salmon;
}
```

Es posible, además, dar nombre a estos contextos para tener más control a la hora de definir estilos para los contenedores, mediante la propiedad `container-name`. En caso de no definir un nombre, las reglas `@container` aplicarían a su ancestro más directo en la hoja de estilos.
```css
your-component {
  container-type: inline-size;
  container-name: componente;
}

/* ¡Son lo mismo! */
your-component {
  container: componente inline-size;
}

@container componente (max-width: 900px) {
  background-color: salmon;
}
```

## Unidades
Para aprovechar al máximo el uso de las *container queries*, vienen nuevas ~~responsabilidades~~ unidades, que hacen referencia a las dimensiones de nuestro contenedor.
- **cqi**: 1% del `inline-size` del contenedor.
- **cqb**: 1% del `block-size` del contenedor.
- **cqw**: 1% del ancho del contenedor.
- **cqh**: 1% del alto del contenedor.
- **cqmax**: 1% del máximo entre el `inline-size` y el `block-size` del contenedor.
- **cqmin**: 1% del mínimo entre el `inline-size` y el `block-size` del contenedor.

### Pequeño desvío
`inline-size` significa el ancho de un elemento cuando  `writing-mode` es horizontal, y el alto cuando es vertical. De la misma manera, `block-size` referencia al alto cuando horizontal, y al ancho cuando vertical. Personalmente no creo que en mis aplicaciones importe mucho usar `cqi` o `cqw`, pero siempre es de agradecer tener una aplicación sólida para todo tipo de usos.  

## Caso de uso
Para las tarjetas de este blog he necesitado dos variantes: La principal, grande y horizontal, y la más pequeña, que es cuadrada. Cuando las tarjetas crecen o decrecen, o viven dentro de un *flexbox* o *grid*, su comportamiento es algo imprevisible. Las imágenes se trastocan, los textos ocupan toda la pantalla... un caos.
Además, dado que una tarjeta es horizontal y las otras no, usar *media queries* es un dolor de cabeza, pues no aplican los mismos estilos para ambas. Es aquí donde las *container queries* me han salvado la vida. 

Primero, definimos el contenedor como `inline-size`, dándole el nombre `article`.
<!-- Code block  -->
```css
[role=article] {
  /* Otros estilos */
  container: article / inline-size;
}
```

Después, en la regla, forzamos a los contendores a ser cuadarados, bajamos el tamaño de la fuente y reorganizamos la imagen.
<!-- Code block  -->
```css
@container article (max-width: 728px) {
  [role=contentinfo] {
    aspect-ratio: 437 / 400;

    [role=heading] {
      font-size: var(--size-h3);
    }

    [role=text] {
      font-size: var(--size-text-s);
    }
  }

  img {
    width: 90cqi;
    left: -10cqi;
  }

}
```

Nos aprovechamos también de las nuevas unidades para lograr una consistencia aún mayor con las imágenes, sustituyendo los `%` por `cqi`.
<!-- Code block  -->
```css
[role=contentinfo] {
  & [role=group] {
    max-width: 80cqi;
  }
}
/* ... */
img {
  width: 60cqi;
}
```

¡Y ya estaría! Una vida más, salvada gracias al CSS moderno. Si quieres profundizar más, o la explicación que yo te he dado no ha servido de nada, te dejo el enlace a la <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries">documentación de MDN</a>.

xao!