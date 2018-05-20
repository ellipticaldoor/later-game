# Bug

*   al cambiar foco del navegador con una tecla de dirección apretada no lo detecta como un "release"
*   si vas pegado al muro el personaje a veces se frena

# TODO

*   Mapa

    *   añadir online - 2
        *   al conectarse aparece un nuevo jugador
        *   un jugador al aparecer en la partida puede moverse por el mapa
        *   antes de entrar se pregunta un nick

    *   añadir multiples personajes
    *   evitar volver a crear un body si en esa posición ya hay un objeto estático

*   Camera

    *   controlar zoom
    *   mejorar transición entre el centrado de la cámara del jugador y cámara libre
    *   limitar máximo paneo de la cámara

*   Gráficos

    *   buscar sprites para los tiles (retina y lowres), check PIXI.RETINA_PREFIX en los docs

*   Jugabilidad

    *   ataque a distancia
        *    tipo binding

    *   añadir vida a cada jugador
        *    al acabarse el jugador muere y tiene que entrar de nuevo

    *   mazmorras tipo binding
    *   roguelike cooperativo

*   Tech

    *   cargar variables de entorno de forma compatible con unix / windows
    *   refactor y mejor organización de código - 1
        *   quitar colisiones de la capa superior
        *   probar vuex
        *   intentar migrar la estructura de cada item a un objeto (estilo vue)
        *   buscar mejores nombres para los layers
        *   evitar usar require para esperar a la carga de assets

    *   tests
        * jest

    *   reducir el número de sprites usados? (quizás convertir cada layer en una sola textura)
    *   culling (no renderizar nada que no salga en pantalla)
    *   typescript
    *   reescalado
        *   reescalar juego a la resolución disponible
        *   controlar zoom con la scrollwheel
        *   reescalar al cambiar de tamaño la pantalla
        *   al hacer zoom nativo del navegador centrar la cámara

    *   volver a activar el antialiasing?
    *   refactor de la forma en la que se generan sprites a partir de tiles
    *   comprobar que en la build no se cargan las devtools
    *   revisar los await de los setup de cada componente
    *   permitir cualquier zIndex?
    *   permitir espacios entre comentarios (prettier, eslint)
    *   quitar "vibración" al personaje cuando se mueve


*   Backend
    *   crear servidor

-   actualizar la posición de player en tiempo real
-   quitar mapa de colisiones del index.html
-   remove init pixi message
-   integrar pixi y vue usando vuex?
-   user mapas de tiled?
-   usar posiciones absolutas para dibujar en pantalla
-   https://github.com/SublimeLinter/SublimeLinter-tslint
-   learn new Map() js
-   aprender pixel art
-   añadir script a package.json con opción para no cargar modo retina (mirar variables de entorno en parcel)
-   study js freeze, is faster?
-   warning para varibles no usadas al pasar métodos
-   Cargar imagenes sin pasar por el loader https://github.com/pixijs/pixi.js/issues/4873
-   investigar iluminación

# Otros

*   Listado de plugins para el renderer https://github.com/pixijs/pixi.js/blob/next/bundles/pixi.js/src/index.js

# Tutoriales

*   https://www.youtube.com/user/jesterxl/search?query=pixi
*   learn about shaders http://pixijs.io/examples/?v=next#/mesh/triangle-color.js
*   https://web.archive.org/web/20130410235113/http://www.saltgames.com/2010/a-bitwise-method-for-applying-tilemaps/
*   http://www.angryfishstudios.com/2011/04/adventures-in-bitmasking/
*   https://github.com/mxgmn/WaveFunctionCollapse
*   https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
