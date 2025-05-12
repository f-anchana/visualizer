import s from "./Track.module.scss";
import audioController from "../../utils/AudioController";
import scene from "../../webgl/Scene";
import Button from "../Button/Button";

const Track = ({ title, cover, src, duration, index, isSelected, onClick }) => {
  const getSeconds = () => {
    const minutes = Math.floor(duration / 60);
    let seconds = Math.round(duration - minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  const handleClick = () => {
    audioController.play(src);
    scene.cover.setCover(cover);
    onClick();  // Appel à la fonction onClick passée en props
  };

  return (
    <div
      className={`${s.track} ${isSelected ? s.selected : ""}`}  // Ajout de la classe "selected" si la piste est sélectionnée   
      onClick={handleClick}
    >
      <span className={s.order}>{index + 1}</span>
      <div className={s.title}>
        <img src={cover} alt="" className={s.cover} />
        <div className={s.details}>
          <span className={s.trackName}>{title}</span>
        </div>
      </div>
      <span className={s.duration}>{getSeconds()}</span>
      <span className={s.play}>
        <Button
          className={s.playButton}
          icon="play"
          onClick={handleClick}
        /> </span>  
    </div>
  );
};

export default Track;
