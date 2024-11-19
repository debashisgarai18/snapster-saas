import { useMode } from "../hooks/useMode"

export default function Home(){
    const {isDark} = useMode()
    return <div className={`${isDark ? "dark" : "light"} min-h-screen w-screen`}>
        
    </div>
}