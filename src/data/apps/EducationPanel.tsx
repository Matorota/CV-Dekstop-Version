import vikoLogo from "../../assets/viko_logo.png";
import { FaStar } from "react-icons/fa";

export default function EducationPanel() {
  return (
    <div className="p-2 w-full max-w-full md:max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Education</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-start gap-3 mb-2">
          <img
            src={vikoLogo}
            alt="VIKO"
            className="w-12 h-12 rounded bg-white object-contain border flex-shrink-0"
            style={{
              minWidth: 48,
              minHeight: 48,
              maxWidth: 48,
              maxHeight: 48,
            }}
          />
          <div>
            <div className="font-semibold">
              Vilniaus Kolegija/University of Applied Sciences
            </div>
            <div className="text-sm text-gray-700">
              Bachelor of Applied Science - BASc, Computer Software Engineering
            </div>
            <div className="text-xs text-gray-500">Sep 2023 - Jun 2026</div>
            <div className="mt-1 text-sm">
              Activities and societies: Software engineer focused on back-end
              systems. C#, C++ and Java with JavaScript. with databases SQL. I
              also had experience with Autocad.
            </div>
            <div className="mt-2 text-sm flex items-center gap-2 flex-wrap">
              <FaStar className="inline text-yellow-500" />
              <span className="font-semibold">
                JavaScript, SQL, C#, C++, Java, Autocad.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
