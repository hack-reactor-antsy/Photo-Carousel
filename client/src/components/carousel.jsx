import Thumbnails from './thumbnails.jsx';
import Scaled from './scaled.jsx';
import axios from 'axios';

const dummy = [
  {url: '/images/1/placeholder.jpg', sort: 0},
  {url: '/images/1/placeholder.jpg', sort: 1},
  {url: '/images/1/placeholder.jpg', sort: 2}
];

const URI = 'https://s3-us-west-1.amazonaws.com/beyond-antsy';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: dummy,
      scaled: dummy[0]
    };
    this.retrieveImageDocument = this.retrieveImageDocument.bind(this);
  }

  retrieveImageDocument() {
    let endpoint = window.location.pathname + 'retrieve';
    axios({
      method: 'GET',
      url: endpoint
    })
      .then((document) => {
        this.setState({
          images: document.data.images,
          scaled: document.data.images[0]
        });
      })
      .catch((err) => {
        console.log('Error retrieving images');
        throw err;
      });
  }

  render() {
    return (
      <div>Container
        <Scaled />
        <br></br>
        <Thumbnails />
      </div>
    );
  }

  componentDidMount() {
    this.retrieveImageDocument();
  }
}

export default Carousel;