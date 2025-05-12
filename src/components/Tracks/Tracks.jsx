import { useEffect, useState } from "react";
import Track from "../Track/Track";
import useStore from "../../utils/store";
import { fetchMetadata } from "../../utils/utils";
import TRACKS from "../../utils/TRACKS";
import fetchJsonp from "fetch-jsonp";
import s from "./Tracks.module.scss";

const Tracks = () => {
  const [showTracks, setShowTracks] = useState(false);
  const { tracks, setTracks } = useStore();
  const [selectedTrack, setSelectedTrack] = useState(null);  // État pour la piste sélectionnée

  useEffect(() => {
    if (tracks.length > TRACKS.length) {
      setShowTracks(true);
    }
  }, [tracks]);

  useEffect(() => {
    fetchMetadata(TRACKS, tracks, setTracks);
  }, []);

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      const userInput = e.target.value;
      getSongs(userInput);
      e.target.value = "";
    }
  };

  const getSongs = async (userInput) => {
    try {
      let response = await fetchJsonp(
        `https://api.deezer.com/search?q=${userInput}&output=jsonp`
      );
  
      if (response.ok) {
        const data = await response.json();
        const newTracks = data.data;
        setTracks(newTracks);
        console.log(newTracks);
      } else {
        console.error("Erreur dans la réponse API");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API :", error);
    }
  };

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);  // Mettre à jour la piste sélectionnée
  };

  return (
    <>
      <div
        className={s.toggleTracks}
        onClick={() => setShowTracks(!showTracks)}
      >
        tracklist
      </div>

      <section
        className={`${s.wrapper} ${showTracks ? s.wrapper_visible : ""}`}
      >
        <div className={s.tracks}>
          <div className={s.header}>
            <span className={s.order}>#</span>
            <span className={s.title}>Titre</span>
            <span className={s.duration}>Durée</span>
          </div>

          {tracks.map((track, i) => (
            <Track
              key={track.title + i}
              title={track.title}
              duration={track.duration}
              cover={track.album.cover_xl}
              src={track.preview}
              index={i}
              isSelected={selectedTrack && selectedTrack.src === track.preview}  // Vérifie si la piste est sélectionnée
              onClick={() => handleTrackSelect(track)}  // Sélectionne la piste
            />
          ))}
        </div>

        <input
          type="text"
          placeholder="Chercher un artiste"
          className={s.searchInput}
          onKeyDown={onKeyDown}
        />
      </section>
    </>
  );
};

export default Tracks;
