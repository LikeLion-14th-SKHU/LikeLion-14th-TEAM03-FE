import checkUnchecked from "../../assets/check-unchecked.svg";
import checkChecked from "../../assets/check-checked.svg";
import soapIcon from "../../assets/soap_icon.svg";
import skincareIcon from "../../assets/skincare_icon.svg";

const ICONS = { cleansing: soapIcon, skincare: skincareIcon };

export default function TodoChecklist({ todayChecks, onToggle }) {
  const todos = [
    { id: "cleansing", label: "세안", checked: todayChecks.cleansingDone },
    { id: "skincare", label: "스킨케어", checked: todayChecks.skincareDone },
  ];

  return (
    <div className="flex gap-2.5">
      {todos.map((todo) => (
        <button
          type="button"
          key={todo.id}
          onClick={() => onToggle(todo.id)}
          className="group flex-1 cursor-pointer flex items-center gap-4 rounded-xl bg-white pl-3 pr-4 py-3.5 shadow-sm"
        >
          <img
            src={ICONS[todo.id]}
            alt=""
            aria-hidden="true"
            className="h-14 w-14 shrink-0"
          />
          <span className="flex flex-1 flex-col items-start gap-1">
            <span className="text-[16px] font-bold text-[#1f1f1f]">
              {todo.label}
            </span>
            <span
              className={
                "flex items-center gap-1.5 text-[15px] font-semibold transition-transform duration-150 ease-out group-hover:scale-105 group-active:scale-90 " +
                (todo.checked ? "text-[#285E3C]" : "text-[#9a958c]")
              }
            >
              <img
                src={todo.checked ? checkChecked : checkUnchecked}
                alt={todo.checked ? "체크됨" : "체크 안 됨"}
                width="20"
                height="20"
              />
              {todo.checked ? "완료" : "체크하기"}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
