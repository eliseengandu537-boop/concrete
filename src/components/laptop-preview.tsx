import Image from "next/image";
import type { CSSProperties } from "react";

type LaptopPreviewProps = {
  name: string;
  image: string;
  url: string;
  color: string;
};

export function LaptopPreview({ name, image, url, color }: LaptopPreviewProps) {
  const mobileImage = image.replace(/\.webp$/, "-mobile.webp");
  const tabletImage = image.replace(/\.webp$/, "-tablet.webp");
  const deviceImage = image.replace(/\.webp$/, "-devices.webp");

  return <div className="project-image laptop-stage device-stage" style={{ "--project-tone": color } as CSSProperties}>
    <Image className="device-flat" src={deviceImage} alt={`${name} website shown on a laptop, tablet, and phone`} width={800} height={630} sizes="(max-width: 600px) 92vw, 800px" loading="lazy" />
    <div className="device-live">
    <div className="laptop-floor" aria-hidden="true" />
    <div className="laptop-device">
      <div className="laptop-lid">
        <span className="laptop-camera" aria-hidden="true" />
        <div className="laptop-display">
          <div className="project-browser-bar" aria-hidden="true"><span className="project-browser-dots"><i /><i /><i /></span><span>{new URL(url).hostname.replace(/^www\./, "")}</span><span className="project-browser-lock">⌑</span></div>
          <div className="laptop-screen"><Image src={image} alt={`${name} website displayed on a laptop`} width={1200} height={900} sizes="(max-width: 600px) 65vw, (max-width: 1000px) 34vw, 560px" loading="lazy" /></div>
        </div>
        <span className="laptop-chin" aria-hidden="true" />
      </div>
      <div className="laptop-base" aria-hidden="true"><span /></div>
      <div className="laptop-edge" aria-hidden="true" />
    </div>
    <div className="tablet-device">
      <span className="tablet-camera" aria-hidden="true" />
      <div className="tablet-screen"><Image src={tabletImage} alt={`${name} website on a tablet`} width={640} height={859} sizes="(max-width: 600px) 25vw, 220px" loading="lazy" /></div>
      <span className="device-home-bar" aria-hidden="true" />
    </div>
    <div className="phone-device">
      <span className="phone-side-button" aria-hidden="true" />
      <div className="phone-screen"><Image src={mobileImage} alt={`${name} website on a phone`} width={390} height={844} sizes="(max-width: 600px) 15vw, 130px" loading="lazy" /></div>
      <span className="phone-camera" aria-hidden="true" />
      <span className="device-home-bar" aria-hidden="true" />
    </div>
    </div>
  </div>;
}
