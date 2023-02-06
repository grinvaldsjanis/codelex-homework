import React from "react";
import style from "./Home.module.scss";
import HomeImage from "../../assets/images/home-image.jpg";

interface Props {}

const HomePage: React.FC<Props> = () => {
  return (
    <div className="wrapper">
      <h1>Rick and Morty Wiki Page</h1>
      <div className={style.row}>
        <div className={style.column}>
          <h6>Welcome to the Rick and Morty Wiki page! </h6>
          <p>
            Here, you'll find an abundance of information about the wacky
            adventures of the eccentric and unpredictable mad scientist Rick
            Sanchez and his good-hearted but easily influenced grandson Morty
            Smith. Whether you're a die-hard fan or just discovering this
            hilarious and action-packed animated series, you've come to the
            right place.
          </p>
          <p>
            On this site, you'll be able to find detailed information about
            every character that has made an appearance in the show, from the
            titular duo themselves to the many aliens, robots, and otherworldly
            beings that they encounter on their interdimensional travels. You
            can also explore every episode of the series, including synopses,
            cast and crew information, and behind-the-scenes trivia. In
            addition, you can learn about the various locations featured in the
            show, from the Smith family's home in suburban America to the
            far-flung corners of the multiverse.
          </p>
          <h6>So what are you waiting for?</h6>
          <p>
            Start exploring the world of Rick and
            Morty and discover all the exciting details that this show has to
            offer. Whether you're looking for information about a particular
            episode, character, or location, you're sure to find it all here,
            thanks to the comprehensive data available from the Rick and Morty
            API.
          </p>
        </div>
        <div className={style.imgContainer}>
        <img src={HomeImage} alt="image" className={style.homeImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
