import { useSelector } from "react-redux";
import { modals } from "./Modals";

const HeaderSection = ({ onClick }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  const name = useSelector((state) => state.user.name);
  return (
    <section className="header-section">
      <h1 className="mb-0">
        {isLogin ? (
          "안녕하세요, " + name + "님!"
        ) : (
          <>
            <a href="#javascript" onClick={() => onClick(modals.loginModal)} style={{ color: "black", textUnderlinePosition: "under" }}>
              로그인
            </a>
            하기
          </>
        )}
      </h1>
    </section>
  );
};

export default HeaderSection;
