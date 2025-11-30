"use client";

import React from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function ImageLightbox({ open, onClose, src }: any) {
  if (!open) return null;

  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={[{ src }]}
      plugins={[Zoom]}
    />
  );
}
