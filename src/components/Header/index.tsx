import HeaderTop from "../HeaderTop";
import HeaderBottom from "../HeaderBottom";
import useBreakpoint from "@/hook/useBreakpoint";
import MobileHeader from "../MobileHeader";

const Header = () => {
    const screenSize = useBreakpoint();
    return (
        <header className="fixed top-0 left-0 right-0 z-10">
            {screenSize === 'desktop' ? (
                <>
                    <HeaderTop />
                    <HeaderBottom />
                </>
            ) : <>
                <MobileHeader />
            </>}

        </header>
    );
}

export default Header;