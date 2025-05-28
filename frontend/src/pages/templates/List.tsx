import Templates from '../../components/dashboard/directeur/templates/Templates'
import { useTheme } from 'next-themes'

export const TemplateList = () => {
    const { theme } = useTheme()

    return (
        <div
            className={`min-h-screen p-5 flex flex-col ${theme === 'dark' ? 'bg-background' : 'bg-gray-50'
                }`}
        >
            <Templates />s
        </div>
    )
}
