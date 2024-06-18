import React from 'react'
import './viewImageDescription.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import ReactImageMagnify from 'react-image-magnify';


function ImageZoom({image}) {

    return (
        <div>
            {/* <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: `/uploads/${image}`,
                    width: 600,
                    height: 900
                },
                largeImage: {
                    src: "/uploads/1636018729502.jpg",
                    width: 1200,
                    height: 1800
                }
            }} /> */}
            <InnerImageZoom
                src="/uploads/1636009645796.jpg" 
                // width= "50%"
                zoomSrc="/uploads/1636018729502.jpg"
                zoomScale= '0.5'
                zoomType="hover"
                zoomPreload={true}
            />
            {/* <figure className="mag" id="mags">
                <img className="mag-img" id="mag-imgs" src={`/uploads/${image}`}/>
            </figure> */}
        </div>
    )
}

export default ImageZoom
