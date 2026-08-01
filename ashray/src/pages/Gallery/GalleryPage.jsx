import galleryData from '../../data/galleryData';
// import Gallery from '../../components/Gallery/Gallery';
import './GalleryPage.css';

function GalleryPage() {
  return (

  
    <main className="gallery-page">
      {/* <section className="bsct-home-hero-section">
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/banner-mobile6.png" />
          <img src="/images/banner.jpg" alt="Gallery" />
        </picture>
      </section> */}

{/* 
      HERO IMAGE
      <section className="gallery-new">
        <img
          src=""
          alt="Gallery-new"
        />
      </section> */}

      {/* PROJECT 1 */}
      <section className="gallery-content">
        <h2>Vidhyalaya</h2>

          <div className="img-grid four">
          <div><img src="/images/gallery/vidhyalay1.jpg" /></div>
          <div><img src="/images/gallery/vidhyalay2.jpg" /></div>
          <div><img src="/images/gallery/vidhyalay3.jpg" /></div>
          <div><img src="/images/gallery/vidhyalay4.jpg" /></div>
        </div>
      </section>

      {/* PROJECT 2 */}
      <section className="gallery-content">
        <h2>Nari Tarang</h2>

          <div className="img-grid three">
            <div><img src="/images/gallery/nari1.jpg" /></div>
            <div><img src="/images/gallery/nari2.jpg" /></div>
            <div><img src="/images/gallery/nari3.jpg" /></div>
          </div>
      </section>

      {/* PROJECT 3 */}
      <section className="gallery-content">
        <h2>Zero Hunger Drive</h2>

        <div className="img-grid four">
          <div><img src="/images/gallery/hunger1.jpg" /></div>
          <div><img src="/images/gallery/hunger2.jpg" /></div>
          <div><img src="/images/gallery/hunger3.jpg" /></div>
          <div><img src="/images/gallery/hunger4.jpg" /></div>
        </div>
      </section>

      {/* PROJECT 4 */}
      <section className="gallery-content">
        <h2> Project Jal</h2>

        <div className="img-grid three">
          <div><img src="/images/gallery/jal1.jpg" /></div>
          <div><img src="/images/gallery/jal2.jpg" /></div>
          <div><img src="/images/gallery/jal3.jpg" /></div>
        </div>
      </section>

       {/* PROJECT 5 */}
       <section className="gallery-content">
        <h2>Ashray Ka Aashram</h2>

          <div className="img-grid four">
          <div><img src="/images/gallery/sahara1.jpg" /></div>
          <div><img src="/images/gallery/sahara2.jpg" /></div>
          <div><img src="/images/gallery/sahara3.jpg" /></div>
          <div><img src="/images/gallery/sahara4.jpg" /></div>
        </div>
      </section>



      {/* PROJECT 6 */}
      <section className="gallery-content">
        <h2>Sahara</h2>

        <div className="img-grid three">
          <div><img src="/images/gallery/img5.jpg" /></div>
          <div><img src="/images/gallery/img4.jpg" /></div>
          <div><img src="/images/gallery/img3.jpg" /></div>
        </div>
      </section>


       {/* PROJECT 7 */}

       <section className="gallery-content">
        <h2>Ashray Ka Aashra</h2>

          <div className="img-grid four">
          <div><img src="/images/Ashray/img1.jpg" /></div>
          <div><img src="/images/Ashray/img2.jpg" /></div>
          <div><img src="/images/Ashray/img3.jpg" /></div>
          <div><img src="/images/Ashray/img4.jpg" /></div>
        </div>
      </section>


       {/* PROJECT 8 */}

           <section className="gallery-content">
        <h2>Pashu Premi</h2>

        <div className="img-grid three">
          <div><img src="/images/gallery/pashu1.jpg" /></div>
          <div><img src="/images/gallery/pashu2.jpg" /></div>
          <div><img src="/images/gallery/pashu3.jpg" /></div>
        </div>
      </section>




    </main>
 



  );
}
 


export default GalleryPage;
