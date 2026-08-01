import Button from '../Common/Button';
import './Gallery.css';

function Gallery({ items, columns = 4, type = 'spotlight' }) {
  return (
    <div className={`${type}-grid`}>
      {items.map((item) => (
        <div key={item.id} className={`${type}-card${item.urgent ? ' urgent' : ''}`}>
          {item.urgent && <span className="tag-urgent">Urgent</span>}
          <img src={item.image} alt={item.title} />
          <div className={`${type}-text`}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Button variant="link">{item.linkText || 'Learn more'} &rarr;</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
