<template>
  <section class="hero">
    <h1>,</h1>
    <h1>,</h1>
    <h1>,</h1>
    <h1>,</h1>
    <h1>,</h1>
    <h1>,</h1> 
  </section>

 <section id="cursos">
    <h3>Nuestros Cursos</h3>
    <div class="servicios">
      <div class="curso-card">
      <img src="https://sebastianpendino.com/academy/wp-content/uploads/2020/01/curso-online-planificar-negocio-online-opt-643x517.png"style="max-height: 350px;" alt="Curso Planificar Negocio Online" />
      <h4>Masterclass – Planifica tu Negocio Online</h4>
      <div class="rating">⭐ 4.67 / 5</div>
      <p class="precio">
        <del>$10.00</del> <strong>$4.95</strong>
      </p> 
    </div>

    <div class="curso-card">
      <img src="https://sebastianpendino.com/academy/wp-content/uploads/2021/07/curso-storytelling-online-opt-643x517.png" style="max-height: 350px;" alt="Curso de Storytelling" />
      <h4>Curso Estructuras de Storytelling para Marketing</h4>
      <div class="rating">⭐ 4.00 / 5</div>
      <p class="precio">
        <del>$30.00</del> <strong>$19.00</strong>
      </p> 
    </div>

    <div class="curso-card">
      <img src="https://sebastianpendino.com/academy/wp-content/uploads/2019/02/curso-online-automatizar-ecommerce-opt-643x517.png" style="max-height: 350px;"  alt="Automatización WooCommerce" />
      <h4>Workshop – Automatiza el marketing de tu WooCommerce</h4>
      <div class="rating">⭐ 4.50 / 5</div>
      <p class="precio">
        <del>$10.00</del> <strong>$4.95</strong>
      </p> 
    </div>
      
    </div>
  </section>

  <section id="nosotros">
    <h3>Sobre Nosotros</h3>
    <p style="max-width: 700px; margin: auto; text-align: center;">
      Somos una plataforma educativa con más de 10 años de experiencia ofreciendo formación online.
      Nuestro objetivo es ayudarte a adquirir habilidades clave para tu desarrollo personal y profesional.
    </p>
  </section>

</template>

<script>

</script>

<style>
.servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.servicio {
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.servicio h4 {
  margin-bottom: 0.5rem;
  color: var(--primary);
}

.hero {
  background-image: url('https://marketplace.canva.com/EAGPuGNg8uQ/1/0/1600w/canva-banner-horizontal-promoci%C3%B3n-30%25-off-cursos-y-carreras-online-moderno-azul-YnkyuGb9T5s.jpg');
  background-size: cover;
  background-position: center;
  color: var(--white);
  padding: 6rem 2rem;
  text-align: center;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: auto;
}

section {
  padding: 4rem 2rem;
  margin: auto;
}

section h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: var(--secondary);
}

h1 a {
  text-decoration: none;
}
</style>