import checkUnchecked from "../../assets/check-unchecked.svg";
import checkChecked from "../../assets/check-checked.svg";

export default function TodoChecklist({ todayChecks, onToggle }) {
  const todos = [
    { id: "cleansing", label: "세안 체크", checked: todayChecks.cleansingDone },
    { id: "skincare", label: "스킨 케어 체크", checked: todayChecks.skincareDone },
  ];

  return (
    <div className="flex-1 flex flex-col gap-2">
      {todos.map((todo) => (
        <button
          type="button"
          key={todo.id}
          onClick={() => onToggle(todo.id)}
          className="group flex-1 cursor-pointer bg-white rounded-xl shadow-sm px-3 py-2 flex flex-col items-center justify-between text-center gap-1"
        >
          <span className="text-[14px] font-bold text-[#1f1f1f]">{todo.label}</span>
          <img
            src={todo.checked ? checkChecked : checkUnchecked}
            alt={todo.checked ? "체크됨" : "체크 안 됨"}
            width="26"
            height="26"
            className="transition-transform duration-150 ease-out group-hover:scale-110 group-active:scale-90"
          />
        </button>
      ))}
    </div>
  );
}
