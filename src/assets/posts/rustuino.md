---
title: hola;
subtitle: Compilando código de Rust en Arduino;
date: 2024-03-25;
img: assets/posts/images/charli-lines.png;
tags: arduino,rust,softare embebido;
---
¡Bienvenidos al mundo de los sistemas empotrados! 

Supongo que para las fechas en las que estamos todo el mundo conoce el clásico Arduino, ese microcontrolador que sirve para encender leds y luego dejarlo tirado en una esquina del armario, yo incluido. Pues bien, en mi intención de aprender más lenguajes de bajo nivel, he pensado que sería buena idea hacer proyectos pequeños con el Arduino, pero hechos en Rust, que así tengo contenido medianamente interesante para escribir aquí. 

Pero, antes que nada, ***¿por qué Rust?***

En gran parte ha sido por querer introducirme en el lenguaje, pero me atrae mucho programar así para no tener que depender del IDE de Arduino y, por si en un futuro me atrajera más la idea, programar sobre otros microcontroladores en Rust.

## ¡Hola, Arduino! original
Para poner una referencia, vamos a replicar el código de la segunda lección del <a target="_blank" href="https://www.uio.no/studier/emner/matnat/ifi/IN1060/v21/arduino/arduino-projects-book.pdf">libro de Arduino</a> 
```c
int switchState = 0;

void setup() {
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(2,INPUT);
}

void loop() {
  switchState = digitalRead(2);

  if (switchState == LOW) {
      // Botón no apretado
      digitalWrite(3, HIGH); // LED verde
      digitalWrite(4, LOW); // LED rojo
      digitalWrite(5, LOW); // LED rojo
  }
  else { // Botón apretado
      digitalWrite(3, LOW);
      digitalWrite(4, LOW);
      digitalWrite(5, HIGH);
      delay(250); // espera 250 ms
      digitalWrite(4, HIGH);
      digitalWrite(5, LOW);
    delay(250); // espera 250 ms
  }
}
```

Si cargamos el código en nuestro bicho, el led verde estará encendido siempre hasta que se pulse un botón, que hará que parpadeen las luces rojas hasta que se suelte.

## Muy bien, ahora en Rust
El proceso en Rust es un poco más laborioso que si únicamente utilizáramos el IDE de Arduino pero, como todo lo que merece en esta vida cuesta, a ello que vamos. 

Primero que todo, si aún no lo has hecho, instala `cargo` <a target="_blank" href="https://rustup.rs">(https://rustup.rs)</a>

Hay que ponerse la versión `nightly` para que funcione:
```bash
rustup toolchain install nightly
```

Y también instalar nuestro HAL de confianza (Hardware Abstraction Layer), `avrdude`, y `ravedude`, que es lo que usaremos para escribir el código en la placa:
```bash
sudo apt install avr-libc gcc-avr pkg-config avrdude libudev-dev build-essential
cargo +stable install ravedude
```

La mejor manera de crear un proyecto con el crate de rust `cargo-generate`, con el que podremos usar plantillas para el microcontrolador que necesitemos:
```bash
cargo install cargo-generate
cargo generate --git https://github.com/Rahix/avr-hal-template.git
```

Y ahora sí, ya podemos programar. El código de antes transpilado: 
```rust
 #![no_std]
#![no_main]

use panic_halt as _;

// Entry point
#[arduino_hal::entry]
fn main() -> ! {
  let dp = arduino_hal::Peripherals::take().unwrap();
  let pins = arduino_hal::pins!(dp);

  let input = pins.d2.into_pull_up_input();
  let mut red1 = pins.d5.into_output();
  let mut red2 = pins.d4.into_output();
  let mut green = pins.d3.into_output();

  loop {
    if input.is_low() {
      red1.set_low();
      red2.set_low();
      green.set_high();
    }
    else {
      red1.set_high();
      red2.set_low();
      green.set_low();
      arduino_hal::delay_ms(250);
      red1.set_low();
      red2.set_high();
      arduino_hal::delay_ms(250);
    }
  }
} 
```
Oye, oye, oye. Muchísimo mejor, ¿no? Yo diría que mereció la pena.

Lo último que queda es escribir todo esto en la placa. Para ello, tenemos que encontrar nuestro Arduino en la lista de usbs: 

```bash
dmesg | grep tty
```
> Cuidado!
> Si estás usando WSL como yo, no vas a poder ver nada. En este <a target="_blank" href="https://learn.microsoft.com/en-us/windows/wsl/connect-usb">artículo</a> se explica muy bien cómo ver los usbs conectados.

Con el puerto encontrado, queda decirle a ravedude dónde escribir: 
```bash
export RAVEDUDE_PORT=/dev/ttyUSB0
# Cambia el nombre del puerto acorde al tuyo
```
Y escribir:

```bash
cargo run
```
<video src="assets/posts/images/rustuino.mp4" controls></video>

¡Funciona! Ya tenemos un trasto más en el escritorio, pero que hace lucecitas.

## Próximos pasos
Se conoce que es un ejemplo basiquito, únicamente para demostrar que se puede hacer. Si te ha entrado la vena y quieres indagar más, te dejo un <a target="_blank" href="https://github.com/Rahix/avr-hal/tree/main/examples">repositorio</a> con muchos ejemplos de aplicaciones escritas en Rust para microcontroladores, y el <a target="_blank" href="https://github.com/rust-embedded">proyecto oficial</a> de Rust Embedded. 
También puedes ir revisando mi blog, que subiré más cosas de esto seguro.
