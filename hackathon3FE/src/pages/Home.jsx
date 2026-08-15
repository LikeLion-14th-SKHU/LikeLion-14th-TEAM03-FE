import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <section className="flex min-h-full flex-col pb-4">
        <div className="flex-1">
          <h2 className="mb-4 text-3xl font-bold text-[#2A2A2A]">홈</h2>
          <p className="text-gray-600">
            환영합니다. 기본 라우팅과 UI가 설정되어 있습니다.
          </p>
        </div>
      </section>
    </>
  );
}
