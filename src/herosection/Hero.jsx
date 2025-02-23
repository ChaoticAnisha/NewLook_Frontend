import priceBg from '/assets/images/hero-banner.jpg'; 

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-cover bg-center py-32 text-white" style={{ backgroundImage: `url(${priceBg})` }}>
      <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-oswald font-semibold uppercase mb-6">
            Hair & Beauty Redefined
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Experience the pinnacle of beauty, where artistry meets innovation, and your hair is the canvas.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center gap-2 bg-amber-500 text-white px-8 py-3 font-oswald uppercase hover:bg-black transition-colors"
          >
            <span>Explore Our Services</span>
            <ion-icon name="arrow-forward"></ion-icon>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;