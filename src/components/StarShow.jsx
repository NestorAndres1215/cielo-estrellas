import StarCanvas from "./StarCanvas";
import useStarShow from "../hooks/useStarShow";

export default function StarShow() {
  const { currentFormation, currentIndex, totalFormations } = useStarShow();

  return (
    <section className="star-show">
      <StarCanvas formation={currentFormation} />

      <div className="show-header">
        <span>UN UNIVERSO PARA DAYANA</span>
      </div>
    </section>
  );
}
