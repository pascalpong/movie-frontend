import { Container } from "@mui/material";

export default function Header() {
    return (
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <Container>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold transition-transform duration-300 hover:scale-105">
              Free Movie Homepage
            </h1>
            <nav className="space-x-4">
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">HOME</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">드라마</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">예능</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">영화</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">음악프로</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">애니</a>
              <a href="#" className="hover:text-yellow-500 transition-colors duration-300">시사/다큐</a>
            </nav>
          </div>
        </Container>
      </header>
    );
  }