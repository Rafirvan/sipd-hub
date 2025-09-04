import logoImg from "/public/logo-removebg-preview.png"
import { LayoutDashboard } from "lucide-react";

export default function Sidebar({ open }: { open: boolean }) {
    return (
        <nav
            id="sidebar"
            className={`
    h-full bg-gray-800 flex flex-col items-center gap-10 pt-5
    transition-all duration-300 ease-in-out overflow-hidden
    ${open ? "w-80 p-2" : "w-0 p-0"}
  `}
        >
            <div id="logo" className={`${!open ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
                <img src={logoImg} height={60} width={60} />
            </div>

            <nav className={`flex flex-col px-1 w-full ${!open && "hidden"}`}>
                <div className="bg-white flex items-center gap-2 rounded-lg h-fit p-2 cursor-pointer">
                    <LayoutDashboard size={20}/> Dashboard
                </div>
            </nav>



            <section>

            </section>
        </nav>
    );
}
