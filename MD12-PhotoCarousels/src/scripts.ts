import { container } from "webpack";
import { Carousel } from "./Carousel";
import { CarouselFullscreen } from "./CarouselFullscreen";
import { CarouselIndic } from "./CarouselIndic";
import { CarouselThumbs } from "./CarouselThumbs";

const carousel1 = new Carousel(".carousel--1");
const carousel2 = new CarouselIndic(".carousel--2");
const carousel3 = new CarouselThumbs(".carousel--3");
const carousel4 = new CarouselFullscreen(".carousel--4");
