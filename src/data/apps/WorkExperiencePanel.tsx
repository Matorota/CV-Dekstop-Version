import ediginoLogo from "../../assets/edigino_logo.png";
import kaunoGrudaiLogo from "../../assets/kauno_grudai_logo.png";

export default function WorkExperiencePanel() {
  return (
    <div className="p-2 w-full max-w-full md:max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Experience</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-start gap-3 mb-2">
          <img
            src={ediginoLogo}
            alt="Edigino"
            className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
            style={{
              minWidth: 48,
              minHeight: 48,
              maxWidth: 48,
              maxHeight: 48,
            }}
          />
          <div>
            <div className="font-semibold">Frontend Developer</div>
            <div className="text-sm text-gray-700">Edigino</div>
            <div className="text-xs text-gray-500">
              Nov 2024 - Present · 8 mos
              <br />
              Vilniaus, Lithuania · Remote
            </div>
            <div className="mt-1 text-sm">
              <span className="font-semibold">Skills:</span> Front-End
              Development · Web Development · Internet Design · Front-end Coding
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 mb-2">
          <img
            src="https://placehold.co/48x48/png"
            alt="Placeholder"
            className="w-12 h-12 rounded bg-gray-200 object-contain border flex-shrink-0"
            style={{
              minWidth: 48,
              minHeight: 48,
              maxWidth: 48,
              maxHeight: 48,
            }}
          />
          <div>
            <div className="font-semibold">Security Guard</div>
            <div className="text-sm text-gray-700">
              Vilniaus Naujamiesčio mokykla · Part-time
            </div>
            <div className="text-xs text-gray-500">
              Jun 2023 - Present · 2 yrs 1 mo
              <br />
              Vilnius, Vilnius, Lithuania · On-site
            </div>
            <div className="mt-1 text-sm">
              <span className="font-semibold">Skills:</span> Patrol · Building
              Security
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 mb-2">
          <img
            src={kaunoGrudaiLogo}
            alt="Kauno Grūdai"
            className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
            style={{
              minWidth: 48,
              minHeight: 48,
              maxWidth: 48,
              maxHeight: 48,
            }}
          />
          <div>
            <div className="font-semibold">Elevator Operator</div>
            <div className="text-sm text-gray-700">
              Kauno Grūdai · Full-time
            </div>
            <div className="text-xs text-gray-500">
              Jun 2022 - Jul 2022 · 2 mos
              <br />
              Alytus, Alytus, Lithuania · On-site
            </div>
            <div className="mt-1 text-sm">
              I was working a summer job in Kauno Grūdai.
            </div>
            <div className="mt-1 text-sm">
              <span className="font-semibold">Skills:</span> Machine Operation ·
              Elevator Maintenance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
