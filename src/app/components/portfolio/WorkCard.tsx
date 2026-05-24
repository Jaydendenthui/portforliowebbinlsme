import { useState } from "react";
import { Link } from "react-router";
import { Work } from "../../data/works";

interface WorkCardProps {
  work: Work;
}

export default function WorkCard({ work }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/work/${work.id}`}
      className="project-cover-item"
      aria-label={`View project: ${work.title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="cover-content-container">
        <div className="cover-image-wrap">
          <div className="cover-image">
            {/*
             * The 56.25% padding-bottom creates a 16:9 box.
             * All gallery cover images are cropped to 16:9 by the original CMS.
             * The .cover div is absolutely positioned to fill this box.
             */}
            <div className="aspect-spacer" style={{ paddingBottom: "56.25%" }} />

            <div className="cover">
              {/* Low-res blur placeholder shown while hi-res loads */}
              {!imgLoaded && (
                <img
                  src={work.imageSrcLow}
                  alt=""
                  aria-hidden="true"
                  className="cover__img cover__img--blur"
                />
              )}
              <img
                src={work.imageSrc}
                srcSet={work.imageSrcSet}
                sizes={work.imageSizes}
                alt={work.title}
                loading="lazy"
                className={`cover__img${imgLoaded ? " image-loaded" : ""}`}
                onLoad={() => setImgLoaded(true)}
              />
            </div>

            {/* Light blue overlay appears on hover */}
            <div
              className="cover-overlay"
              style={{ opacity: isHovered ? 0.9 : 0 }}
            />
          </div>

          {/* Centered title + date overlay on hover */}
          <div
            className="details-wrap"
            style={{ opacity: isHovered ? 1 : 0 }}
            aria-hidden={!isHovered}
          >
            <div className="details-inner">
              <div className="title">{work.title}</div>
              <div className="date">{work.date}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
